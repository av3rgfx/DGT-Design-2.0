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
import { blinkScale, eyePoses, liveliness } from './gaze.js';
import { clamp, easings, lerp, mixRgb } from './math.js';
import { STATE_BY_ID, STATE_COLOR_BY_ID } from './states.js';
import { resolveRole } from './generate.js';
import { blend, closedPath, radiusAtAngle, toPoints } from './shape.js';
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
export class AvatarEngine {
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
