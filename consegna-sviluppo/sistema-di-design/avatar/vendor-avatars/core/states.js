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
import { EYE_SPLIT, REST_GAZE, eyePoses } from './gaze.js';
import { TAU } from './math.js';
import { fromProfile } from './shape.js';
import { STATE_COLORS } from './roles.js';
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
export const STATES = [
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
export const STATE_BY_ID = new Map(STATES.map((s) => [s.id, s]));
/**
 * Istante più leggibile di ogni stato, in tempo locale: la posa mostrata
 * dalle miniature e dagli SVG statici. Il motore è deterministico, quindi
 * l'immagine è identica a ogni export.
 */
export const HERO_TIME = {
    idle: 1.2,
    working: 0.9,
    thinking: 0.6,
    alert: 0.6,
    success: 0.5,
    error: 0.5,
    dormant: 1.5,
    offline: 1
};
export const STATE_COLOR_BY_ID = {
    alert: STATE_COLORS.alert,
    error: STATE_COLORS.error
};
