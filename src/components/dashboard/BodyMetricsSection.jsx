import ChartCard from "./ChartCard";
import LineChart from "./LineChart";

function StatPill({ label, value, unit, highlight }) {
  return (
    <div style={{
      background: highlight ? "#eef0fb" : "#f7f8fc",
      borderRadius: "10px", padding: "12px 14px",
      border: `1.5px solid ${highlight ? "#c0c8e8" : "#e2e6f0"}`,
      minWidth: "100px", flex: 1,
    }}>
      <div style={{ fontSize: "0.68rem", color: "#8892a4", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
        {label}
      </div>
      <div style={{ fontSize: "1.35rem", fontWeight: 700, fontFamily: "'Syne', sans-serif", color: "#030e4f", lineHeight: 1 }}>
        {value ?? "—"}
        {value != null && <span style={{ fontSize: "0.75rem", fontWeight: 400, color: "#8892a4", marginLeft: "3px" }}>{unit}</span>}
      </div>
    </div>
  );
}

export default function BodyMetricsSection({ weightHistory, bodyFatHistory, onLogClick }) {
  const latestWeight = weightHistory.at(-1);
  const latestFat = bodyFatHistory.at(-1);

  const weightDelta = weightHistory.length >= 2
    ? (weightHistory.at(-1).weight - weightHistory[0].weight).toFixed(1)
    : null;

  const fatDelta = bodyFatHistory.length >= 2
    ? (bodyFatHistory.at(-1).calculatedFatPercentage - bodyFatHistory[0].calculatedFatPercentage).toFixed(2)
    : null;

  const weightChartData = weightHistory.map((d) => ({ date: d.date, value: d.weight }));
  const fatChartData = bodyFatHistory.map((d) => ({ date: d.recordedDate, value: d.calculatedFatPercentage }));
  const waistChartData = bodyFatHistory.map((d) => ({ date: d.recordedDate, value: d.waistCircumference }));

  function deltaLabel(val) {
    if (val == null) return null;
    const n = parseFloat(val);
    return `${n > 0 ? "+" : ""}${val}`;
  }

  return (
    <section style={{ marginBottom: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontSize: "0.72rem", fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase", color: "#8892a4", margin: 0,
        }}>
          Body Metrics
        </h2>
        <button
          onClick={onLogClick}
          style={{
            background: "#030e4f", color: "white", border: "none",
            borderRadius: "8px", padding: "5px 12px", fontSize: "0.75rem",
            fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}
        >
          + Log today
        </button>
      </div>

      {/* Stat summary row */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
        <StatPill
          label="Current weight"
          value={latestWeight?.weight}
          unit="kg"
          highlight
        />
        <StatPill
          label={`Change (${weightHistory.length}d)`}
          value={deltaLabel(weightDelta)}
          unit="kg"
        />
        <StatPill
          label="Body fat"
          value={latestFat?.calculatedFatPercentage?.toFixed(1)}
          unit="%"
          highlight
        />
        <StatPill
          label={`Fat change (${bodyFatHistory.length}d)`}
          value={deltaLabel(fatDelta)}
          unit="%"
        />
        <StatPill
          label="Waist"
          value={latestFat?.waistCircumference}
          unit="cm"
        />
        <StatPill
          label="Hip"
          value={latestFat?.hipCircumference}
          unit="cm"
        />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
        <ChartCard title="Weight" icon="⚖️" subtitle="kg over time">
          <LineChart data={weightChartData} color="#030e4f" label="weight" />
        </ChartCard>
        <ChartCard title="Body Fat %" icon="📊" subtitle="calculated via US Navy formula">
          <LineChart data={fatChartData} color="#f49f1c" label="bodyfat" />
        </ChartCard>
      </div>

      <div style={{ marginTop: "12px" }}>
        <ChartCard title="Waist Circumference" icon="📏" subtitle="cm over time">
          <LineChart data={waistChartData} color="#7c3aed" label="waist" />
        </ChartCard>
      </div>
    </section>
  );
}
