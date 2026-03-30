export default function NotesSection({ value, onChange }) {
  return (
    <div className="tc-card">
      <div className="tc-section-header">
        <div className="tc-section-title-row">
          <div className="tc-section-icon">📝</div>
          <span className="tc-section-title">Overall Notes</span>
        </div>
      </div>
      <textarea
        className="tc-input"
        placeholder="Anything else about your day..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ minHeight: "100px" }}
      />
    </div>
  );
}
