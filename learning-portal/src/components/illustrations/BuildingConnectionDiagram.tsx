import { motion, useReducedMotion } from 'motion/react';

const buildings = [
  { x: 60, label: 'House', w: 50, h: 50 },
  { x: 175, label: 'Office', w: 60, h: 65 },
  { x: 310, label: 'School', w: 55, h: 55 },
];

export function BuildingConnectionDiagram() {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = shouldReduceMotion === false;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
      <h4 className="text-xl font-bold text-slate-800">How buildings connect to the network</h4>
      <p className="mt-2 text-sm text-slate-600">
        Each connected building needs a building-side interface, interior equipment, and a connection point down to the shared network main.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 p-4 ring-1 ring-slate-200/70">
        <svg
          viewBox="0 0 400 240"
          className="aspect-[400/240] w-full"
          role="img"
          aria-labelledby="building-connection-diagram-title building-connection-diagram-description"
        >
          <title id="building-connection-diagram-title">Building heat pump connections to a shared thermal network</title>
          <desc id="building-connection-diagram-description">
            A house, office, and school each connect through a heat pump to a district network main. When motion is enabled,
            the network, buildings, and their connections reveal in sequence.
          </desc>
          <motion.rect
            x="0"
            y="190"
            width="400"
            height="50"
            fill="#e2e8f0"
            initial={shouldAnimate ? { opacity: 0 } : false}
            whileInView={shouldAnimate ? { opacity: 1 } : undefined}
            viewport={{ once: true }}
          />
          <motion.line
            x1="0"
            y1="205"
            x2="400"
            y2="205"
            stroke="#2563eb"
            strokeWidth="4"
            strokeLinecap="round"
            initial={shouldAnimate ? { pathLength: 0 } : false}
            whileInView={shouldAnimate ? { pathLength: 1 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <text x="200" y="229" textAnchor="middle" fontSize="8" fill="#64748b">
            District network main
          </text>

          {buildings.map((building, index) => (
            <motion.g
              key={building.label}
              initial={shouldAnimate ? { opacity: 0, y: -16 } : false}
              whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.14 }}
            >
              <rect
                x={building.x}
                y={140 - building.h}
                width={building.w}
                height={building.h}
                rx="3"
                fill="white"
                stroke="#cbd5e1"
                strokeWidth="1.5"
              />
              <text
                x={building.x + building.w / 2}
                y={140 - building.h / 2 + 3}
                textAnchor="middle"
                fontSize="8"
                fontWeight="600"
                fill="#334155"
              >
                {building.label}
              </text>

              <rect
                x={building.x + building.w / 2 - 10}
                y="145"
                width="20"
                height="14"
                rx="2"
                fill="#dbeafe"
                stroke="#2563eb"
                strokeWidth="1"
              />
              <text x={building.x + building.w / 2} y="155" textAnchor="middle" fontSize="5" fill="#2563eb">
                HP
              </text>

              <motion.line
                x1={building.x + building.w / 2}
                y1="140"
                x2={building.x + building.w / 2}
                y2="145"
                stroke="#93c5fd"
                strokeWidth="2"
                initial={shouldAnimate ? { pathLength: 0 } : false}
                whileInView={shouldAnimate ? { pathLength: 1 } : undefined}
                viewport={{ once: true }}
                transition={{ delay: 0.45 + index * 0.15, duration: 0.35 }}
              />
              <motion.line
                x1={building.x + building.w / 2}
                y1="159"
                x2={building.x + building.w / 2}
                y2="205"
                stroke="#2563eb"
                strokeWidth="2"
                strokeDasharray="4 3"
                initial={shouldAnimate ? { pathLength: 0 } : false}
                whileInView={shouldAnimate ? { pathLength: 1 } : undefined}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.15, duration: 0.45 }}
              />

              {shouldAnimate && (
                <motion.circle
                  aria-hidden="true"
                  r="3"
                  fill="#f97316"
                  cx={building.x + building.w / 2}
                  initial={{ cy: 205, opacity: 0 }}
                  whileInView={{ cy: 164, opacity: [0, 1, 0] }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 1.25, delay: 0.9 + index * 0.22, ease: 'easeInOut' }}
                />
              )}
            </motion.g>
          ))}

          <text x="200" y="176" textAnchor="middle" fontSize="8" fill="#64748b">
            Heat pumps link each building to the shared network
          </text>
        </svg>
      </div>
    </div>
  );
}
