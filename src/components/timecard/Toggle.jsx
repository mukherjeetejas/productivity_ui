export default function Toggle({ checked, onChange, label }) {
  return (
    <label className="tc-toggle-label">
      <span className="tc-toggle">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="tc-toggle-track" />
        <span className="tc-toggle-thumb" />
      </span>
      {label}
    </label>
  );
}
