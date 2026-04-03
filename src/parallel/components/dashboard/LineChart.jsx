import { useMemo } from "react";
import { shortDate } from "../../utils/dateUtils";

const W = 500;
const H = 120;
const PAD = { top: 10, right: 16, bottom: 28, left: 36 };

function scaleX(i, total) {
  const inner = W - PAD.left - PAD.right;
  return PAD.left + (total <= 1 ? inner / 2 : (i / (total - 1)) * inner);
}

function scaleY(val, min, max) {
  const inner = H - PAD.top - PAD.bottom;
  if (max === min) return PAD.top + inner / 2;
  return PAD.top + inner - ((val - min) / (max - min)) * inner;
}

export default function LineChart({ data, color = "#030e4f", label }) {
  const valid = useMemo(() => data.filter((d) => d.value != null && !isNaN(d.value)), [data]);

  if (valid.length === 0) {
    return (
      <div style={{ height: H, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "0.8rem", color: "#b0b8c9" }}>No data for this period</span>
      </div>
    );
  }

  const vals = valid.map((d) => d.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);

  const points = data.map((d, i) => ({
    x: scaleX(i, data.length),
    y: d.value != null ? scaleY(d.value, min, max) : null,
    value: d.value,
    date: d.date,
  }));

  const linePath = points
    .filter((p) => p.y != null)
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");

  const areaPath =
    linePath +
    ` L${points.filter((p) => p.y != null).at(-1).x},${H - PAD.bottom}` +
    ` L${points.filter((p) => p.y != null)[0].x},${H - PAD.bottom} Z`;

  // Y axis ticks
  const yTicks = [min, Math.round((min + max) / 2), max];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
      <defs>
        <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.12" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {yTicks.map((t, i) => (
        <g key={i}>
          <line
            x1={PAD.left} y1={scaleY(t, min, max)}
            x2={W - PAD.right} y2={scaleY(t, min, max)}
            stroke="#e2e6f0" strokeWidth="0.8" strokeDasharray="3,3"
          />
          <text
            x={PAD.left - 6} y={scaleY(t, min, max) + 4}
            textAnchor="end" fontSize="9" fill="#b0b8c9"
          >
            {t}
          </text>
        </g>
      ))}

      {/* Area fill */}
      <path d={areaPath} fill={`url(#grad-${label})`} />

      {/* Line */}
      <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Dots + x labels */}
      {points.map((p, i) => (
        <g key={i}>
          {p.y != null && (
            <circle cx={p.x} cy={p.y} r="3" fill={color} stroke="white" strokeWidth="1.5" />
          )}
          {/* Only show every 2nd label on small sets, every label on 7 */}
          {(data.length <= 7 || i % 2 === 0) && (
            <text x={p.x} y={H - 6} textAnchor="middle" fontSize="9" fill="#b0b8c9">
              {shortDate(p.date)}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
