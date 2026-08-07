import { useEffect, useId, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

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
    skyTop: '#bcdcf3',
    skyBottom: '#d3e7f7',
    sunFill: '#fde68a',
    sunRadius: 15,
    groundFill: '#fbfdff',
    leftDirection: 'down',
    rightDirection: 'up',
    title: 'Winter: the ground loop carries heat up into the home',
    description:
      'A cross-section of a snowy neighborhood above layers of earth. A U-shaped ground loop runs from the center house deep underground. Cool fluid travels down the blue pipe, picks up heat from the ground, and returns up the orange pipe into the home.',
    caption:
      'In winter the ground is warmer than the air, so the loop collects heat and the heat pump delivers it indoors.',
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
      'A cross-section of a green neighborhood above layers of earth. A U-shaped ground loop runs from the center house deep underground. Warm fluid travels down the orange pipe, releases heat into the ground, and returns up the blue pipe into the home.',
    caption:
      'In summer the ground is cooler than the air, so the heat pump moves indoor heat out into the loop.',
  },
};

interface HouseSpec {
  x: number;
  width: number;
  height: number;
  body: string;
  roof: string;
}

const NEIGHBOR_HOUSES: HouseSpec[] = [
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

/** Each band paints over the one above it, so the wavy top edge reads as a boundary. */
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
      <path d={`M${x - 6} ${top} L${x + width / 2} ${apexY} L${x + width + 6} ${top} Z`} fill={roof} />
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
      {/* Door sits right of the borehole so the pipes do not appear to run through it. */}
      <rect x={x + 92} y={GROUND_Y - 34} width={22} height={34} rx="2" fill="#a3653c" />
      {!isWinter && <rect x={x + 2} y={GROUND_Y - 12} width={32} height={12} rx="4" fill="#3f8f4a" />}
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
function SurfaceLayer({
  season,
  skyGradientId,
}: {
  season: GeothermalSeason;
  skyGradientId: string;
}) {
  const config = SEASONS[season];
  const isWinter = season === 'winter';

  return (
    <g>
      <rect x="0" y="0" width="460" height={GROUND_Y} fill={`url(#${skyGradientId})`} />

      <circle cx="402" cy="84" r={config.sunRadius} fill={config.sunFill} />
      {!isWinter && (
        <path
          d="M402 54 V44 M402 114 V124 M372 84 H362 M432 84 H442"
          stroke={config.sunFill}
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}

      <g fill="#ffffff" opacity="0.9">
        <ellipse cx="228" cy="74" rx="30" ry="13" />
        <ellipse cx="250" cy="66" rx="21" ry="15" />
        <ellipse cx="96" cy="98" rx="26" ry="11" />
        <ellipse cx="114" cy="92" rx="18" ry="12" />
      </g>

      <path
        d={[
          `M0 ${GROUND_Y - 17}`,
          `C 70 ${GROUND_Y - 24}, 150 ${GROUND_Y - 9}, 230 ${GROUND_Y - 18}`,
          `S 380 ${GROUND_Y - 26}, 460 ${GROUND_Y - 13}`,
          `L460 ${GROUND_Y} L0 ${GROUND_Y} Z`,
        ].join(' ')}
        fill={config.groundFill}
      />

      {NEIGHBOR_HOUSES.map((spec) => (
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
  // Shifting by exactly one spacing unit lands the pattern back on itself, so the loop is seamless.
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

export function GeothermalHeatPumpScene({
  season,
  onSeasonChange,
  isAutoPlaying,
  onAutoPlayToggle,
}: GeothermalHeatPumpSceneProps) {
  const reactId = useId().replace(/:/g, '');
  const skyGradientId = `ghp-sky-${reactId}`;
  const outgoingSkyGradientId = `ghp-sky-out-${reactId}`;
  const leftClipId = `ghp-left-${reactId}`;
  const rightClipId = `ghp-right-${reactId}`;
  const wipeClipId = `ghp-wipe-${reactId}`;
  const titleId = `ghp-title-${reactId}`;
  const descId = `ghp-desc-${reactId}`;

  const shouldReduceMotion = useReducedMotion();
  const canAnimate = shouldReduceMotion === false;
  const config = SEASONS[season];

  const [outgoingSeason, setOutgoingSeason] = useState<GeothermalSeason | null>(null);
  const previousSeasonRef = useRef(season);

  useEffect(() => {
    if (previousSeasonRef.current === season) {
      return;
    }
    // Under reduced motion this stays null, so the swap is instant with no wipe.
    if (canAnimate) {
      setOutgoingSeason(previousSeasonRef.current);
    }
    previousSeasonRef.current = season;
  }, [season, canAnimate]);

  const outgoingConfig = outgoingSeason ? SEASONS[outgoingSeason] : null;

  return (
    // src/index.css is a precompiled Tailwind build, so arbitrary utilities like
    // max-w-[340px] do not exist. Width is set inline for that reason.
    <figure className="mx-auto w-full" style={{ maxWidth: '340px' }}>
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
            {outgoingConfig && (
              <linearGradient id={outgoingSkyGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={outgoingConfig.skyTop} />
                <stop offset="100%" stopColor={outgoingConfig.skyBottom} />
              </linearGradient>
            )}
            <clipPath id={leftClipId}>
              <rect x={LEFT_PIPE_X - 7} y={PIPE_TOP} width="14" height={PIPE_BOTTOM - PIPE_TOP} />
            </clipPath>
            <clipPath id={rightClipId}>
              <rect x={RIGHT_PIPE_X - 7} y={PIPE_TOP} width="14" height={PIPE_BOTTOM - PIPE_TOP} />
            </clipPath>
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
          </defs>

          {outgoingSeason && (
            <SurfaceLayer season={outgoingSeason} skyGradientId={outgoingSkyGradientId} />
          )}
          <g clipPath={outgoingSeason ? `url(#${wipeClipId})` : undefined}>
            <SurfaceLayer season={season} skyGradientId={skyGradientId} />
          </g>

          {/* The strata never change with the season: the stable ground is the point. */}
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

          {/* Label sizes are tuned for the ~340px rendered width: the SVG scales to about
              0.74, so these land near 12-13px on screen. */}
          <path d="M264 233 H254" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <text x="269" y="239" fontSize="17" fontWeight="700" fill="#ffffff">
            Ground loop
          </text>
          <text x="24" y="272" fontSize="16.5" fontWeight="600" fill="#ffffff">
            50–59°F (10–15°C)
          </text>
          <text x="24" y="292" fontSize="16.5" fontWeight="600" fill="#ffffff">
            year-round
          </text>

          {/* Pill is sized for the longer of the two badges, "SUMMER · COOLING". */}
          <rect
            x="248"
            y="12"
            width="200"
            height="34"
            rx="17"
            fill="#ffffff"
            opacity="0.95"
            stroke={config.accent}
            strokeWidth="2"
          />
          <circle cx="268" cy="29" r="8" fill={config.accent} />
          <text x="348" y="35" textAnchor="middle" fontSize="15" fontWeight="700" fill={config.accent}>
            {config.badge}
          </text>

          <rect x="180" y="143" width="100" height="26" rx="8" fill="#ffffff" opacity="0.94" />
          <text x="230" y="161" textAnchor="middle" fontSize="16.5" fontWeight="700" fill="#0f172a">
            Heat pump
          </text>
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {canAnimate && (
          <button
            type="button"
            onClick={onAutoPlayToggle}
            className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition"
          >
            {isAutoPlaying ? 'Pause' : 'Play'}
          </button>
        )}
        {(['winter', 'summer'] as GeothermalSeason[]).map((option) => {
          const isActive = season === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSeasonChange(option)}
              aria-pressed={isActive}
              // Short visible label keeps all three controls on one row at 340px; the full
              // phrase stays available to screen readers.
              aria-label={option === 'winter' ? 'Winter heating' : 'Summer cooling'}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive ? 'text-white shadow-md' : 'bg-white text-slate-700 ring-1 ring-slate-200'
              }`}
              // Accent comes from the season config rather than a utility class, since the
              // precompiled stylesheet has no bg-sky-600 / bg-amber-600.
              style={isActive ? { backgroundColor: SEASONS[option].accent } : undefined}
            >
              {option === 'winter' ? 'Winter' : 'Summer'}
            </button>
          );
        })}
      </div>

      <figcaption className="mt-3 text-center text-sm leading-relaxed text-slate-600">
        {config.caption}
      </figcaption>
    </figure>
  );
}
