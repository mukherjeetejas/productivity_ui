const HABIT_META = {
  meditation: { icon: "🧘", label: "Meditation" },
  reading: { icon: "📚", label: "Reading" },
  noSmoking: { icon: "🚭", label: "No Smoking" },
  sleepBefore12: { icon: "🌙", label: "Sleep Before 12" },
};

export default function HabitsSection({ data, onChange }) {
  return (
    <div className="tc-card">
      <div className="tc-section-header">
        <div className="tc-section-title-row">
          <div className="tc-section-icon">✅</div>
          <span className="tc-section-title">Habits</span>
        </div>
        <span style={{ fontSize: "0.78rem", color: "#8892a4" }}>
          {Object.values(data).filter((h) => h.completed).length} / {Object.keys(data).length} done
        </span>
      </div>

      <div className="grid-2">
        {Object.keys(data).map((habit) => {
          const meta = HABIT_META[habit] || { icon: "◆", label: habit };
          const isCompleted = data[habit].completed;
          return (
            <div key={habit} className={`habit-item${isCompleted ? " completed" : ""}`}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  marginBottom: "10px",
                  userSelect: "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={(e) => onChange(habit, "completed", e.target.checked)}
                  style={{ display: "none" }}
                />
                <span
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "6px",
                    border: `2px solid ${isCompleted ? "#030e4f" : "#d0d7e8"}`,
                    background: isCompleted ? "#030e4f" : "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.15s ease",
                  }}
                >
                  {isCompleted && (
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                      <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                  {meta.icon} {meta.label}
                </span>
              </label>

              <input
                className="tc-input"
                placeholder="Notes (optional)"
                value={data[habit].description}
                onChange={(e) => onChange(habit, "description", e.target.value)}
                style={{ fontSize: "0.82rem" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
