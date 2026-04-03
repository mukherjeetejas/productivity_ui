import { shortDate } from "../../utils/dateUtils";

const W = 500;
const H = 120;
const PAD = { top: 10, right: 16, bottom: 28, left: 36 };

export default function BarChart({ data, color = "#030e4f", label }) {
  const valid = data.filter((d) => d.value != null);
  if (valid.length === 0) {
    return (
      <div style={{ height: H, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "0.8rem", color: "#b0b8c9" }}>No data for this period</span>
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.value ?? 0), 1);
  const inner = { w: W - PAD.left - PAD.right, h: H - PAD.top - PAD.bottom };
  const barW = Math.max(4, (inner.w / data.length) * 0.55);
  const gap = inner.w / data.length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
      {/* Y ticks */}
      {[0, Math.round(max / 2), max].map((t, i) => {
        const y = PAD.top + inner.h - (t / max) * inner.h;
        return (
          <g key={i}>
            <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#e2e6f0" strokeWidth="0.8" strokeDasharray="3,3" />
            <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#b0b8c9">{t}</text>
          </g>
        );
      })}

      {data.map((d, i) => {
        const x = PAD.left + i * gap + gap / 2;
        const val = d.value ?? 0;
        const barH = (val / max) * inner.h;
        const y = PAD.top + inner.h - barH;
        return (
          <g key={i}>
            <rect
              x={x - barW / 2} y={val > 0 ? y : PAD.top + inner.h - 2}
              width={barW} height={val > 0 ? barH : 2}
              rx="3" fill={val > 0 ? color : "#eef0fb"}
              opacity={val > 0 ? 1 : 1}
            />
            {(data.length <= 7 || i % 2 === 0) && (
              <text x={x} y={H - 6} textAnchor="middle" fontSize="9" fill="#b0b8c9">
                {shortDate(d.date)}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
