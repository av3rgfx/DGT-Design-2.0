/** Entry point core: zero dipendenze, nessun import di React. */
export { AvatarEngine } from './core/engine.js';
export { ROLES, ROLE_BY_ID, STATE_COLORS } from './core/roles.js';
export { STATES, STATE_BY_ID, HERO_TIME } from './core/states.js';
export { deriveRole, resolveRole } from './core/generate.js';
export { regularPolygonProfile, superellipseProfile, unionOfCirclesProfile, polygonProfile } from './core/shape.js';
export { renderSvg, arcPath, SCALE, VIEW } from './core/render.js';
