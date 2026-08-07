# Geothermal Heat Pump Scene Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recreate the DOE geothermal heat pump animation as an original SVG scene above the existing chapter 1.2 diagram, and fix the overflowing thermal-resources caption box in chapter 3.1.

**Architecture:** One new presentational component, `GeothermalHeatPumpScene`, renders an inline SVG cross-section (sky and neighbourhood above, earth strata and a U-tube borehole below). It is *controlled*: the parent `IndividualHomeHeating` owns season state and the auto-cycle timer. Three animations — marching chevrons, a left-to-right season wipe, and the auto-cycle — are each independently disabled under `prefers-reduced-motion`.

**Tech Stack:** React 18, TypeScript, Vite 6, Tailwind CSS v4, `motion/react` (Framer Motion), `lucide-react`.

Spec: `docs/superpowers/specs/2026-08-04-geothermal-heat-pump-scene-design.md`

## Global Constraints

- Work inside `learning-portal/`. `node_modules` is already installed; do **not** run `npm ci` (it is slow and unnecessary).
- Add no new dependencies. Everything needed is already in `package.json`.
- The project has **no test runner**, and adding one is explicitly out of scope. The test cycle for every task is: `npm run build` succeeds, then a Playwright screenshot confirms the visual claim. Screenshots are the evidence — make no completion claim without one.
- Match the conventions in `src/components/illustrations/`: inline SVG, `motion/react`, `useReducedMotion`, `role="img"` with `<title>`/`<desc>`.
- SVG element IDs (gradients, clipPaths) must come from React `useId()`, never hardcoded strings, so the component is safe to render more than once.
- Scene viewBox is exactly `0 0 460 470`. Ground line at `y=205`. Do not change these; every coordinate below depends on them.
- Copy strings are exact. Title: `Geothermal Heat Pump`. Temperature label: `50–59°F (10–15°C) year-round` (en-dash in `50–59`, degree signs literal). Loop label: `Ground loop`. Unit label: `Heat pump`.
- Never commit `learning-portal/build/`.

---

### Task 1: Fix the chapter 3.1 thermal resources box

Independent of everything else; do it first as a warm-up. The box is `width="142"` but `wastewater, ventilation, waste heat` at `fontSize="10"` needs roughly 165 px, so it spills past its own border.

**Files:**
- Modify: `learning-portal/src/components/illustrations/SiteSelectionDiagram.tsx:141-151`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing. No other task depends on this.

- [ ] **Step 1: Capture the "before" screenshot**

```bash
cd learning-portal && npm run dev
```

In a second shell, drive Playwright to `http://localhost:3000`, scroll to the `#site-selection` section, and screenshot the diagram. Confirm with your own eyes that the text crosses the box border. Keep the dev server running for later steps.

- [ ] **Step 2: Replace both caption boxes**

Replace lines 141-151 (the two `<g>` blocks holding the caption boxes) with:

```jsx
          <g>
            <rect x="14" y="206" width="160" height="58" rx="10" fill="#ffffff" stroke="#99f6e4" strokeWidth="1.5" />
            <text x="94" y="228" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f766e">Site conditions</text>
            <text x="94" y="246" textAnchor="middle" fontSize="10" fill="#475569">land, access, and geology</text>
          </g>

          <g>
            <rect x="388" y="206" width="160" height="58" rx="10" fill="#ffffff" stroke="#bfdbfe" strokeWidth="1.5" />
            <text x="468" y="226" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">Thermal resources</text>
            <text x="468" y="242" textAnchor="middle" fontSize="10" fill="#475569">
              <tspan x="468" dy="0">wastewater, ventilation,</tspan>
              <tspan x="468" dy="13">waste heat</tspan>
            </text>
          </g>
```

Why these numbers: both boxes go to `width="160"` so they stay symmetric. Left `x="14"` spans 14–174, right `x="388"` spans 388–548 — both inside the 560 px viewBox. Text re-centres on the new midpoints (94 and 468). Height 52→58 makes room for the wrapped second line. The longest remaining line, `wastewater, ventilation,` at 24 characters, needs about 116 px and fits with room to spare.

- [ ] **Step 3: Verify the build**

Run: `cd learning-portal && npm run build`
Expected: exits 0, no new warnings.

- [ ] **Step 4: Capture the "after" screenshot**

Screenshot the same `#site-selection` region. Verify, by looking at it:
- Both caption boxes are the same size.
- All text sits inside its border, including the wrapped second line.
- Neither box collides with the borefield pipes (x 224–334) or the `Shallow borefield / geothermal energy storage` caption at y=292.

- [ ] **Step 5: Commit**

```bash
git add learning-portal/src/components/illustrations/SiteSelectionDiagram.tsx
git commit -m "Fix overflowing thermal resources caption in 3.1 site diagram"
```

---

### Task 2: Build the static scene component

The whole illustration, correct for either season, with no animation yet. Chevrons render static. This is the bulk of the work and the largest single reviewable unit — the scene is one drawing and splitting it across tasks would leave a half-drawn picture nobody can judge.

**Files:**
- Create: `learning-portal/src/components/illustrations/GeothermalHeatPumpScene.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `export type GeothermalSeason = 'winter' | 'summer'`
  - `export function GeothermalHeatPumpScene(props: GeothermalHeatPumpSceneProps)` where
    ```ts
    interface GeothermalHeatPumpSceneProps {
      season: GeothermalSeason;
      onSeasonChange: (season: GeothermalSeason) => void;
      isAutoPlaying: boolean;
      onAutoPlayToggle: () => void;
    }
    ```
  Task 5 renders this component and supplies all four props.

- [ ] **Step 1: Create the file**

Create `learning-portal/src/components/illustrations/GeothermalHeatPumpScene.tsx` with exactly this content:

```tsx
import { useId } from 'react';
import { useReducedMotion } from 'motion/react';

export type GeothermalSeason = 'winter' | 'summer';

interface GeothermalHeatPumpSceneProps {
  season: GeothermalSeason;
  onSeasonChange: (season: GeothermalSeason) => void;
  isAutoPlaying: boolean;
  onAutoPlayToggle: () => void;
}

const GROUND_Y = 205;
const PIPE_TOP = 196;
const PIPE_BOTTOM = 420;
const U_BEND_Y = 440;
const BOREHOLE_CENTER_X = 230;
const LEFT_PIPE_X = 214;
const RIGHT_PIPE_X = 246;
const CHEVRON_SPACING = 26;

type ChevronDirection = 'up' | 'down';

interface SeasonConfig {
  badge: string;
  accent: string;
  skyTop: string;
  skyBottom: string;
  sunFill: string;
  sunRadius: number;
  groundFill: string;
  leftDirection: ChevronDirection;
  rightDirection: ChevronDirection;
  title: string;
  description: string;
  caption: string;
}

const SEASONS: Record<GeothermalSeason, SeasonConfig> = {
  winter: {
    badge: 'WINTER · HEATING',
    accent: '#0369a1',
    skyTop: '#cfe8f7',
    skyBottom: '#eaf4fb',
    sunFill: '#fde68a',
    sunRadius: 15,
    groundFill: '#f8fafc',
    leftDirection: 'down',
    rightDirection: 'up',
    title: 'Winter: the ground loop carries heat up into the home',
    description:
      'A cross-section of a snowy neighbourhood above layers of earth. A U-shaped ground loop runs from the centre house deep underground. Cool fluid travels down the blue pipe, picks up heat from the ground, and returns up the orange pipe into the home.',
    caption: 'In winter the ground is warmer than the air, so the loop collects heat and the heat pump delivers it indoors.',
  },
  summer: {
    badge: 'SUMMER · COOLING',
    accent: '#b45309',
    skyTop: '#8ecdf0',
    skyBottom: '#d6eefc',
    sunFill: '#facc15',
    sunRadius: 19,
    groundFill: '#65a30d',
    leftDirection: 'up',
    rightDirection: 'down',
    title: 'Summer: the ground loop carries heat down into the earth',
    description:
      'A cross-section of a green neighbourhood above layers of earth. A U-shaped ground loop runs from the centre house deep underground. Warm fluid travels down the orange pipe, releases heat into the ground, and returns up the blue pipe into the home.',
    caption: 'In summer the ground is cooler than the air, so the heat pump moves indoor heat out into the loop.',
  },
};

interface HouseSpec {
  x: number;
  width: number;
  height: number;
  body: string;
  roof: string;
}

const NEIGHBOUR_HOUSES: HouseSpec[] = [
  { x: 4, width: 62, height: 62, body: '#c9a27e', roof: '#8d5b3f' },
  { x: 76, width: 70, height: 74, body: '#f2d9a8', roof: '#c2703f' },
  { x: 300, width: 68, height: 70, body: '#f0c9a0', roof: '#a8563a' },
  { x: 382, width: 72, height: 64, body: '#dcc4a0', roof: '#8f5340' },
];

const FOCAL_HOUSE: HouseSpec = {
  x: 168,
  width: 124,
  height: 104,
  body: '#2f6d86',
  roof: '#1f4a5c',
};

/** Six strata, each painted over the one above so the wavy edge reads as a boundary. */
const STRATA: { top: number; fill: string }[] = [
  { top: 250, fill: '#3b3054' },
  { top: 295, fill: '#f59e0b' },
  { top: 345, fill: '#ea580c' },
  { top: 385, fill: '#b91c1c' },
  { top: 425, fill: '#86198f' },
];

function strataPath(top: number): string {
  return [
    `M0 ${top}`,
    `C 70 ${top - 7}, 140 ${top + 8}, 210 ${top - 3}`,
    `S 350 ${top + 9}, 460 ${top - 5}`,
    'L460 470 L0 470 Z',
  ].join(' ');
}

function House({ spec, isWinter }: { spec: HouseSpec; isWinter: boolean }) {
  const { x, width, height, body, roof } = spec;
  const top = GROUND_Y - height;
  const apexY = top - Math.round(width * 0.34);
  const windowSize = Math.round(width * 0.2);

  return (
    <g>
      <rect x={x} y={top} width={width} height={height} rx="3" fill={body} />
      <path
        d={`M${x - 6} ${top} L${x + width / 2} ${apexY} L${x + width + 6} ${top} Z`}
        fill={roof}
      />
      {isWinter && (
        <path
          d={`M${x - 6} ${top} L${x + width / 2} ${apexY} L${x + width + 6} ${top}`}
          fill="none"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}
      <rect
        x={x + Math.round(width * 0.16)}
        y={top + 14}
        width={windowSize}
        height={windowSize}
        rx="2"
        fill="#fef3c7"
      />
      <rect
        x={x + Math.round(width * 0.64)}
        y={top + 14}
        width={windowSize}
        height={windowSize}
        rx="2"
        fill="#fef3c7"
      />
    </g>
  );
}

function FocalHouse({ isWinter }: { isWinter: boolean }) {
  const { x, width, height, body, roof } = FOCAL_HOUSE;
  const top = GROUND_Y - height;
  const apexY = top - 42;

  return (
    <g>
      <rect x={x} y={top} width={width} height={height} rx="4" fill={body} />
      <path d={`M${x - 9} ${top} L${x + width / 2} ${apexY} L${x + width + 9} ${top} Z`} fill={roof} />
      {isWinter && (
        <path
          d={`M${x - 9} ${top} L${x + width / 2} ${apexY} L${x + width + 9} ${top}`}
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}
      <rect x={x + 16} y={top + 14} width={22} height={24} rx="2" fill="#fef3c7" />
      <rect x={x + 51} y={top + 14} width={22} height={24} rx="2" fill="#fef3c7" />
      <rect x={x + 86} y={top + 14} width={22} height={24} rx="2" fill="#fef3c7" />
      <rect x={x + 16} y={top + 52} width={22} height={24} rx="2" fill="#fef3c7" />
      <rect x={x + 86} y={top + 52} width={22} height={24} rx="2" fill="#bae6fd" />
      <rect x={x + 51} y={GROUND_Y - 34} width={22} height={34} rx="2" fill="#a3653c" />
      {!isWinter && <rect x={x + 8} y={GROUND_Y - 12} width={40} height={12} rx="4" fill="#3f8f4a" />}
    </g>
  );
}

function Tree({ x, isWinter, scale = 1 }: { x: number; isWinter: boolean; scale?: number }) {
  return (
    <g>
      <rect x={x - 2.5} y={GROUND_Y - 30 * scale} width="5" height={30 * scale} fill="#7c5230" />
      {isWinter ? (
        <path
          d={[
            `M${x} ${GROUND_Y - 26 * scale} L${x - 10 * scale} ${GROUND_Y - 40 * scale}`,
            `M${x} ${GROUND_Y - 30 * scale} L${x + 11 * scale} ${GROUND_Y - 44 * scale}`,
            `M${x} ${GROUND_Y - 19 * scale} L${x - 9 * scale} ${GROUND_Y - 29 * scale}`,
          ].join(' ')}
          fill="none"
          stroke="#7c5230"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ) : (
        <g fill="#3f8f4a">
          <circle cx={x} cy={GROUND_Y - 44 * scale} r={14 * scale} />
          <circle cx={x - 11 * scale} cy={GROUND_Y - 33 * scale} r={10 * scale} />
          <circle cx={x + 11 * scale} cy={GROUND_Y - 33 * scale} r={10 * scale} />
        </g>
      )}
    </g>
  );
}

/**
 * Everything above the ground line. This is the only part that changes with the
 * season, and the only part the wipe transition clips.
 */
function SurfaceLayer({ season, skyGradientId }: { season: GeothermalSeason; skyGradientId: string }) {
  const config = SEASONS[season];
  const isWinter = season === 'winter';

  return (
    <g>
      <rect x="0" y="0" width="460" height={GROUND_Y} fill={`url(#${skyGradientId})`} />

      <circle cx="402" cy="84" r={config.sunRadius} fill={config.sunFill} />
      {!isWinter && (
        <g stroke={config.sunFill} strokeWidth="3" strokeLinecap="round">
          <path d="M402 54 V44 M402 114 V124 M372 84 H362 M432 84 H442" />
        </g>
      )}

      <g fill="#ffffff" opacity="0.9">
        <ellipse cx="228" cy="74" rx="30" ry="13" />
        <ellipse cx="250" cy="66" rx="21" ry="15" />
        <ellipse cx="96" cy="98" rx="26" ry="11" />
        <ellipse cx="114" cy="92" rx="18" ry="12" />
      </g>

      <path
        d={[
          `M0 ${GROUND_Y - 10}`,
          `C 70 ${GROUND_Y - 15}, 150 ${GROUND_Y - 5}, 230 ${GROUND_Y - 11}`,
          `S 380 ${GROUND_Y - 16}, 460 ${GROUND_Y - 8}`,
          `L460 ${GROUND_Y} L0 ${GROUND_Y} Z`,
        ].join(' ')}
        fill={config.groundFill}
      />

      {NEIGHBOUR_HOUSES.map((spec) => (
        <House key={spec.x} spec={spec} isWinter={isWinter} />
      ))}
      <FocalHouse isWinter={isWinter} />
      <Tree x={157} isWinter={isWinter} scale={0.85} />
      <Tree x={375} isWinter={isWinter} scale={0.7} />
    </g>
  );
}

function chevronOffsets(): number[] {
  const offsets: number[] = [];
  for (let y = PIPE_TOP - CHEVRON_SPACING; y <= PIPE_BOTTOM + CHEVRON_SPACING; y += CHEVRON_SPACING) {
    offsets.push(y);
  }
  return offsets;
}

function ChevronColumn({
  centerX,
  direction,
  clipId,
}: {
  centerX: number;
  direction: ChevronDirection;
  clipId: string;
}) {
  const d =
    direction === 'down'
      ? `M${centerX - 5} -4 L${centerX} 2 L${centerX + 5} -4`
      : `M${centerX - 5} 2 L${centerX} -4 L${centerX + 5} 2`;

  return (
    <g clipPath={`url(#${clipId})`}>
      <g>
        {chevronOffsets().map((y) => (
          <path
            key={y}
            transform={`translate(0 ${y})`}
            d={d}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.9"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </g>
    </g>
  );
}

export function GeothermalHeatPumpScene({
  season,
  onSeasonChange,
  isAutoPlaying,
  onAutoPlayToggle,
}: GeothermalHeatPumpSceneProps) {
  const reactId = useId().replace(/:/g, '');
  const skyGradientId = `ghp-sky-${reactId}`;
  const leftClipId = `ghp-left-${reactId}`;
  const rightClipId = `ghp-right-${reactId}`;
  const titleId = `ghp-title-${reactId}`;
  const descId = `ghp-desc-${reactId}`;

  const shouldReduceMotion = useReducedMotion();
  const canAnimate = shouldReduceMotion === false;
  const config = SEASONS[season];

  return (
    <figure className="mx-auto w-full max-w-[640px]">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <svg
          viewBox="0 0 460 470"
          className="h-auto w-full"
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
        >
          <title id={titleId}>{config.title}</title>
          <desc id={descId}>{config.description}</desc>

          <defs>
            <linearGradient id={skyGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={config.skyTop} />
              <stop offset="100%" stopColor={config.skyBottom} />
            </linearGradient>
            <clipPath id={leftClipId}>
              <rect x={LEFT_PIPE_X - 7} y={PIPE_TOP} width="14" height={PIPE_BOTTOM - PIPE_TOP} />
            </clipPath>
            <clipPath id={rightClipId}>
              <rect x={RIGHT_PIPE_X - 7} y={PIPE_TOP} width="14" height={PIPE_BOTTOM - PIPE_TOP} />
            </clipPath>
          </defs>

          <SurfaceLayer season={season} skyGradientId={skyGradientId} />

          {/* Strata never change with the season: the ground is the stable part. */}
          <rect x="0" y={GROUND_Y} width="460" height={470 - GROUND_Y} fill="#334155" />
          {STRATA.map((band) => (
            <path key={band.top} d={strataPath(band.top)} fill={band.fill} />
          ))}

          <path
            d={`M${LEFT_PIPE_X} ${PIPE_TOP} V${PIPE_BOTTOM} Q${LEFT_PIPE_X} ${U_BEND_Y} ${BOREHOLE_CENTER_X} ${U_BEND_Y}`}
            fill="none"
            stroke="#0c4a6e"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d={`M${RIGHT_PIPE_X} ${PIPE_TOP} V${PIPE_BOTTOM} Q${RIGHT_PIPE_X} ${U_BEND_Y} ${BOREHOLE_CENTER_X} ${U_BEND_Y}`}
            fill="none"
            stroke="#7c2d12"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d={`M${LEFT_PIPE_X} ${PIPE_TOP} V${PIPE_BOTTOM} Q${LEFT_PIPE_X} ${U_BEND_Y} ${BOREHOLE_CENTER_X} ${U_BEND_Y}`}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d={`M${RIGHT_PIPE_X} ${PIPE_TOP} V${PIPE_BOTTOM} Q${RIGHT_PIPE_X} ${U_BEND_Y} ${BOREHOLE_CENTER_X} ${U_BEND_Y}`}
            fill="none"
            stroke="#f97316"
            strokeWidth="12"
            strokeLinecap="round"
          />

          <ChevronColumn centerX={LEFT_PIPE_X} direction={config.leftDirection} clipId={leftClipId} />
          <ChevronColumn centerX={RIGHT_PIPE_X} direction={config.rightDirection} clipId={rightClipId} />

          {/* Labels */}
          <path d={`M264 232 H254`} stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          <text x="268" y="236" fontSize="11" fontWeight="700" fill="#ffffff">
            Ground loop
          </text>
          <text x="26" y="278" fontSize="11" fontWeight="600" fill="#ffffff">
            50–59°F (10–15°C) year-round
          </text>

          <rect x="14" y="14" width="192" height="34" rx="10" fill="#ffffff" opacity="0.95" />
          <text x="26" y="36" fontSize="15" fontWeight="700" fill="#0f172a">
            Geothermal Heat Pump
          </text>

          <rect
            x="272"
            y="14"
            width="174"
            height="30"
            rx="15"
            fill="#ffffff"
            opacity="0.95"
            stroke={config.accent}
            strokeWidth="1.5"
          />
          <circle cx="291" cy="29" r="6" fill={config.accent} />
          <text x="304" y="33" fontSize="11" fontWeight="700" fill={config.accent}>
            {config.badge}
          </text>

          <rect x="182" y="166" width="76" height="20" rx="6" fill="#ffffff" opacity="0.92" />
          <text x="220" y="180" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">
            Heat pump
          </text>
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {canAnimate && (
          <button
            type="button"
            onClick={onAutoPlayToggle}
            className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            {isAutoPlaying ? 'Pause' : 'Play'}
          </button>
        )}
        <button
          type="button"
          onClick={() => onSeasonChange('winter')}
          aria-pressed={season === 'winter'}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            season === 'winter'
              ? 'bg-sky-600 text-white shadow-md'
              : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-sky-50'
          }`}
        >
          Winter heating
        </button>
        <button
          type="button"
          onClick={() => onSeasonChange('summer')}
          aria-pressed={season === 'summer'}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            season === 'summer'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-amber-50'
          }`}
        >
          Summer cooling
        </button>
      </div>

      <figcaption className="mt-3 text-center text-sm leading-relaxed text-slate-600">
        {config.caption}
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 2: Verify the build**

Run: `cd learning-portal && npm run build`
Expected: exits 0. The component is not yet imported anywhere, so this only proves it compiles.

- [ ] **Step 3: Commit**

```bash
git add learning-portal/src/components/illustrations/GeothermalHeatPumpScene.tsx
git commit -m "Add static geothermal heat pump scene illustration"
```

---

### Task 3: Make the chevrons march

**Files:**
- Modify: `learning-portal/src/components/illustrations/GeothermalHeatPumpScene.tsx`

**Interfaces:**
- Consumes: `ChevronColumn`, `CHEVRON_SPACING`, `chevronOffsets`, `ChevronDirection` from Task 2.
- Produces: `ChevronColumn` gains a required `animate: boolean` prop. No other task touches it.

- [ ] **Step 1: Add `motion` to the import**

Change the `motion/react` import line to:

```tsx
import { motion, useReducedMotion } from 'motion/react';
```

- [ ] **Step 2: Replace `ChevronColumn` with the animated version**

The chevrons sit at a fixed 26 px spacing, so translating the group by exactly one spacing unit and repeating loops seamlessly — the pattern lands back on itself.

```tsx
function ChevronColumn({
  centerX,
  direction,
  clipId,
  animate,
}: {
  centerX: number;
  direction: ChevronDirection;
  clipId: string;
  animate: boolean;
}) {
  const d =
    direction === 'down'
      ? `M${centerX - 5} -4 L${centerX} 2 L${centerX + 5} -4`
      : `M${centerX - 5} 2 L${centerX} -4 L${centerX + 5} 2`;
  const shift = direction === 'down' ? CHEVRON_SPACING : -CHEVRON_SPACING;

  const chevrons = chevronOffsets().map((y) => (
    <path
      key={y}
      transform={`translate(0 ${y})`}
      d={d}
      fill="none"
      stroke="#ffffff"
      strokeOpacity="0.9"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ));

  return (
    <g clipPath={`url(#${clipId})`}>
      {animate ? (
        <motion.g
          animate={{ y: [0, shift] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        >
          {chevrons}
        </motion.g>
      ) : (
        <g>{chevrons}</g>
      )}
    </g>
  );
}
```

- [ ] **Step 3: Pass the new prop at both call sites**

```tsx
          <ChevronColumn
            centerX={LEFT_PIPE_X}
            direction={config.leftDirection}
            clipId={leftClipId}
            animate={canAnimate}
          />
          <ChevronColumn
            centerX={RIGHT_PIPE_X}
            direction={config.rightDirection}
            clipId={rightClipId}
            animate={canAnimate}
          />
```

- [ ] **Step 4: Verify the build**

Run: `cd learning-portal && npm run build`
Expected: exits 0, no TypeScript errors about the missing `animate` prop.

- [ ] **Step 5: Commit**

```bash
git add learning-portal/src/components/illustrations/GeothermalHeatPumpScene.tsx
git commit -m "Animate marching chevrons in the ground loop pipes"
```

Visual verification happens in Task 5, once the component is actually on the page.

---

### Task 4: Add the season wipe

**Files:**
- Modify: `learning-portal/src/components/illustrations/GeothermalHeatPumpScene.tsx`

**Interfaces:**
- Consumes: `SurfaceLayer`, `GROUND_Y` from Task 2.
- Produces: no public API change. Props stay exactly as declared in Task 2.

- [ ] **Step 1: Extend the React import**

```tsx
import { useEffect, useId, useRef, useState } from 'react';
```

- [ ] **Step 2: Track the outgoing season inside the component**

Insert immediately after the `const config = SEASONS[season];` line in `GeothermalHeatPumpScene`:

```tsx
  const wipeClipId = `ghp-wipe-${reactId}`;
  const [outgoingSeason, setOutgoingSeason] = useState<GeothermalSeason | null>(null);
  const previousSeasonRef = useRef(season);

  useEffect(() => {
    if (previousSeasonRef.current === season) {
      return;
    }
    if (canAnimate) {
      setOutgoingSeason(previousSeasonRef.current);
    }
    previousSeasonRef.current = season;
  }, [season, canAnimate]);
```

Under reduced motion `outgoingSeason` stays `null`, so the swap is instant — no wipe, no second layer.

- [ ] **Step 3: Add the wipe clipPath to `<defs>`**

Append inside `<defs>`, after the two pipe clipPaths:

```tsx
            <clipPath id={wipeClipId}>
              <motion.rect
                key={season}
                x="0"
                y="0"
                height={GROUND_Y}
                initial={{ width: 0 }}
                animate={{ width: 460 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                onAnimationComplete={() => setOutgoingSeason(null)}
              />
            </clipPath>
```

`key={season}` restarts the animation on every season change. The rect only needs to cover `y` 0–205 because that is the full height of the surface layer.

- [ ] **Step 4: Render two surface layers during the wipe**

Replace the single `<SurfaceLayer ... />` call with:

```tsx
          {outgoingSeason && <SurfaceLayer season={outgoingSeason} skyGradientId={skyGradientId} />}
          <g clipPath={outgoingSeason ? `url(#${wipeClipId})` : undefined}>
            <SurfaceLayer season={season} skyGradientId={skyGradientId} />
          </g>
```

One problem to be aware of: `skyGradientId` points at a gradient whose stops are built from the *current* season, so during the wipe the outgoing layer's sky briefly uses the incoming colours. The sky gradients are close enough in tone that this is invisible at the wipe's 700 ms, and fixing it properly would mean two gradients. Leave it; if a screenshot shows a visible seam, add a second gradient keyed to `outgoingSeason`.

- [ ] **Step 5: Verify the build**

Run: `cd learning-portal && npm run build`
Expected: exits 0.

- [ ] **Step 6: Commit**

```bash
git add learning-portal/src/components/illustrations/GeothermalHeatPumpScene.tsx
git commit -m "Add left-to-right season wipe to heat pump scene"
```

---

### Task 5: Wire the scene into chapter 1.2

Everything becomes visible and verifiable here.

**Files:**
- Modify: `learning-portal/src/components/IndividualHomeHeating.tsx`

**Interfaces:**
- Consumes: `GeothermalHeatPumpScene`, `GeothermalSeason` from Task 2.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Update the imports**

Replace lines 1-4 with:

```tsx
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Home, Wind, Droplets, Waves, ArrowDownUp, ThermometerSun } from 'lucide-react';
import { HeatPumpDiagram } from './illustrations/HeatPumpDiagram';
import { GeothermalHeatPumpScene, type GeothermalSeason } from './illustrations/GeothermalHeatPumpScene';
```

- [ ] **Step 2: Add the season state and auto-cycle timer**

Insert after the existing `const [heatPumpMode, setHeatPumpMode] = useState<'heating' | 'cooling'>('heating');`:

```tsx
  const sceneRef = useRef<HTMLDivElement>(null);
  const sceneInView = useInView(sceneRef, { amount: 0.3 });
  const sceneReduceMotion = useReducedMotion();
  const [sceneSeason, setSceneSeason] = useState<GeothermalSeason>('winter');
  const [sceneAutoPlaying, setSceneAutoPlaying] = useState(true);

  useEffect(() => {
    if (!sceneAutoPlaying || !sceneInView || sceneReduceMotion !== false) {
      return;
    }
    // 4s hold + 0.7s wipe.
    const timer = window.setInterval(() => {
      setSceneSeason((current) => (current === 'winter' ? 'summer' : 'winter'));
    }, 4700);
    return () => window.clearInterval(timer);
  }, [sceneAutoPlaying, sceneInView, sceneReduceMotion]);

  const handleSceneSeasonChange = (next: GeothermalSeason) => {
    // A reader taking control stops the cycle; the animation must not fight them.
    setSceneAutoPlaying(false);
    setSceneSeason(next);
  };
```

- [ ] **Step 3: Render the scene above the existing diagram card**

Find the `motion.div` that currently opens at line 139 and wraps the "Follow the heat, season by season" card. Insert this block immediately **before** that `motion.div`:

```tsx
        <motion.div
          ref={sceneRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="mb-2 text-center text-2xl font-bold text-slate-800">
            A geothermal heat pump through the year
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-center text-slate-600">
            The same loop of pipe serves the house all year. Only the direction the heat travels changes.
          </p>
          <GeothermalHeatPumpScene
            season={sceneSeason}
            onSeasonChange={handleSceneSeasonChange}
            isAutoPlaying={sceneAutoPlaying}
            onAutoPlayToggle={() => setSceneAutoPlaying((playing) => !playing)}
          />
        </motion.div>
```

- [ ] **Step 4: Reword the attribution so it covers both diagrams**

At what is currently line 184, change:

```
              This original diagram follows the same seasonal principle illustrated by the{' '}
```

to:

```
              These original diagrams follow the same seasonal principle illustrated by the{' '}
```

- [ ] **Step 5: Verify the build**

Run: `cd learning-portal && npm run build`
Expected: exits 0, no TypeScript errors.

- [ ] **Step 6: Screenshot both seasons**

With the dev server on `http://localhost:3000`, navigate to the `#individual-heating` section and screenshot. Then click **Pause**, click **Winter heating**, screenshot; click **Summer cooling**, screenshot.

Verify against the source behaviour, by looking at the images:
- Winter: snow ground, snow-capped roofs, bare branch trees, pale small sun. Blue (left) chevrons point **down**, orange (right) chevrons point **up**.
- Summer: green ground, leafy trees, larger bright sun with rays. Blue chevrons point **up**, orange chevrons point **down**.
- The strata are identical in both seasons.
- All five labels are legible and inside the frame: `Geothermal Heat Pump`, the season badge, `Heat pump`, `Ground loop`, `50–59°F (10–15°C) year-round`.
- The scene is visibly narrower than the "Follow the heat, season by season" card below it.
- No text overlaps a cloud, the sun, or the badge.

- [ ] **Step 7: Verify the wipe and the auto-cycle**

Reload, leave the section on screen, and take two screenshots roughly 350 ms apart during a transition. Confirm the surface changes left-to-right — a partial frame should show one season on the left and the other on the right, with the strata and pipes unchanged. Then confirm that pressing **Pause** stops the cycling and that clicking a season button also stops it and flips the button to **Play**.

- [ ] **Step 8: Commit**

```bash
git add learning-portal/src/components/IndividualHomeHeating.tsx
git commit -m "Add geothermal heat pump scene above the 1.2 heat flow diagram"
```

---

### Task 6: Verify reduced motion and responsive layout

No new features — this task exists because the reduced-motion path has never actually been executed, and a claim that it works is worthless without running it.

**Files:**
- Modify (only if a defect is found): `learning-portal/src/components/illustrations/GeothermalHeatPumpScene.tsx`, `learning-portal/src/components/IndividualHomeHeating.tsx`

**Interfaces:**
- Consumes: everything from Tasks 2-5.
- Produces: nothing.

- [ ] **Step 1: Screenshot with reduced motion emulated**

Emulate `prefers-reduced-motion: reduce` and reload the page. Verify:
- The scene is completely static — no marching chevrons, no auto-cycling.
- Chevrons still point the correct way for the displayed season.
- The **Pause/Play** button is absent (there is no animation for it to control, so showing a dead control would be worse than hiding it).
- Both season buttons still work and swap the scene instantly, with no wipe.

Note: this hides Pause/Play under reduced motion, where the spec said "both sets of buttons still work". A Play button that visibly does nothing is a worse outcome than no button, so the plan deliberately departs from that one line. Flag it in the final report.

- [ ] **Step 2: Screenshot at mobile width**

Resize to 390×844 and screenshot the section. Verify the SVG scales down without clipping, the control buttons wrap rather than overflow, and every label is still readable.

- [ ] **Step 3: Confirm chapter 3.1 is still correct**

Screenshot `#site-selection` once more to confirm Task 1's fix survived the later commits.

- [ ] **Step 4: Fix anything the screenshots exposed, then re-verify**

If a screenshot contradicts any claim above, fix it and repeat the affected step. Do not proceed on "it probably works".

- [ ] **Step 5: Final build and commit**

```bash
cd learning-portal && npm run build
```

Commit only if Step 4 changed a file:

```bash
git add learning-portal/src/
git commit -m "Fix reduced-motion and responsive issues in heat pump scene"
```

---

## Done when

- `npm run build` exits 0.
- Screenshots exist for: winter, summer, a mid-wipe frame, reduced motion, mobile width, and chapter 3.1 after the fix.
- Every claim in Task 5 Step 6 and Task 6 Step 1 has been confirmed against an actual image, not assumed.
