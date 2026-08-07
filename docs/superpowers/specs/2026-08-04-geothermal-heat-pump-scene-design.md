# Design: Geothermal Heat Pump Scene (Chapter 1.2) + Chapter 3.1 Box Fix

Date: 2026-08-04
Status: Approved

## Context

Mentor feedback on chapter 1.2 ("Individual Home Heating (or Cooling)"): add the
animation from the U.S. Department of Energy's
[geothermal heat pumps page](https://www.energy.gov/hgeo/geothermal/geothermal-heat-pumps)
*above* the animation already there, at a slightly smaller size. The animation is
to be **recreated**, not copied, and must show both the summer and the winter
heating/cooling behaviour.

A second, unrelated piece of feedback covers chapter 3.1: the "Thermal resources"
box in `SiteSelectionDiagram` has text that overflows its border.

### The DOE source

The DOE asset is `Geothermal heat pump GHP in Winter Summer.gif` — 460×460, 150
frames at 50 ms (7.5 s loop), 4.1 MB. Frame analysis shows:

- Sky with clouds and a sun; a row of neighbourhood houses with one larger focal
  house; a deep cross-section of coloured earth strata below.
- A vertical U-tube borehole runs from the focal house through every stratum,
  with a U-bend at the bottom. One pipe is blue, the other red-orange.
- Small triangular chevrons inside each pipe march continuously (confirmed: the
  full borehole region changes on every frame).
- **Winter:** snow on ground and roofs, bare trees, pale sun. Blue pipe chevrons
  point down, red pipe chevrons point up — heat travels up into the home.
- **Summer:** green grass, leafy trees, bright sun. Chevrons reverse — heat
  travels down into the earth.
- Pipe colours never change between seasons; only chevron direction does.
- Seasons swap with a left-to-right wipe.
- The only text is a "Geothermal Heat Pump" title card. No alt text, captions or
  step labels exist on the DOE page.

### Decisions taken with the user

1. **Season control:** auto-cycles winter → wipe → summer → wipe on its own, with
   its own Winter/Summer buttons that take over when clicked. Not wired to the
   existing 1.2 toggle.
2. **Footprint:** keeps the tall square-ish framing (needed for deep strata),
   capped at ~640 px and centred, so it reads as smaller than the existing
   full-width card below it.
3. **Labels:** a few key labels only — title, season badge, `Ground loop`,
   `Heat pump`, and the stable-ground temperature note.

### Rejected approaches

- **Embed the DOE GIF.** The request was an explicit recreation. Also 4.1 MB and
  carries no accessible text.
- **Inline SVG with CSS keyframes instead of `motion`.** Lighter at runtime, but
  it would be the only illustration in the folder not using `motion/react`, and
  reversing or pausing on a button click becomes class-swapping instead of state.

## Architecture

One new presentational component plus two edits.

| File | Change |
| --- | --- |
| `learning-portal/src/components/illustrations/GeothermalHeatPumpScene.tsx` | New |
| `learning-portal/src/components/IndividualHomeHeating.tsx` | Render the scene above the existing card; own the auto-cycle timer |
| `learning-portal/src/components/illustrations/SiteSelectionDiagram.tsx` | Fix the overflowing thermal-resources box |

This follows the convention already set by the eight components in
`src/components/illustrations/`: a self-contained inline SVG, `motion/react` for
animation, `useReducedMotion` guarding every moving part.

### Component boundary

`GeothermalHeatPumpScene` is a **controlled** component:

```ts
interface GeothermalHeatPumpSceneProps {
  season: 'winter' | 'summer';
  onSeasonChange: (season: 'winter' | 'summer') => void;
  isAutoPlaying: boolean;
  onAutoPlayToggle: () => void;
}
```

The parent owns season state and the cycle timer; the component is a pure render
of "what does this season look like", plus the control buttons that call back up.

Rationale: the timer is the only stateful, hard-to-reason-about part. Keeping it
in the parent means the SVG can be rendered at any fixed season, which is how it
gets verified. It also leaves the door open to driving the scene from elsewhere
without touching the illustration.

## Scene composition

`viewBox="0 0 460 470"`, wrapped in `max-w-[640px] mx-auto`, `className="h-auto w-full"`.

Vertical bands:

| Region | y range | Notes |
| --- | --- | --- |
| Sky | 0–205 | Gradient, clouds, sun |
| Ground line | 205 | The season boundary |
| Strata | 205–470 | Six bands, wavy boundaries |

Houses stand with their base on y=205. Five houses; the focal house is centred at
x=230 and is taller than its neighbours.

### Strata

Six bands with irregular wavy top edges, cool at the surface warming with depth:

| Band | y | Fill |
| --- | --- | --- |
| 1 | 205–250 | `#334155` slate |
| 2 | 250–295 | `#3b3054` deep purple |
| 3 | 295–345 | `#f59e0b` amber |
| 4 | 345–385 | `#ea580c` orange |
| 5 | 385–425 | `#b91c1c` red |
| 6 | 425–470 | `#86198f` magenta |

**The strata never change with the season.** That is the teaching point of the
illustration and the reason the temperature label sits inside them.

### Borehole

Descends from the focal house: left pipe centred at x=214, right at x=246, each
12 px wide, running y=200 → y=440 with a U-bend of radius ~16 joining them at the
bottom. Left pipe `#38bdf8` (blue), right pipe `#f97316` (orange-red), in both
seasons.

### Season-dependent values

Derived once into a single object rather than scattered ternaries through the JSX:

| | Winter | Summer |
| --- | --- | --- |
| Left (blue) chevrons | down | up |
| Right (red) chevrons | up | down |
| Surface | snow drifts, snow-capped roofs, bare branches | green lawn, leafy trees, hedge |
| Sky gradient | `#cfe8f7` → `#eaf4fb` | `#8ecdf0` → `#d6eefc` |
| Sun | small, pale `#fde68a` | larger, bright `#facc15` |
| Badge | `❄ Winter — heating` | `☀ Summer — cooling` |

### Labels

Five, per the approved decision:

- `Geothermal Heat Pump` — title, top-left, on a white rounded card.
- Season badge — top-right.
- `Heat pump` — on the focal house.
- `Ground loop` — beside the borehole with a short leader line.
- `50–59°F (10–15°C) year-round` — inside the strata.

## Animation

Three independent moving parts, each individually disabled under reduced motion.

**Marching chevrons.** Per pipe: chevrons at 26 px spacing spanning the pipe
length plus one extra, wrapped in a `clipPath` limited to the pipe interior so
nothing spills out of the pipe ends. A `motion.g` translates the group by exactly
one spacing unit (`+26` for downward, `-26` for upward) over ~1.1 s with
`repeat: Infinity, ease: 'linear'`, which loops seamlessly because the pattern is
periodic. Chevron glyph orientation flips with direction.

**Season wipe.** A `clipPath` containing a `motion.rect` whose width animates
0 → 460 over ~700 ms, left to right. Two above-ground surface layers are
rendered: the outgoing season unclipped underneath, the incoming season clipped
by the animating rect on top. On animation complete, the outgoing layer is
dropped. Only the above-ground group participates — strata and pipes stay put and
simply reverse their chevrons.

**Auto-cycle.** In the parent: hold 4 s, wipe 0.7 s, so a ~9.4 s period. Paused
when the section is off-screen via `useInView` from `motion/react`, so it does
not animate where nobody is looking.

Clicking a season button stops auto-cycling — the animation must not fight the
reader. Play resumes it. Specifically:

- Clicking the season that is **not** current sets it and stops auto-cycling; the
  wipe still plays (unless reduced motion, where the swap is instant).
- Clicking the season that **is** current still stops auto-cycling, and plays no
  wipe.
- Stopping this way flips the Pause/Play button to "Play"; pressing it resumes
  cycling from the current season.

## Accessibility

- `role="img"` with `<title>` and `<desc>` that update per season, matching the
  pattern in `HeatPumpDiagram` and `SiteSelectionDiagram`.
- The `<desc>` states which direction heat travels in the current season, so the
  meaning does not depend on seeing the chevrons.
- Season buttons carry `aria-pressed`, matching the existing 1.2 toggle.
- Pause/Play is a real `<button>` with an accessible label that reflects state.
- Decorative scenery (clouds, trees, neighbour houses) is not individually
  labelled.
- **Reduced motion** (`useReducedMotion`): no auto-cycle, no wipe (instant swap),
  no marching. Chevrons render static in the correct direction for the season,
  and both sets of buttons still work.

## Placement in chapter 1.2

Inside the existing `motion.div` that currently wraps the heat-pump diagram card,
above it. Resulting reading order:

1. Section heading and key questions
2. "What is an HVAC System?" card
3. **New geothermal heat pump scene** ← added
4. Existing "Follow the heat, season by season" card with `HeatPumpDiagram`
5. DOE attribution line
6. "Types of Heat Pumps" branch widget

The attribution line at `IndividualHomeHeating.tsx:183-194` currently reads "This
original diagram follows the same seasonal principle illustrated by…". It is
reworded to the plural so it covers both diagrams. The DOE link itself is
unchanged.

## Chapter 3.1 fix

In `SiteSelectionDiagram.tsx`, the two bottom caption boxes are each
`width="142"`. The right box's detail text, `wastewater, ventilation, waste heat`
at `fontSize="10"`, needs roughly 165 px and so overflows its border. (The left
box's `land, access, and geology` needs about 118 px and fits.)

Fix, keeping the full wording and no font smaller than 10 px:

- Widen **both** boxes to `width="160"` so they stay symmetric, repositioning
  them to stay inside the 560 px viewBox: left `x="14"` (14–174), right `x="388"`
  (388–548).
- Raise both boxes' height from 52 to 58 and wrap the right box's detail across
  two `<tspan>` lines: `wastewater, ventilation,` / `waste heat`.
- Re-centre both boxes' text on their new centres (left x=94, right x=468).

Neither box overlaps the borefield pipes (x=224–334) or the buildings above
(y=90–146); the boxes sit at y=206–264. The "Shallow borefield / geothermal
energy storage" caption at y=292 is unaffected.

## Verification

`learning-portal` has no test runner (only the unrelated
`Lovable_Earth_Warm_Explorer` has a `vitest.config.ts`), and these changes are
purely visual. Verification is therefore:

1. `npm run build` in `learning-portal` succeeds with no new warnings.
2. Dev server screenshots of chapter 1.2 in winter and in summer, confirming:
   chevron directions match the table above; the wipe runs left to right; the
   scene is visibly narrower than the card below it; all five labels are legible
   and inside their bounds.
3. A screenshot with `prefers-reduced-motion: reduce` emulated, confirming the
   scene is static, correct for its season, and still switchable.
4. A screenshot of chapter 3.1 confirming both caption boxes contain their text
   with no overflow and remain symmetric.

Screenshots are the evidence; no claim of completion is made without them.

## Out of scope

- Changing the existing `HeatPumpDiagram` beyond the attribution rewording.
- The three loop types (horizontal, vertical, pond) from the DOE page's other
  illustration — this scene shows a vertical borehole only, which is what the
  animation shows. The existing "Types of Heat Pumps" widget already covers
  ground, air and water sources.
- Adding a test runner to `learning-portal`.
