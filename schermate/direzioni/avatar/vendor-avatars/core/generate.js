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
import { TAU, createRng, hsl } from './math.js';
import { regularPolygonProfile, superellipseProfile, unionOfCirclesProfile } from './shape.js';
import { ROLE_BY_ID } from './roles.js';
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
export function deriveRole(name) {
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
export function resolveRole(role) {
    return typeof role === 'string' ? deriveRole(role) : role;
}
