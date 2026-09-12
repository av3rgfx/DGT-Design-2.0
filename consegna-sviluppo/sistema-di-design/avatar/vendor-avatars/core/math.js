/**
 * Utilità matematiche del kit avatar.
 *
 * Algoritmi generici adattati da bloub (https://github.com/jeremy-prt/bloub),
 * licenza MIT — vedi NOTICE nella radice del kit. Le costanti di design
 * (periodi, ampiezze, semi) sono originali di questo kit.
 */
export const TAU = Math.PI * 2;
export const clamp = (v, lo = 0, hi = 1) => (v < lo ? lo : v > hi ? hi : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const easings = {
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
export function loopNoise(t, period, seed = 0) {
    const p = (t / period) * TAU;
    return (0.55 * Math.sin(p + seed) +
        0.3 * Math.sin(2 * p + seed * 1.7 + 1.1) +
        0.15 * Math.sin(3 * p + seed * 2.3 + 2.4));
}
/** PRNG deterministico (mulberry32): stessa sequenza a ogni esecuzione. */
export function createRng(seed) {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
/** Arrondi a 2 decimali: dimezza il peso delle stringhe path generate a 30-60 fps. */
export const r2 = (v) => Math.round(v * 100) / 100;
/** Mescola due colori RGB espressi come [r,g,b] 0-255. */
export function mixRgb(a, b, t) {
    return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}
export const rgbCss = (c) => `rgb(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])})`;
/** HSL -> RGB 0-255. `s` e `l` in percentuale (0-100), come in CSS. */
export function hsl(h, s, l) {
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
