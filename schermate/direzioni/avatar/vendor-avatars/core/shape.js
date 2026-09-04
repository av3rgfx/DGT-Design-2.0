/**
 * Silhouette radiali: ogni corpo è un profilo r(theta) campionato agli STESSI
 * angoli, così il morphing fra due forme qualsiasi è una semplice
 * interpolazione lineare dei raggi — niente librerie di morphing di path.
 *
 * Tecnica adattata da bloub (MIT), vedi NOTICE. I profili dei ruoli del kit
 * (in roles.ts) sono disegni originali.
 */
import { TAU, lerp, r2 } from './math.js';
export const PROFILE_SAMPLES = 64;
const ANGLES = Array.from({ length: PROFILE_SAMPLES }, (_, i) => (i / PROFILE_SAMPLES) * TAU);
const COS = ANGLES.map(Math.cos);
const SIN = ANGLES.map(Math.sin);
export function fromProfile(radii, pose = {}) {
    return { radii: [...radii], rot: 0, cx: 0, cy: 0, sx: 1, sy: 1, ...pose };
}
/** Cerchio perfetto di raggio `radius`: base neutra per morph e stati ridotti. */
export function circle(radius, pose = {}) {
    return { radii: new Array(PROFILE_SAMPLES).fill(radius), rot: 0, cx: 0, cy: 0, sx: 1, sy: 1, ...pose };
}
/** Interpolazione di due silhouette. `out` è riusato per non allocare a 60 fps. */
export function blend(a, b, t, out) {
    const dst = out ?? { radii: new Array(PROFILE_SAMPLES), rot: 0, cx: 0, cy: 0, sx: 1, sy: 1 };
    for (let i = 0; i < PROFILE_SAMPLES; i++) {
        dst.radii[i] = lerp(a.radii[i] ?? 1, b.radii[i] ?? 1, t);
    }
    // rotazione per il cammino più breve
    let dRot = b.rot - a.rot;
    while (dRot > Math.PI)
        dRot -= TAU;
    while (dRot < -Math.PI)
        dRot += TAU;
    dst.rot = a.rot + dRot * t;
    dst.cx = lerp(a.cx, b.cx, t);
    dst.cy = lerp(a.cy, b.cy, t);
    dst.sx = lerp(a.sx, b.sx, t);
    dst.sy = lerp(a.sy, b.sy, t);
    return dst;
}
/** Proietta la silhouette in punti schermo. `scale` = raggio di base in unità viewBox. */
export function toPoints(s, scale, out = []) {
    const cr = Math.cos(s.rot);
    const sr = Math.sin(s.rot);
    for (let i = 0; i < PROFILE_SAMPLES; i++) {
        const r = s.radii[i] ?? 1;
        const x = r * (COS[i] ?? 0);
        const y = r * (SIN[i] ?? 0);
        const rx = x * cr - y * sr;
        const ry = x * sr + y * cr;
        const p = out[i] ?? { x: 0, y: 0 };
        p.x = (rx * s.sx + s.cx) * scale;
        p.y = (ry * s.sy + s.cy) * scale;
        out[i] = p;
    }
    out.length = PROFILE_SAMPLES;
    return out;
}
/** Polilinea chiusa -> cubiche Catmull-Rom: contorno liscio con stringhe corte. */
export function closedPath(pts, tension = 1 / 6) {
    const n = pts.length;
    if (n < 3)
        return '';
    const first = pts[0];
    let d = `M${r2(first.x)} ${r2(first.y)}`;
    for (let i = 0; i < n; i++) {
        const p0 = pts[(i - 1 + n) % n];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % n];
        const p3 = pts[(i + 2) % n];
        const c1x = p1.x + (p2.x - p0.x) * tension;
        const c1y = p1.y + (p2.y - p0.y) * tension;
        const c2x = p2.x - (p3.x - p1.x) * tension;
        const c2y = p2.y - (p3.y - p1.y) * tension;
        d += `C${r2(c1x)} ${r2(c1y)} ${r2(c2x)} ${r2(c2y)} ${r2(p2.x)} ${r2(p2.y)}`;
    }
    return `${d}Z`;
}
/**
 * Raggio del profilo in una direzione qualsiasi, interpolato fra i campioni
 * vicini. Serve a tenere pupille e decori DENTRO il corpo quando la
 * silhouette non è un cerchio.
 */
export function radiusAtAngle(radii, angle) {
    const n = radii.length;
    const t = ((((angle / TAU) % 1) + 1) % 1) * n;
    const i = Math.floor(t);
    return lerp(radii[i % n] ?? 1, radii[(i + 1) % n] ?? 1, t - i);
}
/** Poligono qualsiasi -> profilo radiale, per lancio di raggio dall'origine. */
export function profileFromPolygon(poly, cx = 0, cy = 0) {
    const radii = new Array(PROFILE_SAMPLES).fill(0);
    const n = poly.length;
    for (let k = 0; k < PROFILE_SAMPLES; k++) {
        const dx = COS[k] ?? 0;
        const dy = SIN[k] ?? 0;
        let best = 0;
        for (let i = 0; i < n; i++) {
            const a = poly[i];
            const b = poly[(i + 1) % n];
            const ex = b.x - a.x;
            const ey = b.y - a.y;
            const den = dx * ey - dy * ex;
            if (Math.abs(den) < 1e-9)
                continue;
            const px = a.x - cx;
            const py = a.y - cy;
            const t = (px * ey - py * ex) / den;
            const u = (px * dy - py * dx) / den;
            if (t > best && u >= 0 && u <= 1)
                best = t;
        }
        radii[k] = best;
    }
    return radii;
}
/** Superellisse: |x/sx|^n + |y/sy|^n = 1. n=2 ellisse, n~4-5 squircle/pill. */
export function superellipseProfile(n, sx = 1, sy = 1) {
    return ANGLES.map((_, i) => {
        const c = Math.abs((COS[i] ?? 0) / sx) ** n;
        const s = Math.abs((SIN[i] ?? 0) / sy) ** n;
        return (c + s) ** (-1 / n);
    });
}
/**
 * Profilo radiale dell'unione di dischi: r(theta) = l'intersezione
 * raggio/cerchio più lontana. Esatto finché l'origine sta nell'unione.
 */
export function unionOfCirclesProfile(circles) {
    const out = new Array(PROFILE_SAMPLES).fill(0);
    for (let i = 0; i < PROFILE_SAMPLES; i++) {
        const dx = COS[i] ?? 0;
        const dy = SIN[i] ?? 0;
        let best = 0;
        for (const c of circles) {
            const b = dx * c.x + dy * c.y;
            const disc = b * b - (c.x * c.x + c.y * c.y - c.r * c.r);
            if (disc < 0)
                continue;
            const t = b + Math.sqrt(disc);
            if (t > best)
                best = t;
        }
        out[i] = best;
    }
    return out;
}
/** Poligono a spigoli arrotondati (somma di Minkowski con un disco). Vertici in senso orario. */
export function roundedPolygon(verts, rc, arcSteps = 10) {
    const n = verts.length;
    const out = [];
    const normal = (a, b) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        return Math.atan2(-dx / len, dy / len);
    };
    for (let i = 0; i < n; i++) {
        const prev = verts[(i - 1 + n) % n];
        const cur = verts[i];
        const next = verts[(i + 1) % n];
        const a0 = normal(prev, cur);
        const a1 = normal(cur, next);
        let d = a1 - a0;
        while (d > Math.PI)
            d -= TAU;
        while (d < -Math.PI)
            d += TAU;
        for (let k = 0; k <= arcSteps; k++) {
            const a = a0 + (d * k) / arcSteps;
            out.push({ x: cur.x + Math.cos(a) * rc, y: cur.y + Math.sin(a) * rc });
        }
    }
    return out;
}
/** Poligono regolare a spigoli arrotondati, inscritto in `radius`. */
export function regularPolygonProfile(sides, radius, rc, rotationDeg = 0) {
    const rot = (rotationDeg * Math.PI) / 180;
    const verts = Array.from({ length: sides }, (_, i) => {
        const a = rot + (i / sides) * TAU;
        return { x: Math.cos(a) * (radius - rc), y: Math.sin(a) * (radius - rc) };
    });
    return profileFromPolygon(roundedPolygon(verts, rc), 0, 0);
}
/** Poligono arbitrario a spigoli arrotondati -> profilo radiale. */
export function polygonProfile(verts, rc) {
    return profileFromPolygon(roundedPolygon(verts, rc), 0, 0);
}
/** Capsula centrata sull'origine: primitiva di comodo per decori. */
export function capsulePath(w, h) {
    const hw = Math.max(w, 0.01) / 2;
    const hh = Math.max(h, 0.01) / 2;
    const r = Math.min(hw, hh);
    return (`M${r2(-hw)} ${r2(-hh + r)}` +
        `A${r2(r)} ${r2(r)} 0 0 1 ${r2(-hw + r)} ${r2(-hh)}` +
        `L${r2(hw - r)} ${r2(-hh)}` +
        `A${r2(r)} ${r2(r)} 0 0 1 ${r2(hw)} ${r2(-hh + r)}` +
        `L${r2(hw)} ${r2(hh - r)}` +
        `A${r2(r)} ${r2(r)} 0 0 1 ${r2(hw - r)} ${r2(hh)}` +
        `L${r2(-hw + r)} ${r2(hh)}` +
        `A${r2(r)} ${r2(r)} 0 0 1 ${r2(-hw)} ${r2(hh - r)}Z`);
}
