import { useState } from "react";
import { habitIcon, habitLabel } from "../../../hooks/useHabits";

function toCamelCase(str) {
  return str
    .trim()
    .split(/\s+/)
    .map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

function HabitItem({ habitKey, value, onChange }) {
  const isCompleted = value?.completed || false;
  return (
    <div className={`habit-item${isCompleted ? " completed" : ""}`}>
      <label style={{
        display: "flex", alignItems: "center", gap: "8px",
        cursor: "pointer", marginBottom: "10px", userSelect: "none",
      }}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => onChange(habitKey, "completed", e.target.checked)}
          style={{ display: "none" }}
        />
        <span style={{
          width: "20px", height: "20px", borderRadius: "6px",
          border: `2px solid ${isCompleted ? "#030e4f" : "#d0d7e8"}`,
          background: isCompleted ? "#030e4f" : "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, transition: "all 0.15s ease",
        }}>
          {isCompleted && (
            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
              <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
        <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
          {habitIcon(habitKey)} {habitLabel(habitKey)}
        </span>
      </label>
      <input
        className="tc-input"
        placeholder="Notes (optional)"
        value={value?.description || ""}
        onChange={(e) => onChange(habitKey, "description", e.target.value)}
        style={{ fontSize: "0.82rem" }}
      />
    </div>
  );
}

function AddHabitButton({ onAdd, existingKeys }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  function handleAdd() {
    const key = toCamelCase(value);
    if (!key || existingKeys.includes(key)) return;
    onAdd(key);
    setValue("");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "6px", width: "100%", minHeight: "88px",
          border: "1.5px dashed #d0d7e8", borderRadius: "12px",
          background: "transparent", color: "#8892a4",
          fontSize: "0.82rem", fontWeight: 500, cursor: "pointer",
          transition: "border-color 0.15s, color 0.15s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#030e4f"; e.currentTarget.style.color = "#030e4f"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#d0d7e8"; e.currentTarget.style.color = "#8892a4"; }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        Add habit
      </button>
    );
  }

  return (
    <div style={{
      border: "1.5px solid #c0c8e8", borderRadius: "12px",
      padding: "12px", background: "#f0f3fc",
    }}>
      <label className="tc-label">New habit name</label>
      <input
        className="tc-input"
        placeholder="e.g. No Smoking, Cold Shower, Reading"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        autoFocus
        style={{ marginBottom: "10px" }}
      />
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          onClick={() => { setOpen(false); setValue(""); }}
          style={{
            flex: 1, background: "transparent", border: "1.5px solid #e2e6f0",
            borderRadius: "8px", padding: "8px", fontSize: "0.82rem",
            color: "#8892a4", cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!value.trim()}
          style={{
            flex: 2, background: value.trim() ? "#030e4f" : "#dde2ee",
            border: "none", borderRadius: "8px", padding: "8px",
            fontSize: "0.82rem", fontWeight: 500,
            color: value.trim() ? "white" : "#b0b8c9",
            cursor: value.trim() ? "pointer" : "not-allowed",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default function HabitsSection({ data, onChange, onAddHabit, habitsLoading }) {
  const habitKeys = Object.keys(data);
  const completedCount = habitKeys.filter((k) => data[k]?.completed).length;

  return (
    <div className="tc-card">
      <div className="tc-section-header">
        <div className="tc-section-title-row">
          <div className="tc-section-icon">✅</div>
          <span className="tc-section-title">Habits</span>
        </div>
        {habitKeys.length > 0 && (
          <span style={{ fontSize: "0.78rem", color: "#8892a4" }}>
            {completedCount} / {habitKeys.length} done
          </span>
        )}
      </div>

      {habitsLoading ? (
        <p style={{ fontSize: "0.82rem", color: "#b0b8c9", textAlign: "center", padding: "20px 0" }}>
          Loading habits…
        </p>
      ) : (
        <div className="grid-2">
          {habitKeys.map((key) => (
            <HabitItem
              key={key}
              habitKey={key}
              value={data[key]}
              onChange={onChange}
            />
          ))}
          <AddHabitButton onAdd={onAddHabit} existingKeys={habitKeys} />
        </div>
      )}
    </div>
  );
}
