/* =====================================================================
   DGT — motore degli avatar (bundle generato da build-motore.js).
   Sorgenti: vendor-avatars/core/*.js (kit "pacchetto avatar dipendenti",
   architettura adattata da bloub, MIT). NON MODIFICARE A MANO: rigenerare con
   `node build-motore.js`. Espone window.DGT_AVATAR_MOTORE.
   ===================================================================== */
window.DGT_AVATAR_MOTORE = (function () {
/* ---- vendor-avatars/core/math.js ---- */
/**
 * Utilità matematiche del kit avatar.
 *
 * Algoritmi generici adattati da bloub (https://github.com/jeremy-prt/bloub),
 * licenza MIT — vedi NOTICE nella radice del kit. Le costanti di design
 * (periodi, ampiezze, semi) sono originali di questo kit.
 */
const TAU = Math.PI * 2;
const clamp = (v, lo = 0, hi = 1) => (v < lo ? lo : v > hi ? hi : v);
const lerp = (a, b, t) => a + (b - a) * t;
const easings = {
    linear: (t) => t,
    easeOutCubic: (t) => 1 - (1 - t) ** 3,
    easeInOutCubic: (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2),
    easeOutQuint: (t) => 1 - (1 - t) ** 5,
    /** overshoot leggero in chiusura: usato per pop e success */
    easeOutBack: (t) => {
        const c = 1.70158;
        return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2;
    }
};
/**
 * Rumore 1D periodico: somma di sinusoidi in rapporto armonico, quindi
 * `loopNoise(t + period) === loopNoise(t)`. Perfetto per derive che devono
 * anche loopare senza cuciture negli export GIF.
 */
function loopNoise(t, period, seed = 0) {
    const p = (t / period) * TAU;
    return (0.55 * Math.sin(p + seed) +
        0.3 * Math.sin(2 * p + seed * 1.7 + 1.1) +
        0.15 * Math.sin(3 * p + seed * 2.3 + 2.4));
}
/** PRNG deterministico (mulberry32): stessa sequenza a ogni esecuzione. */
function createRng(seed) {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
/** Arrondi a 2 decimali: dimezza il peso delle stringhe path generate a 30-60 fps. */
const r2 = (v) => Math.round(v * 100) / 100;
/** Mescola due colori RGB espressi come [r,g,b] 0-255. */
function mixRgb(a, b, t) {
    return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}
const rgbCss = (c) => `rgb(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])})`;
/** HSL -> RGB 0-255. `s` e `l` in percentuale (0-100), come in CSS. */
function hsl(h, s, l) {
    const hn = (((h % 360) + 360) % 360) / 360;
    const sn = clamp(s / 100, 0, 1);
    const ln = clamp(l / 100, 0, 1);
    if (sn === 0) {
        const g = Math.round(ln * 255);
        return [g, g, g];
    }
    const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
    const p = 2 * ln - q;
    const chan = (o) => {
        let t = hn + o;
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        if (t < 1 / 6)
            return p + (q - p) * 6 * t;
        if (t < 1 / 2)
            return q;
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };
    return [Math.round(chan(1 / 3) * 255), Math.round(chan(0) * 255), Math.round(chan(-1 / 3) * 255)];
}

/* ---- vendor-avatars/core/shape.js ---- */
/**
 * Silhouette radiali: ogni corpo è un profilo r(theta) campionato agli STESSI
 * angoli, così il morphing fra due forme qualsiasi è una semplice
 * interpolazione lineare dei raggi — niente librerie di morphing di path.
 *
 * Tecnica adattata da bloub (MIT), vedi NOTICE. I profili dei ruoli del kit
 * (in roles.ts) sono disegni originali.
 */

const PROFILE_SAMPLES = 64;
const ANGLES = Array.from({ length: PROFILE_SAMPLES }, (_, i) => (i / PROFILE_SAMPLES) * TAU);
const COS = ANGLES.map(Math.cos);
const SIN = ANGLES.map(Math.sin);
function fromProfile(radii, pose = {}) {
    return { radii: [...radii], rot: 0, cx: 0, cy: 0, sx: 1, sy: 1, ...pose };
}
/** Cerchio perfetto di raggio `radius`: base neutra per morph e stati ridotti. */
function circle(radius, pose = {}) {
    return { radii: new Array(PROFILE_SAMPLES).fill(radius), rot: 0, cx: 0, cy: 0, sx: 1, sy: 1, ...pose };
}
/** Interpolazione di due silhouette. `out` è riusato per non allocare a 60 fps. */
function blend(a, b, t, out) {
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
function toPoints(s, scale, out = []) {
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
function closedPath(pts, tension = 1 / 6) {
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
function radiusAtAngle(radii, angle) {
    const n = radii.length;
    const t = ((((angle / TAU) % 1) + 1) % 1) * n;
    const i = Math.floor(t);
    return lerp(radii[i % n] ?? 1, radii[(i + 1) % n] ?? 1, t - i);
}
/** Poligono qualsiasi -> profilo radiale, per lancio di raggio dall'origine. */
function profileFromPolygon(poly, cx = 0, cy = 0) {
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
function superellipseProfile(n, sx = 1, sy = 1) {
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
function unionOfCirclesProfile(circles) {
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
function roundedPolygon(verts, rc, arcSteps = 10) {
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
function regularPolygonProfile(sides, radius, rc, rotationDeg = 0) {
    const rot = (rotationDeg * Math.PI) / 180;
    const verts = Array.from({ length: sides }, (_, i) => {
        const a = rot + (i / sides) * TAU;
        return { x: Math.cos(a) * (radius - rc), y: Math.sin(a) * (radius - rc) };
    });
    return profileFromPolygon(roundedPolygon(verts, rc), 0, 0);
}
/** Poligono arbitrario a spigoli arrotondati -> profilo radiale. */
function polygonProfile(verts, rc) {
    return profileFromPolygon(roundedPolygon(verts, rc), 0, 0);
}
/** Capsula centrata sull'origine: primitiva di comodo per decori. */
function capsulePath(w, h) {
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

/* ---- vendor-avatars/core/gaze.js ---- */
/**
 * Sguardo: le pupille sono dipinte su una sfera, non appiattite sul corpo.
 * Ogni pupilla riceve la base tangente della sfera proiettata in ortografico:
 * compressione e inclinazione verso il bordo emergono da sole, ed è questo
 * che dà volume alla testa.
 *
 * Tecnica adattata da bloub (MIT), vedi NOTICE. Costanti di posa e calendario
 * dei battiti originali: il personaggio del kit guarda FRONTALE e leggermente
 * in basso (atteggiamento "attento"), senza la testa inclinata caratteristica
 * del bot di riferimento.
 */

/** Posa di riposo del kit: frontale, mento appena basso. */
const REST_GAZE = { yaw: 0, pitch: -6, roll: 0 };
/** Semi-separazione delle pupille sulla sfera, in gradi. */
const EYE_SPLIT = 17;
const deg = (d) => (d * Math.PI) / 180;
/** Ruota due vettori di una base ortonormale nel loro piano comune. */
function spin(u, v, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return [
        [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s],
        [v[0] * c - u[0] * s, v[1] * c - u[1] * s, v[2] * c - u[2] * s]
    ];
}
/**
 * Base della testa e delle due pupille.
 * Coordinate schermo: x a destra, y in basso, z verso chi guarda.
 * Indice 0 = occhio sinistro, 1 = occhio destro (dal punto di vista dell'avatar).
 */
function eyePoses(gaze, scale, split = EYE_SPLIT) {
    let f = [0, 0, 1];
    let right = [1, 0, 0];
    let down = [0, 1, 0];
    [f, right] = spin(f, right, deg(gaze.yaw));
    [down, f] = spin(down, f, deg(gaze.pitch));
    [right, down] = spin(right, down, deg(gaze.roll));
    const build = (side) => {
        const [ef, er] = spin(f, right, deg(split * side));
        return { x: ef[0] * scale, y: ef[1] * scale, a: er[0], b: er[1], c: down[0], d: down[1], depth: ef[2] };
    };
    return [build(-1), build(1)];
}
const BLINK_RNG = createRng(0xb10b);
/** Calendario battiti pre-estratto: deterministico e senza stato. */
const BLINKS = (() => {
    const out = [];
    let t = 1.1;
    while (t < 900) {
        out.push(t);
        t += 2.1 + BLINK_RNG() * 3.1;
        if (BLINK_RNG() < 0.14) {
            out.push(t);
            t += 0.26;
        }
    }
    return out;
})();
const BLINK_DUR = 0.16;
function blinkLid(t) {
    for (let i = 0; i < BLINKS.length; i++) {
        const start = BLINKS[i];
        if (t < start)
            break;
        const k = (t - start) / BLINK_DUR;
        if (k >= 0 && k <= 1) {
            return k < 0.45 ? 1 - k / 0.45 : (k - 0.45) / 0.55;
        }
    }
    return 1;
}
/**
 * Vita al minimo: deriva dello sguardo, battiti, respiro appena percettibile.
 * Funzione pura del tempo: pausa, ripresa e salto a una data arbitraria
 * producono sempre la stessa immagine.
 */
function liveliness(t, opt = {}) {
    const { wander = 1, blink = true, float = true, breathAmp = 1, breathPeriod = 3.6 } = opt;
    return {
        dYaw: (loopNoise(t, 10.7, 0.9) * 4.8 + loopNoise(t, 3.9, 2.6) * 1.4) * wander,
        dPitch: (loopNoise(t, 8.7, 1.8) * 3.6 + loopNoise(t, 4.7, 0.4) * 1.1) * wander,
        dRoll: loopNoise(t, 12.9, 3.6) * 1.6 * wander,
        lid: blink ? blinkLid(t) : 1,
        driftX: float ? loopNoise(t, 7.3, 2.2) * 0.007 : 0,
        driftY: float ? loopNoise(t, 5.9, 0.8) * 0.008 : 0,
        breath: float ? 1 + Math.sin((t / breathPeriod) * Math.PI * 2) * 0.006 * breathAmp : 1
    };
}
/** Il battito è uno schiacciamento verticale attorno al centro della pupilla. */
function blinkScale(lid) {
    return 0.08 + 0.92 * clamp(lid);
}

/* ---- vendor-avatars/core/roles.js ---- */
/**
 * I ruoli del kit: 7 design ORIGINALI, uno per tipo di "dipendente" AI.
 *
 * Ogni ruolo è una tripletta (silhouette, palette, pupilla) pensata per
 * essere riconoscibile a 32 px e irriducibile a qualsiasi avatar esistente:
 * niente sfera nera, niente occhi a capsula — corpi geometrici scuri tinti
 * nella tinta del ruolo, pupille tonde luminose.
 */


/** Petali del designer: corpo centrale + 5 lobi, fiore organico. */
const flowerProfile = () => {
    const petals = Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * TAU - Math.PI / 2;
        return { x: Math.cos(a) * 0.6, y: Math.sin(a) * 0.6, r: 0.37 };
    });
    return unionOfCirclesProfile([{ x: 0, y: 0, r: 0.58 }, ...petals]);
};
const ROLES = [
    {
        id: 'coordinator',
        label: 'Coordinatore',
        // esagono a spigoli molli: il fulcro stabile della squadra
        profile: regularPolygonProfile(6, 1.0, 0.32),
        ink: hsl(243, 42, 15),
        accent: hsl(243, 92, 72),
        pupil: 'dot',
        accentKind: 'orbit'
    },
    {
        id: 'researcher',
        label: 'Ricercatore',
        // lente/goccia con la punta in alto: la sonda che punta altrove
        profile: unionOfCirclesProfile([
            { x: 0, y: 0.16, r: 0.8 },
            { x: 0, y: -0.52, r: 0.44 }
        ]),
        ink: hsl(198, 52, 14),
        accent: hsl(190, 92, 62),
        pupil: 'dot',
        accentKind: 'satellite'
    },
    {
        id: 'developer',
        label: 'Sviluppatore',
        // squircle: il chip
        profile: superellipseProfile(4.2),
        ink: hsl(158, 42, 13),
        accent: hsl(152, 78, 55),
        pupil: 'square',
        accentKind: 'caret'
    },
    {
        id: 'copywriter',
        label: 'Copywriter',
        // virgola/calamaro: corpo pieno con punta di penna in alto a destra
        profile: unionOfCirclesProfile([
            { x: -0.12, y: 0.16, r: 0.76 },
            { x: 0.46, y: -0.48, r: 0.37 }
        ]),
        ink: hsl(28, 52, 14),
        accent: hsl(36, 94, 60),
        pupil: 'dot',
        accentKind: 'lines'
    },
    {
        id: 'analyst',
        label: 'Analista',
        // rombo arrotondato: la sfaccettatura del dato
        profile: regularPolygonProfile(4, 1.04, 0.36),
        ink: hsl(280, 38, 16),
        accent: hsl(280, 82, 70),
        pupil: 'dot',
        accentKind: 'bars'
    },
    {
        id: 'support',
        label: 'Supporto',
        // pill orizzontale morbida: accogliente per costruzione
        profile: superellipseProfile(5, 1.12, 0.88),
        ink: hsl(95, 38, 14),
        accent: hsl(95, 78, 58),
        pupil: 'dot',
        accentKind: 'wave'
    },
    {
        id: 'designer',
        label: 'Designer',
        // fiore a 5 petali: organico, l'unico non geometrico puro
        profile: flowerProfile(),
        ink: hsl(335, 42, 15),
        accent: hsl(335, 88, 66),
        pupil: 'ring',
        accentKind: 'sparkles'
    },
    /* ------------------------------------------- seconda serie (su richiesta) */
    {
        id: 'editor',
        label: 'Redattore',
        // pagina verticale: il documento
        profile: superellipseProfile(3.0, 0.82, 1.04),
        ink: hsl(50, 45, 14),
        accent: hsl(48, 92, 55),
        pupil: 'dot',
        accentKind: 'lines'
    },
    {
        id: 'reviewer',
        label: 'Revisore',
        // scudo: controlla e protegge
        profile: polygonProfile([
            { x: -0.66, y: -0.58 },
            { x: 0.66, y: -0.58 },
            { x: 0.72, y: 0.12 },
            { x: 0, y: 0.96 },
            { x: -0.72, y: 0.12 }
        ], 0.16),
        ink: hsl(175, 42, 13),
        accent: hsl(172, 75, 48),
        pupil: 'dot',
        accentKind: 'scan'
    },
    {
        id: 'social',
        label: 'Addetto Social',
        // nuvoletta di dialogo con coda
        profile: unionOfCirclesProfile([
            { x: 0.05, y: -0.08, r: 0.82 },
            { x: -0.52, y: 0.62, r: 0.24 },
            { x: -0.76, y: 0.84, r: 0.12 }
        ]),
        ink: hsl(305, 40, 15),
        accent: hsl(305, 85, 64),
        pupil: 'dot',
        accentKind: 'pulse'
    },
    {
        id: 'campaigns',
        label: 'Gestore Campagne',
        // aeroplanino di carta: il lancio
        profile: polygonProfile([
            { x: 1.02, y: 0 },
            { x: -0.72, y: 0.66 },
            { x: -0.32, y: 0 },
            { x: -0.72, y: -0.66 }
        ], 0.11),
        ink: hsl(12, 48, 15),
        accent: hsl(12, 86, 58),
        pupil: 'dot',
        accentKind: 'launch'
    },
    {
        id: 'ads-analyst',
        label: 'Analista Annunci',
        // pentagono con il vertice in alto: il segnale che sale
        profile: regularPolygonProfile(5, 1.0, 0.3, -90),
        ink: hsl(220, 45, 15),
        accent: hsl(218, 86, 64),
        pupil: 'dot',
        accentKind: 'bars'
    },
    {
        id: 'tester',
        label: 'Tester',
        // coleottero: corpo + testa, la caccia ai bug
        profile: unionOfCirclesProfile([
            { x: 0, y: 0.14, r: 0.76 },
            { x: 0, y: -0.62, r: 0.36 }
        ]),
        ink: hsl(75, 42, 14),
        accent: hsl(75, 85, 55),
        pupil: 'dot',
        accentKind: 'grid'
    },
    {
        id: 'integrator',
        label: 'Integratore',
        // tessera di puzzle: corpo con due innesti
        profile: unionOfCirclesProfile([
            { x: 0, y: 0, r: 0.66 },
            { x: 0, y: -0.78, r: 0.28 },
            { x: 0.78, y: 0, r: 0.28 }
        ]),
        ink: hsl(130, 40, 13),
        accent: hsl(130, 70, 50),
        pupil: 'square',
        accentKind: 'caret'
    }
];
const ROLE_BY_ID = new Map(ROLES.map((r) => [r.id, r]));
/** Colori di stato, condivisi da tutti i ruoli. */
const STATE_COLORS = {
    alert: hsl(38, 95, 55),
    error: hsl(4, 78, 56)
};

/* ---- vendor-avatars/core/generate.js ---- */
/**
 * Ruoli generati: da qualunque nome a un avatar unico e STABILE.
 *
 * L'orchestratore permette aziende, dipartimenti e dipendenti arbitrari:
 * un catalogo chiuso non basterebbe. `deriveRole("Magazziniere")` produce
 * sempre lo stesso ruolo — silhouette parametrica, tinta, pupilla e firma
 * dinamica derivate dall'hash del nome — senza nessun lavoro manuale e
 * senza collisioni fra due chiamate con lo stesso nome.
 *
 * I ruoli curati in `roles.ts` hanno la precedenza: se il nome coincide
 * con un id o un'etichetta noti, viene restituito quello.
 */



/** FNV-1a 32 bit: hash compatto e stabile del nome normalizzato. */
function hashName(name) {
    let h = 2166136261;
    for (let i = 0; i < name.length; i++) {
        h ^= name.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}
const ACCENT_KINDS = [
    'orbit',
    'satellite',
    'caret',
    'lines',
    'bars',
    'wave',
    'sparkles',
    'scan',
    'pulse',
    'launch',
    'grid'
];
/** Tinte troppo vicine ai colori di stato (errore #e64337, avviso #f9a91f): si scartano. */
function safeHue(h) {
    const danger = [4, 38];
    for (const d of danger) {
        const dist = Math.min(Math.abs(h - d), 360 - Math.abs(h - d));
        if (dist < 9)
            return (h + 18) % 360;
    }
    return h;
}
function generatedProfile(rng) {
    const family = Math.floor(rng() * 4);
    switch (family) {
        case 0: {
            // poligono regolare: 3-8 lati, angoli più o meno morbidi, rotazione libera
            const sides = 3 + Math.floor(rng() * 6);
            const radius = 0.95 + rng() * 0.1;
            const rc = 0.2 + rng() * 0.2;
            return regularPolygonProfile(sides, radius, rc, rng() * 360);
        }
        case 1: {
            // superellisse: da ellisse a squircle, più o meno schiacciata
            const n = 2.6 + rng() * 2.8;
            const sx = 0.82 + rng() * 0.33;
            const sy = 0.82 + rng() * 0.33;
            return superellipseProfile(n, sx, sy);
        }
        case 2: {
            // fiore: 4-7 petali
            const petals = 4 + Math.floor(rng() * 4);
            const centerR = 0.5 + rng() * 0.12;
            const petalR = 0.3 + rng() * 0.12;
            const dist = 0.55 + rng() * 0.13;
            const rot = rng() * TAU;
            const circles = [{ x: 0, y: 0, r: centerR }];
            for (let i = 0; i < petals; i++) {
                const a = rot + (i / petals) * TAU;
                circles.push({ x: Math.cos(a) * dist, y: Math.sin(a) * dist, r: petalR });
            }
            return unionOfCirclesProfile(circles);
        }
        default: {
            // bean organico: corpo + bozzo in una direzione casuale
            const a = rng() * TAU;
            const d = 0.38 + rng() * 0.2;
            return unionOfCirclesProfile([
                { x: 0, y: 0.06, r: 0.7 + rng() * 0.1 },
                { x: Math.cos(a) * d, y: Math.sin(a) * d, r: 0.3 + rng() * 0.15 }
            ]);
        }
    }
}
/** Maiuscola iniziale, il resto com'è: "addetto social" -> "Addetto social". */
function prettify(name) {
    const t = name.trim();
    return t.charAt(0).toUpperCase() + t.slice(1);
}
/**
 * Ruolo derivato dal nome. Deterministico: stesso nome -> stesso avatar,
 * in console, negli export e nei test.
 */
function deriveRole(name) {
    const key = name.trim().toLowerCase();
    const known = ROLE_BY_ID.get(key) ?? ROLES_BY_LABEL.get(key);
    if (known)
        return known;
    const rng = createRng(hashName(key));
    const profile = generatedProfile(rng);
    const hue = safeHue(rng() * 360);
    const pupilRoll = rng();
    const pupil = pupilRoll < 0.6 ? 'dot' : pupilRoll < 0.8 ? 'square' : 'ring';
    const accentKind = ACCENT_KINDS[Math.floor(rng() * ACCENT_KINDS.length)];
    return {
        id: `custom:${key}`,
        label: prettify(name),
        profile,
        ink: hsl(hue, 36 + rng() * 12, 13 + rng() * 4),
        accent: hsl(hue, 74 + rng() * 18, 54 + rng() * 14),
        pupil,
        accentKind
    };
}
const ROLES_BY_LABEL = (() => {
    const m = new Map();
    for (const r of ROLE_BY_ID.values())
        m.set(r.label.toLowerCase(), r);
    return m;
})();
/**
 * Risolve qualunque riferimento a un ruolo: RoleDef passa com'è, stringa
 * nota -> ruolo curato, stringa libera -> ruolo generato.
 */
function resolveRole(role) {
    return typeof role === 'string' ? deriveRole(role) : role;
}

/* ---- vendor-avatars/core/states.js ---- */
/**
 * Gli stati del kit: cosa MOSTRA un dipendente mentre fa qualcosa.
 *
 * Coreografie originali. Scelte volutamente lontane dal repertorio del bot di
 * riferimento: niente morphing in "!", niente comete, niente triangoli che
 * orbitano. Qui il linguaggio è quello universale delle interfacce — puntini
 * che rimbalzano, aloni radar, barre, caret da terminale — cucito addosso a
 * silhouette e colori propri.
 *
 * Ogni stato dichiara `loop`: la durata su cui le sue animazioni tornano al
 * punto di partenza. Tutte le frequenze interne sono commensurabili a `loop`,
 * così gli export GIF sono senza cuciture.
 */




const eye = (w, h, tilt = 0) => ({ w, h, tilt });
function base(role, over = {}) {
    const pupil = role.pupil === 'ring' ? eye(0.185, 0.185) : eye(0.16, 0.16);
    return {
        sil: fromProfile(role.profile),
        offX: 0,
        offY: 0,
        gaze: { ...REST_GAZE },
        split: EYE_SPLIT,
        eyes: [{ ...pupil }, { ...pupil }],
        eyeAlpha: 1,
        bodyAlpha: 1,
        tint: 0,
        brighten: 0,
        wander: 1,
        lookMix: 1,
        desat: 0,
        float: 1,
        dots: [],
        rings: [],
        carets: [],
        ...over
    };
}
/** Posizioni delle pupille (in raggi di base) per una posa di sguardo data. */
function eyeSpots(gaze, split) {
    const [l, r] = eyePoses(gaze, 1, split);
    return [
        { x: l.x, y: l.y },
        { x: r.x, y: r.y }
    ];
}
/** Scala un profilo radiale (per il corpo raccolto di thinking). */
const scaled = (profile, k, pose = {}) => fromProfile(profile.map((r) => r * k), pose);
/* ------------------------------------------------------ decori di working */
const L = 1.8; // loop di working: tutte le frequenze sotto sono commensurabili
function workingDecor(role, t) {
    const turn = (t / L) * 360;
    switch (role.accentKind) {
        case 'orbit':
            // due archi contro-rotanti: il traffico che il coordinatore governa
            return {
                dots: [],
                carets: [],
                rings: [
                    { cx: 0, cy: 0, r: 1.17, from: turn, sweep: 118, width: 0.05, opacity: 0.75, outside: true },
                    { cx: 0, cy: 0, r: 1.17, from: 180 - turn, sweep: 118, width: 0.05, opacity: 0.45, outside: true }
                ]
            };
        case 'satellite': {
            // una sonda con scia che circumnaviga il corpo
            const a = (t / L) * TAU;
            return {
                rings: [],
                carets: [],
                dots: [
                    { x: Math.cos(a) * 1.26, y: Math.sin(a) * 1.26, r: 0.085, opacity: 0.95, outside: true },
                    { x: Math.cos(a - 0.55) * 1.26, y: Math.sin(a - 0.55) * 1.26, r: 0.05, opacity: 0.4, outside: true }
                ]
            };
        }
        case 'caret': {
            // cursore da terminale che lampeggia in basso a destra
            const phase = (t / 0.9) % 1;
            return {
                dots: [],
                rings: [],
                carets: [{ x: 0.34, y: 0.4, w: 0.26, h: 0.075, rot: 0, opacity: phase < 0.55 ? 0.95 : 0.08 }]
            };
        }
        case 'lines': {
            // tre segni che salgono e svaniscono: righe di testo che scorrono
            const dots = [];
            for (let i = 0; i < 3; i++) {
                const p = (((t + i * 0.2) / 0.6) % 1 + 1) % 1;
                dots.push({ x: -0.28 + i * 0.28, y: 0.4 - p * 0.68, r: 0.07, opacity: Math.sin(p * Math.PI) * 0.9 });
            }
            return { dots, rings: [], carets: [] };
        }
        case 'bars': {
            // mini istogramma pulsante in basso
            const carets = [];
            for (let i = 0; i < 3; i++) {
                const h = 0.15 + 0.17 * (0.5 + 0.5 * Math.sin((t / L) * TAU * 2 + i * (TAU / 3)));
                carets.push({ x: -0.3 + i * 0.3, y: 0.52 - h / 2, w: 0.13, h, rot: 0, opacity: 0.9 });
            }
            return { dots: [], rings: [], carets };
        }
        case 'wave': {
            // due archi che si propagano a destra: la voce che esce dal ricevitore
            const rings = [];
            for (let i = 0; i < 2; i++) {
                const p = (((t / 0.9) + i * 0.5) % 1 + 1) % 1;
                rings.push({
                    cx: 0.12,
                    cy: 0,
                    r: 0.58 + p * 0.52,
                    from: -72,
                    sweep: 144,
                    width: 0.06,
                    opacity: (1 - p) * 0.8,
                    outside: true
                });
            }
            return { dots: [], carets: [], rings };
        }
        case 'sparkles': {
            // due scintille in contro-fase
            const a = (t / L) * TAU;
            const dots = [];
            for (let i = 0; i < 2; i++) {
                const ai = a + i * Math.PI;
                dots.push({
                    x: Math.cos(ai) * 0.84,
                    y: Math.sin(ai) * 0.84,
                    r: 0.065,
                    opacity: 0.35 + 0.6 * (0.5 + 0.5 * Math.sin((t / L) * TAU * 4 + i * Math.PI)),
                    outside: true
                });
            }
            return { dots, rings: [], carets: [] };
        }
        case 'scan': {
            // una riga di scansione che percorre il corpo su e giù (onda triangolare)
            const p = (((t / L) % 1) + 1) % 1;
            const tri = p < 0.5 ? p * 2 : 2 - p * 2;
            return {
                dots: [],
                rings: [],
                carets: [{ x: 0, y: -0.58 + tri * 1.16, w: 0.78, h: 0.05, rot: 0, opacity: 0.9 }]
            };
        }
        case 'pulse': {
            // archi che si propagano da ENTRAMBI i lati: trasmette
            const rings = [];
            for (let side = 0; side < 2; side++) {
                for (let i = 0; i < 2; i++) {
                    const p = (((t / 0.9) + i * 0.5) % 1 + 1) % 1;
                    rings.push({
                        cx: side === 0 ? 0.12 : -0.12,
                        cy: 0,
                        r: 0.58 + p * 0.52,
                        from: side === 0 ? -72 : 108,
                        sweep: 144,
                        width: 0.06,
                        opacity: (1 - p) * 0.7,
                        outside: true
                    });
                }
            }
            return { dots: [], carets: [], rings };
        }
        case 'launch': {
            // un punto con scia che parte in diagonale: la campagna che decolla
            const p = (((t / L) % 1) + 1) % 1;
            const pos = (q) => ({
                x: -0.85 + q * 1.7,
                y: 0.5 - q * 1.05 - Math.sin(q * Math.PI) * 0.18
            });
            const fade = p < 0.08 ? p / 0.08 : 1;
            const dots = [0, 0.07, 0.15].map((back, i) => {
                const q = Math.max(0, p - back);
                const s = pos(q);
                return { x: s.x, y: s.y, r: 0.08 - i * 0.022, opacity: fade * (0.95 - i * 0.3), outside: true };
            });
            return { dots, rings: [], carets: [] };
        }
        case 'grid': {
            // matrice 2x2 di punti che pulsa a scacchiera: la suite di test
            const dots = [];
            const pos = [
                [-0.24, -0.24],
                [0.24, -0.24],
                [0.24, 0.24],
                [-0.24, 0.24]
            ];
            pos.forEach(([x, y], i) => {
                dots.push({
                    x: x,
                    y: y,
                    r: 0.095,
                    opacity: 0.25 + 0.75 * (0.5 + 0.5 * Math.sin((t / 0.9) * TAU + i * Math.PI))
                });
            });
            return { dots, rings: [], carets: [] };
        }
    }
}
/* ------------------------------------------------------------------ stati */
const STATES = [
    {
        id: 'idle',
        label: 'fermo',
        loop: 4,
        morph: 0.35,
        blinkIn: false,
        // respiro e dondolio dello sguardo vivono NELLA posa (periodo 4 s, due
        // armoniche): così anche gli export senza liveliness restano vivi e il
        // loop torna esattamente al punto di partenza
        pose: (t, role) => base(role, {
            sil: fromProfile(role.profile, { sy: 1 + Math.sin((t / 4) * TAU) * 0.012 }),
            gaze: {
                yaw: Math.sin((t / 4) * TAU) * 3.5,
                pitch: -6 + Math.sin((t / 2) * TAU) * 1.5,
                roll: 0
            }
        })
    },
    {
        id: 'working',
        label: 'al lavoro',
        loop: L,
        morph: 0.35,
        blinkIn: true,
        pose: (t, role) => {
            const bob = Math.sin((t / 0.9) * TAU);
            return base(role, {
                sil: fromProfile(role.profile, { cy: bob * 0.022, sy: 1 - bob * 0.018 }),
                // scansione: lo sguardo perlustra, non vaga
                gaze: { yaw: Math.sin((t / L) * TAU) * 13, pitch: -3, roll: 0 },
                eyes: [eye(0.155, 0.13), eye(0.155, 0.13)],
                wander: 0.35,
                ...workingDecor(role, t)
            });
        }
    },
    {
        id: 'thinking',
        label: 'elaborazione',
        loop: 1.8,
        morph: 0.35,
        blinkIn: true,
        pose: (t, role) => {
            // il corpo si raccoglie in basso e tre puntini rimbalzano sopra
            const dots = [];
            for (let i = 0; i < 3; i++) {
                const bounce = Math.abs(Math.sin(((t - i * 0.15) / 0.9) * TAU));
                dots.push({ x: -0.36 + i * 0.36, y: -0.16 - bounce * 0.15, r: 0.115, opacity: 0.95, outside: true });
            }
            return base(role, {
                sil: scaled(role.profile, 0.34, { cy: 0.52 }),
                bodyAlpha: 0.5,
                eyeAlpha: 0,
                wander: 0,
                float: 0,
                dots
            });
        }
    },
    {
        id: 'alert',
        label: 'avviso',
        loop: 1.2,
        morph: 0.3,
        blinkIn: false,
        pose: (t, role) => {
            const rings = [];
            for (let i = 0; i < 2; i++) {
                const p = (((t / 1.2) + i * 0.5) % 1 + 1) % 1;
                rings.push({
                    cx: 0,
                    cy: 0,
                    r: 1.04 + p * 0.46,
                    from: 0,
                    sweep: 360,
                    width: 0.075 * (1 - p) + 0.02,
                    opacity: (1 - p) * 0.85,
                    outside: true
                });
            }
            return base(role, {
                gaze: { yaw: 0, pitch: 0, roll: 0 },
                eyes: [eye(0.2, 0.2), eye(0.2, 0.2)],
                offX: Math.sin(t * TAU * 7.5) * 0.012,
                tint: 0.85,
                wander: 0.2,
                rings
            });
        }
    },
    {
        id: 'success',
        label: 'completato',
        loop: 1.4,
        morph: 0.35,
        blinkIn: true,
        pose: (t, role) => {
            // hop strettamente periodico: niente clamp, così frame(loop) == frame(0)
            const hop = Math.abs(Math.sin(((t % 1.4) / 1.4) * Math.PI));
            const gaze = { yaw: 0, pitch: 10, roll: 0 };
            const spots = eyeSpots(gaze, EYE_SPLIT);
            // occhi felici a mezzaluna
            const happy = spots.map((s) => ({
                cx: s.x,
                cy: s.y,
                r: 0.15,
                from: 190,
                sweep: 160,
                width: 0.055,
                opacity: 1
            }));
            // impulso di celebrazione a ogni loop
            const p = (t / 1.4) % 1;
            const pulse = { cx: 0, cy: 0, r: 0.55 + p * 0.85, from: 0, sweep: 360, width: 0.05, opacity: (1 - p) * 0.45, outside: true };
            const sparkles = [45, 135, 225, 315].map((deg, i) => {
                const a = (deg * Math.PI) / 180;
                return {
                    x: Math.cos(a) * 0.88,
                    y: Math.sin(a) * 0.88,
                    r: 0.055,
                    opacity: 0.3 + 0.7 * (0.5 + 0.5 * Math.sin((t / 0.7) * TAU + (i * Math.PI) / 2)),
                    outside: true
                };
            });
            return base(role, {
                sil: fromProfile(role.profile, { cy: -hop * 0.13, sy: 1 + hop * 0.06 }),
                gaze,
                eyeAlpha: 0,
                brighten: 0.3,
                wander: 0.15,
                rings: [...happy, pulse],
                dots: sparkles
            });
        }
    },
    {
        id: 'error',
        label: 'errore',
        loop: 1,
        morph: 0.3,
        blinkIn: true,
        pose: (t, role) => {
            const spots = eyeSpots(REST_GAZE, EYE_SPLIT);
            // occhi a X: due tacche incrociate per pupilla
            const carets = spots.flatMap((s) => [
                { x: s.x, y: s.y, w: 0.3, h: 0.07, rot: 45, opacity: 0.95, face: true },
                { x: s.x, y: s.y, w: 0.3, h: 0.07, rot: -45, opacity: 0.95, face: true }
            ]);
            return base(role, {
                eyeAlpha: 0,
                tint: 0.9,
                wander: 0,
                float: 0,
                offX: Math.sin(t * TAU * 9) * 0.02 * (0.7 + 0.3 * Math.sin(t * TAU)),
                carets
            });
        }
    },
    {
        id: 'dormant',
        label: 'dormiente',
        loop: 3,
        morph: 0.6,
        blinkIn: false, // gli occhi si chiudono col morph: è la transizione stessa
        pose: (t, role) => {
            // respiro lento e profondo (periodo = loop), corpo leggermente afflosciato
            const breath = Math.sin((t / 3) * TAU);
            const sil = scaled(role.profile, 0.95, {
                cy: 0.04 + breath * 0.012,
                sx: 1.012,
                sy: 0.958 + breath * 0.024
            });
            // "z" che salgono in alto a destra: tre glifi in contro-fase, ognuno
            // composto da 3 caret (barra, diagonale, barra). Crescono e svaniscono.
            const carets = [];
            for (let i = 0; i < 3; i++) {
                const p = (((t / 3) + i / 3) % 1 + 1) % 1;
                const x = 0.52 + p * 0.42;
                const y = -0.52 - p * 0.68;
                const s = 0.2 + p * 0.2;
                const o = Math.sin(p * Math.PI) * 0.9;
                carets.push({ x, y: y - s * 0.34, w: s, h: s * 0.17, rot: 0, opacity: o, outside: true }, { x, y, w: s * 1.22, h: s * 0.17, rot: 52, opacity: o, outside: true }, { x, y: y + s * 0.34, w: s, h: s * 0.17, rot: 0, opacity: o, outside: true });
            }
            return base(role, {
                sil,
                // palpebre chiuse: pupille ridotte a fessure, angoli esterni rilassati
                eyes: [eye(0.145, 0.02, 8), eye(0.145, 0.02, -8)],
                gaze: { yaw: Math.sin((t / 3) * TAU) * 2, pitch: -9, roll: 0 },
                wander: 0,
                lookMix: 0, // chi dorme non segue il puntatore
                desat: 0.35, // leggera desaturazione: i colori "riposano"
                float: 0.5,
                carets
            });
        }
    },
    {
        id: 'offline',
        label: 'spento',
        loop: 2,
        morph: 0.45,
        blinkIn: false,
        // dimensione quasi piena (0.85), forma INVARIATA: una riduzione maggiore
        // sparirebbe nelle liste dense. Lo "spento" si legge da: niente volto,
        // opacità ridotta, grigio desaturato (colore e assenza del volto restano
        // leggibili anche nei GIF, dove l'alpha è binario).
        pose: (_t, role) => base(role, {
            sil: scaled(role.profile, 0.85),
            bodyAlpha: 0.38,
            eyeAlpha: 0,
            desat: 0.65,
            wander: 0,
            lookMix: 0,
            float: 0
        })
    }
];
const STATE_BY_ID = new Map(STATES.map((s) => [s.id, s]));
/**
 * Istante più leggibile di ogni stato, in tempo locale: la posa mostrata
 * dalle miniature e dagli SVG statici. Il motore è deterministico, quindi
 * l'immagine è identica a ogni export.
 */
const HERO_TIME = {
    idle: 1.2,
    working: 0.9,
    thinking: 0.6,
    alert: 0.6,
    success: 0.5,
    error: 0.5,
    dormant: 1.5,
    offline: 1
};
const STATE_COLOR_BY_ID = {
    alert: STATE_COLORS.alert,
    error: STATE_COLORS.error
};

/* ---- vendor-avatars/core/engine.js ---- */
/**
 * Motore degli avatar: una funzione pura del tempo.
 *
 * `sample(t)` non ha orologio né stato nascosto: tutta la mutazione entra da
 * setter DATATI (`setState`, `setRole`, `setLook`). Conseguenze pratiche:
 * pausa, ripresa, rallenti e salto a una data arbitraria danno esattamente la
 * stessa immagine; il rendering è testabile senza DOM; l'export di un GIF è
 * lo stesso identico campionamento che vede l'utente nella console.
 *
 * Architettura adattata da bloub (MIT), vedi NOTICE. Stati, costanti e
 * design sono originali del kit.
 */





const NO_LOOK = { yaw: 0, pitch: 0, mix: 0 };
const NO_LIFE = { dYaw: 0, dPitch: 0, dRoll: 0, lid: 1, driftX: 0, driftY: 0, breath: 1 };
const lerpGaze = (a, b, t) => ({
    yaw: lerp(a.yaw, b.yaw, t),
    pitch: lerp(a.pitch, b.pitch, t),
    roll: lerp(a.roll, b.roll, t)
});
const lerpEye = (a, b, t) => ({
    w: lerp(a.w, b.w, t),
    h: lerp(a.h, b.h, t),
    tilt: lerp(a.tilt, b.tilt, t)
});
/** Interpolazione fra pose: la geometria si fonde, i decori si incrociano in opacità. */
function blendPose(a, b, t) {
    const out = 1 - t;
    return {
        sil: blend(a.sil, b.sil, t),
        offX: lerp(a.offX, b.offX, t),
        offY: lerp(a.offY, b.offY, t),
        gaze: lerpGaze(a.gaze, b.gaze, t),
        split: lerp(a.split, b.split, t),
        eyes: [lerpEye(a.eyes[0], b.eyes[0], t), lerpEye(a.eyes[1], b.eyes[1], t)],
        eyeAlpha: lerp(a.eyeAlpha, b.eyeAlpha, t),
        bodyAlpha: lerp(a.bodyAlpha, b.bodyAlpha, t),
        tint: lerp(a.tint, b.tint, t),
        brighten: lerp(a.brighten, b.brighten, t),
        wander: lerp(a.wander, b.wander, t),
        lookMix: lerp(a.lookMix, b.lookMix, t),
        desat: lerp(a.desat, b.desat, t),
        float: lerp(a.float, b.float, t),
        dots: [...a.dots.map((d) => ({ ...d, opacity: d.opacity * out })), ...b.dots.map((d) => ({ ...d, opacity: d.opacity * t }))],
        rings: [...a.rings.map((r) => ({ ...r, opacity: r.opacity * out })), ...b.rings.map((r) => ({ ...r, opacity: r.opacity * t }))],
        carets: [...a.carets.map((c) => ({ ...c, opacity: c.opacity * out })), ...b.carets.map((c) => ({ ...c, opacity: c.opacity * t }))]
    };
}
class AvatarEngine {
    /** raggio di base in unità di viewBox */
    scale;
    role;
    rolePrev = null;
    roleAt = -10;
    cur;
    prev = null;
    /** posa di partenza congelata quando un cambio arriva a metà di un morph */
    frozen = null;
    tCur = 0;
    tPrev = 0;
    blinkAt = -10;
    look = NO_LOOK;
    lookPrev = NO_LOOK;
    lookAt = -10;
    lookMorph = 0.24;
    pts = [];
    liveliness;
    static MORPH = 0.35;
    static ROLE_MORPH = 0.45;
    static LOOK_MORPH = 0.24;
    constructor(role = 'coordinator', initial = 'idle', scale = 100, opts = {}) {
        this.scale = scale;
        this.role = resolveRole(role);
        this.cur = initial;
        this.liveliness = opts.liveliness ?? true;
    }
    get state() {
        return this.cur;
    }
    get roleDef() {
        return this.role;
    }
    /** Cambio ruolo: silhouette e colori scorrono verso il nuovo ruolo. */
    setRole(role, now = 0) {
        const next = resolveRole(role);
        if (next.id === this.role.id)
            return;
        this.rolePrev = this.role;
        this.role = next;
        this.roleAt = now;
    }
    /** Progresso del morph di ruolo a `now` (1 = concluso). */
    roleK(now) {
        if (!this.rolePrev)
            return 1;
        return easings.easeOutQuint(clamp((now - this.roleAt) / AvatarEngine.ROLE_MORPH));
    }
    /** Il ruolo effettivo a `now`: profilo interpolato durante il morph. */
    roleAtTime(now) {
        const from = this.rolePrev;
        if (!from)
            return this.role;
        const k = this.roleK(now);
        if (k >= 1)
            return this.role;
        const profile = this.role.profile.map((r, i) => lerp(from.profile[i] ?? r, r, k));
        return { ...this.role, profile };
    }
    /** Nuova mira dello sguardo; `null` restituisce il controllo allo stato. */
    setLook(look, now, morph = AvatarEngine.LOOK_MORPH) {
        if (look && !Number.isFinite(look.yaw + look.pitch + look.mix))
            return;
        this.lookPrev = this.lookAtTime(now);
        this.look = look ?? NO_LOOK;
        this.lookAt = now;
        this.lookMorph = morph;
    }
    lookAtTime(now) {
        const k = (now - this.lookAt) / this.lookMorph;
        if (k >= 1)
            return this.look;
        const t = easings.easeOutQuint(clamp(k));
        return {
            yaw: lerp(this.lookPrev.yaw, this.look.yaw, t),
            pitch: lerp(this.lookPrev.pitch, this.look.pitch, t),
            mix: lerp(this.lookPrev.mix, this.look.mix, t)
        };
    }
    /** Riparte pulito su uno stato, senza ereditare il morph dal precedente. */
    reset(id, now) {
        this.cur = id;
        this.prev = null;
        this.frozen = null;
        this.tCur = now;
        this.tPrev = now;
        this.blinkAt = -10;
    }
    posed(id, local, role) {
        return STATE_BY_ID.get(id).pose(Math.max(0, local), role);
    }
    origin(now, role) {
        if (this.frozen)
            return this.frozen;
        if (!this.prev)
            return null;
        return this.posed(this.prev, now - this.tPrev, role);
    }
    composite(now, role) {
        const def = STATE_BY_ID.get(this.cur);
        const pose = this.posed(this.cur, now - this.tCur, role);
        const since = now - this.tCur;
        if (since >= def.morph)
            return pose;
        const orig = this.origin(now, role);
        if (!orig)
            return pose;
        return blendPose(orig, pose, easings.easeOutQuint(clamp(since / def.morph)));
    }
    /**
     * Cambio di stato, datato. Se arriva a morph ancora in corso, la posa
     * composita corrente viene congelata e usata come origine: continuità
     * garantita per qualunque sequenza di cambi.
     */
    setState(id, now) {
        if (id === this.cur)
            return;
        const morph = STATE_BY_ID.get(this.cur).morph;
        const midMorph = this.prev !== null && now - this.tCur < morph;
        this.frozen = midMorph ? this.composite(now, this.roleAtTime(now)) : null;
        this.prev = this.cur;
        this.tPrev = this.tCur;
        this.cur = id;
        this.tCur = now;
        if (STATE_BY_ID.get(id)?.blinkIn)
            this.blinkAt = now;
    }
    sample(now) {
        const R = this.scale;
        const def = STATE_BY_ID.get(this.cur);
        const role = this.roleAtTime(now);
        const kRole = this.roleK(now);
        let pose = this.posed(this.cur, now - this.tCur, role);
        const since = now - this.tCur;
        if (since < def.morph) {
            const orig = this.origin(now, role);
            if (orig)
                pose = blendPose(orig, pose, easings.easeOutQuint(clamp(since / def.morph)));
        }
        // --- vita -------------------------------------------------------------
        const alive = pose.eyeAlpha > 0.01;
        const look = this.lookAtTime(now);
        // lo stato decide quanto ascoltare il pilota esterno (dormant: per nulla)
        const lookMix = look.mix * pose.lookMix;
        const life = this.liveliness
            ? liveliness(now, {
                wander: alive ? pose.wander * (1 - lookMix) : 0,
                blink: alive,
                float: pose.float > 0.01
            })
            : NO_LIFE;
        const fl = pose.float;
        const gaze = {
            yaw: lerp(pose.gaze.yaw, look.yaw, lookMix) + life.dYaw,
            pitch: lerp(pose.gaze.pitch, look.pitch, lookMix) + life.dPitch,
            roll: pose.gaze.roll + life.dRoll
        };
        // battito forzato al cambio di stato, oltre al calendario
        const forced = clamp((now - this.blinkAt) / 0.2);
        const forcedLid = this.liveliness && forced < 1 ? Math.abs(forced * 2 - 1) : 1;
        const lid = Math.min(life.lid, forcedLid);
        const offX = pose.offX + life.driftX * fl;
        const offY = pose.offY + life.driftY * fl;
        // --- corpo ------------------------------------------------------------
        const sil = {
            ...pose.sil,
            cx: pose.sil.cx + offX,
            cy: pose.sil.cy + offY,
            sy: pose.sil.sy * (1 + (life.breath - 1) * fl)
        };
        const bodyPoints = toPoints(sil, R, this.pts).map((p) => ({ ...p }));
        const bodyPath = closedPath(bodyPoints);
        // --- colori -----------------------------------------------------------
        const stateColor = STATE_COLOR_BY_ID[this.cur] ?? null;
        const inkA = this.rolePrev && kRole < 1 ? this.rolePrev.ink : this.role.ink;
        const accentA = this.rolePrev && kRole < 1 ? this.rolePrev.accent : this.role.accent;
        const ink = mixRgb(inkA, this.role.ink, kRole);
        const accent = mixRgb(accentA, this.role.accent, kRole);
        // Il corpo tinto resta SCURO (l'identità del kit è "inchiostro + accento
        // luminoso"): alert/error scuriscono la tinta di stato invece di
        // accenderla, e il volto passa a bianco per restare leggibile.
        const stateDark = stateColor ? mixRgb(stateColor, [18, 18, 26], 0.62) : null;
        let bodyFill = stateDark ? mixRgb(ink, stateDark, pose.tint) : [...ink];
        if (pose.brighten > 0)
            bodyFill = mixRgb(bodyFill, accent, pose.brighten * 0.35);
        const tinted = stateColor !== null && pose.tint > 0.5;
        let faceColor = tinted ? [245, 245, 250] : [...accent];
        let decorColor = stateColor ? mixRgb(accent, stateColor, pose.tint) : [...accent];
        // desaturazione (sonno, spegnimento): tutto scivola verso la propria
        // luminanza in grigio, senza cambiare la struttura dell'immagine
        if (pose.desat > 0) {
            const gray = (c) => {
                const l = 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2];
                return [l, l, l];
            };
            bodyFill = mixRgb(bodyFill, gray(bodyFill), pose.desat);
            faceColor = mixRgb(faceColor, gray(faceColor), pose.desat);
            decorColor = mixRgb(decorColor, gray(decorColor), pose.desat);
        }
        // --- pupille ----------------------------------------------------------
        const pupilShape = this.rolePrev && kRole < 0.5 ? this.rolePrev.pupil : this.role.pupil;
        const pupils = [];
        if (pose.eyeAlpha > 0.01) {
            const bodyRadius = (x, y) => radiusAtAngle(pose.sil.radii, Math.atan2(y, x) - pose.sil.rot);
            const poses = eyePoses(gaze, R, pose.split);
            for (let i = 0; i < 2; i++) {
                const e = poses[i];
                if (e.depth <= 0.02)
                    continue;
                const cfg = pose.eyes[i];
                const fit = bodyRadius(e.x, e.y);
                const phi = (cfg.tilt * Math.PI) / 180;
                const cp = Math.cos(phi);
                const sp = Math.sin(phi);
                const ax = e.a * cp + e.c * sp;
                const ay = e.b * cp + e.d * sp;
                const cx2 = -e.a * sp + e.c * cp;
                const cy2 = -e.b * sp + e.d * cp;
                const k = blinkScale(Math.min(lid, 1));
                pupils.push({
                    shape: pupilShape,
                    m: [
                        ax * cfg.w * R,
                        ay * cfg.w * R * k,
                        cx2 * cfg.h * R,
                        cy2 * cfg.h * R * k,
                        e.x * fit + offX * R,
                        e.y * fit + offY * R
                    ],
                    alpha: pose.eyeAlpha * clamp(e.depth / 0.12)
                });
            }
        }
        // --- decori -----------------------------------------------------------
        const dots = pose.dots
            .filter((d) => d.opacity > 0.01 && d.r > 0.001)
            .map((d) => ({ x: (d.x + offX) * R, y: (d.y + offY) * R, r: d.r * R, opacity: clamp(d.opacity), outside: d.outside ?? false }));
        const rings = pose.rings
            .filter((r) => r.opacity > 0.01 && r.r > 0.001)
            .map((r) => ({
            cx: (r.cx + offX) * R,
            cy: (r.cy + offY) * R,
            r: r.r * R,
            // normalizzato: 360,2deg e 0,2deg sono lo stesso arco, e il loop resta confrontabile
            from: ((r.from % 360) + 360) % 360,
            sweep: r.sweep,
            width: r.width * R,
            opacity: clamp(r.opacity),
            outside: r.outside ?? false
        }));
        const carets = pose.carets
            .filter((c) => c.opacity > 0.01)
            .map((c) => ({
            x: (c.x + offX) * R,
            y: (c.y + offY) * R,
            w: c.w * R,
            h: c.h * R,
            rot: c.rot,
            opacity: clamp(c.opacity),
            outside: c.outside ?? false,
            face: c.face ?? false
        }));
        return {
            bodyPath,
            bodyPoints,
            bodyFill,
            bodyAlpha: clamp(pose.bodyAlpha),
            faceColor,
            decorColor,
            pupils,
            dots,
            rings,
            carets
        };
    }
}

/* ---- vendor-avatars/core/render.js ---- */
/**
 * Rendering di un frame in SVG standalone.
 *
 * Serve agli export (asset statici) e a qualunque integrazione non-React:
 * il componente React disegna gli stessi elementi a partire dallo stesso
 * frame, quindi console e asset sono sempre identici.
 */

/** raggio di base in unità viewBox */
const SCALE = 100;
/** metà lato del viewBox: la marge oltre il corpo ospita anelli e satelliti */
const VIEW = 160;
/** Cerchio unitario centrato nell'origine, come path. */
const UNIT_CIRCLE = 'M1 0A1 1 0 1 1 -1 0A1 1 0 1 1 1 0Z';
/** Superellisse unitaria n=3.5: il "quadrato morbido" delle pupille developer. */
const UNIT_SQUARE = (() => {
    const n = 3.5;
    const pts = [];
    for (let i = 0; i < 40; i++) {
        const a = (i / 40) * TAU;
        const c = Math.cos(a);
        const s = Math.sin(a);
        const x = Math.sign(c) * Math.abs(c) ** (2 / n);
        const y = Math.sign(s) * Math.abs(s) ** (2 / n);
        pts.push(`${i === 0 ? 'M' : 'L'}${r2(x)} ${r2(y)}`);
    }
    return pts.join('') + 'Z';
})();
/** Arco (o cerchio pieno) come path, angoli in gradi, 0 = est, senso orario. */
function arcPath(ring) {
    const { cx, cy, r } = ring;
    if (ring.sweep >= 359.9) {
        return `M${r2(cx + r)} ${r2(cy)}A${r2(r)} ${r2(r)} 0 1 1 ${r2(cx - r)} ${r2(cy)}A${r2(r)} ${r2(r)} 0 1 1 ${r2(cx + r)} ${r2(cy)}`;
    }
    const a0 = (ring.from * Math.PI) / 180;
    const a1 = ((ring.from + ring.sweep) * Math.PI) / 180;
    const x0 = cx + Math.cos(a0) * r;
    const y0 = cy + Math.sin(a0) * r;
    const x1 = cx + Math.cos(a1) * r;
    const y1 = cy + Math.sin(a1) * r;
    const large = ring.sweep > 180 ? 1 : 0;
    return `M${r2(x0)} ${r2(y0)}A${r2(r)} ${r2(r)} 0 ${large} 1 ${r2(x1)} ${r2(y1)}`;
}
const mat = (m) => `matrix(${m.map(r2).join(' ')})`;
/** Frame -> documento SVG completo, pronto da salvare o iniettare. */
function renderSvg(frame, opts) {
    const clipId = `${opts.id}-clip`;
    const body = rgbCss(frame.bodyFill);
    const face = rgbCss(frame.faceColor);
    const decor = rgbCss(frame.decorColor);
    const dotsSvg = (outside) => frame.dots
        .filter((d) => d.outside === outside)
        .map((d) => `<circle cx="${r2(d.x)}" cy="${r2(d.y)}" r="${r2(d.r)}" fill="${decor}" opacity="${r2(d.opacity)}"/>`)
        .join('');
    const ringsSvg = (outside) => frame.rings
        .filter((g) => g.outside === outside)
        .map((g) => `<path d="${arcPath(g)}" fill="none" stroke="${decor}" stroke-width="${r2(g.width)}" stroke-linecap="round" opacity="${r2(g.opacity)}"/>`)
        .join('');
    const caretsSvg = (outside) => frame.carets
        .filter((c) => c.outside === outside)
        .map((c) => `<rect x="${r2(-c.w / 2)}" y="${r2(-c.h / 2)}" width="${r2(c.w)}" height="${r2(c.h)}" rx="${r2(c.h / 2)}" fill="${c.face ? face : decor}" opacity="${r2(c.opacity)}" transform="translate(${r2(c.x)} ${r2(c.y)}) rotate(${r2(c.rot)})"/>`)
        .join('');
    const pupilsSvg = frame.pupils
        .map((p) => {
        const d = p.shape === 'square' ? UNIT_SQUARE : UNIT_CIRCLE;
        if (p.shape === 'ring') {
            return `<path d="${d}" fill="none" stroke="${face}" stroke-width="0.3" opacity="${r2(p.alpha)}" transform="${mat(p.m)}"/>`;
        }
        return `<path d="${d}" fill="${face}" opacity="${r2(p.alpha)}" transform="${mat(p.m)}"/>`;
    })
        .join('');
    return (`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-VIEW} ${-VIEW} ${VIEW * 2} ${VIEW * 2}">` +
        `<defs><clipPath id="${clipId}"><path d="${frame.bodyPath}"/></clipPath></defs>` +
        dotsSvg(true) +
        ringsSvg(true) +
        caretsSvg(true) +
        `<path d="${frame.bodyPath}" fill="${body}" opacity="${r2(frame.bodyAlpha)}"/>` +
        `<g clip-path="url(#${clipId})">` +
        dotsSvg(false) +
        ringsSvg(false) +
        caretsSvg(false) +
        pupilsSvg +
        `</g>` +
        `</svg>`);
}

return { AvatarEngine, deriveRole, resolveRole, ROLES, ROLE_BY_ID, STATES, STATE_BY_ID, HERO_TIME,
  arcPath, renderSvg, SCALE, VIEW, UNIT_CIRCLE, UNIT_SQUARE, rgbCss, r2, createRng };
})();
