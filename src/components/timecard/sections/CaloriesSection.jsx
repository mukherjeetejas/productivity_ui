import Toggle from "../Toggle";

export default function CaloriesSection({ data, onChange }) {
  return (
    <div className="tc-card">
      <div className="tc-section-header">
        <div className="tc-section-title-row">
          <div className="tc-section-icon">🥗</div>
          <span className="tc-section-title">Calories</span>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-end", marginBottom: "12px" }}>
        <div style={{ minWidth: "130px", flex: 1 }}>
          <label className="tc-label">Calories</label>
          <input
            className="tc-input"
            placeholder="0 kcal"
            type="number"
            value={data.calories}
            onChange={(e) => onChange("calories", +e.target.value)}
          />
        </div>

        <div style={{ minWidth: "130px", flex: 1 }}>
          <label className="tc-label">Protein (g)</label>
          <input
            className="tc-input"
            placeholder="0 g"
            type="number"
            value={data.proteinGrams}
            onChange={(e) => onChange("proteinGrams", +e.target.value)}
          />
        </div>

        <div style={{ paddingBottom: "2px" }}>
          <Toggle
            checked={data.targetMet}
            onChange={(v) => onChange("targetMet", v)}
            label="Target met"
          />
        </div>
      </div>

      <div>
        <label className="tc-label">Diet description</label>
        <textarea
          className="tc-input"
          placeholder="What did you eat today?"
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </div>
    </div>
  );
}
