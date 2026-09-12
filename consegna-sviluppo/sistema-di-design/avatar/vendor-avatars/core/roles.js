/**
 * I ruoli del kit: 7 design ORIGINALI, uno per tipo di "dipendente" AI.
 *
 * Ogni ruolo è una tripletta (silhouette, palette, pupilla) pensata per
 * essere riconoscibile a 32 px e irriducibile a qualsiasi avatar esistente:
 * niente sfera nera, niente occhi a capsula — corpi geometrici scuri tinti
 * nella tinta del ruolo, pupille tonde luminose.
 */
import { TAU, hsl } from './math.js';
import { polygonProfile, regularPolygonProfile, superellipseProfile, unionOfCirclesProfile } from './shape.js';
/** Petali del designer: corpo centrale + 5 lobi, fiore organico. */
const flowerProfile = () => {
    const petals = Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * TAU - Math.PI / 2;
        return { x: Math.cos(a) * 0.6, y: Math.sin(a) * 0.6, r: 0.37 };
    });
    return unionOfCirclesProfile([{ x: 0, y: 0, r: 0.58 }, ...petals]);
};
export const ROLES = [
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
export const ROLE_BY_ID = new Map(ROLES.map((r) => [r.id, r]));
/** Colori di stato, condivisi da tutti i ruoli. */
export const STATE_COLORS = {
    alert: hsl(38, 95, 55),
    error: hsl(4, 78, 56)
};
