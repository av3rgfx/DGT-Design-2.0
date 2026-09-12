/**
 * Rendering di un frame in SVG standalone.
 *
 * Serve agli export (asset statici) e a qualunque integrazione non-React:
 * il componente React disegna gli stessi elementi a partire dallo stesso
 * frame, quindi console e asset sono sempre identici.
 */
import { TAU, r2, rgbCss } from './math.js';
/** raggio di base in unità viewBox */
export const SCALE = 100;
/** metà lato del viewBox: la marge oltre il corpo ospita anelli e satelliti */
export const VIEW = 160;
/** Cerchio unitario centrato nell'origine, come path. */
export const UNIT_CIRCLE = 'M1 0A1 1 0 1 1 -1 0A1 1 0 1 1 1 0Z';
/** Superellisse unitaria n=3.5: il "quadrato morbido" delle pupille developer. */
export const UNIT_SQUARE = (() => {
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
export function arcPath(ring) {
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
export function renderSvg(frame, opts) {
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
