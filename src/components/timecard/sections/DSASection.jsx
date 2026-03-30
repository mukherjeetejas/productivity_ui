export default function DSASection({ data, onChange }) {
  return (
    <div className="tc-card">
      <div className="tc-section-header">
        <div className="tc-section-title-row">
          <div className="tc-section-icon">🧠</div>
          <span className="tc-section-title">DSA</span>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: "12px" }}>
        <div>
          <label className="tc-label">Problems solved</label>
          <input
            className="tc-input"
            placeholder="0"
            type="number"
            value={data.problemsSolved}
            onChange={(e) => onChange("problemsSolved", +e.target.value)}
          />
        </div>
        <div>
          <label className="tc-label">Minutes spent</label>
          <input
            className="tc-input"
            placeholder="0"
            type="number"
            value={data.minutesSpent}
            onChange={(e) => onChange("minutesSpent", +e.target.value)}
          />
        </div>
        <div>
          <label className="tc-label">Topic</label>
          <input
            className="tc-input"
            placeholder="e.g. Trees"
            value={data.topic}
            onChange={(e) => onChange("topic", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="tc-label">Description</label>
        <textarea
          className="tc-input"
          placeholder="What did you work on today?"
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </div>
    </div>
  );
}
