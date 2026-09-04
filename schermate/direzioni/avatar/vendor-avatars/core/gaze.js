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
import { clamp, createRng, loopNoise } from './math.js';
/** Posa di riposo del kit: frontale, mento appena basso. */
export const REST_GAZE = { yaw: 0, pitch: -6, roll: 0 };
/** Semi-separazione delle pupille sulla sfera, in gradi. */
export const EYE_SPLIT = 17;
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
export function eyePoses(gaze, scale, split = EYE_SPLIT) {
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
export function liveliness(t, opt = {}) {
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
export function blinkScale(lid) {
    return 0.08 + 0.92 * clamp(lid);
}
