import Toggle from "../Toggle";

const WORKOUT_TYPES = ["CHEST", "BACK", "LEGS", "SHOULDERS", "ARMS", "REST"];

export default function GymSection({
  data,
  onChange,
  addExercise,
  removeExercise,
  addSet,
  removeSet,
  updateExercise,
  updateSet,
}) {
  return (
    <div className="tc-card">
      <div className="tc-section-header">
        <div className="tc-section-title-row">
          <div className="tc-section-icon">🏋️</div>
          <span className="tc-section-title">Gym</span>
        </div>
        <button type="button" onClick={addExercise} className="tc-btn-amber">
          + Exercise
        </button>
      </div>

      {/* Controls Row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ minWidth: "140px" }}>
          <label className="tc-label">Workout type</label>
          <select
            className="tc-input"
            value={data.workoutType}
            onChange={(e) => onChange("workoutType", e.target.value)}
          >
            <option value="">Select</option>
            {WORKOUT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div style={{ minWidth: "110px" }}>
          <label className="tc-label">Cardio mins</label>
          <input
            className="tc-input"
            type="number"
            placeholder="0"
            value={data.cardioMinutes}
            onChange={(e) => onChange("cardioMinutes", +e.target.value)}
          />
        </div>

        <div style={{ display: "flex", gap: "16px", alignItems: "center", paddingTop: "18px", flexWrap: "wrap" }}>
          <Toggle
            checked={data.cardioDone}
            onChange={(v) => onChange("cardioDone", v)}
            label="Cardio done"
          />
          <Toggle
            checked={data.absDone}
            onChange={(v) => onChange("absDone", v)}
            label="Abs done"
          />
        </div>
      </div>

      {/* Exercises */}
      {data.exercises.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "12px" }}>
          {data.exercises.map((exercise, i) => (
            <div key={i} className="exercise-card">
              {/* Exercise header */}
              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "10px" }}>
                <span style={{
                  background: "#eef0fb",
                  color: "#030e4f",
                  borderRadius: "6px",
                  padding: "2px 8px",
                  fontSize: "0.72rem",
                  fontWeight: "700",
                  letterSpacing: "0.06em",
                  flexShrink: 0
                }}>
                  #{i + 1}
                </span>
                <input
                  className="tc-input"
                  placeholder="Exercise name"
                  value={exercise.name}
                  onChange={(e) => updateExercise(i, e.target.value)}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => addSet(i)}
                  className="tc-btn-primary"
                  style={{ flexShrink: 0 }}
                >
                  + Set
                </button>
                <button
                  type="button"
                  onClick={() => removeExercise(i)}
                  className="tc-btn-ghost"
                  style={{ flexShrink: 0 }}
                  title="Remove exercise"
                >
                  ✕
                </button>
              </div>

              {/* Sets */}
              {exercise.sets.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {exercise.sets.map((set, j) => (
                    <div key={j} className="set-row">
                      <div>
                        {j === 0 && <label className="tc-label">Reps</label>}
                        <input
                          className="tc-input"
                          placeholder="Reps"
                          type="number"
                          value={set.reps}
                          onChange={(e) => updateSet(i, j, "reps", +e.target.value)}
                        />
                      </div>
                      <div>
                        {j === 0 && <label className="tc-label">Weight (kg)</label>}
                        <input
                          className="tc-input"
                          placeholder="Weight"
                          type="number"
                          value={set.weight}
                          onChange={(e) => updateSet(i, j, "weight", +e.target.value)}
                        />
                      </div>
                      <div style={{ paddingTop: j === 0 ? "18px" : "0" }}>
                        <button
                          type="button"
                          onClick={() => removeSet(i, j)}
                          className="tc-btn-ghost"
                          title="Remove set"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {exercise.sets.length === 0 && (
                <p style={{ fontSize: "0.8rem", color: "#b0b8c9", margin: 0 }}>
                  No sets yet — hit "+ Set" to add one.
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div>
        <label className="tc-label">Additional notes</label>
        <textarea
          className="tc-input"
          placeholder="Any notes about today's workout..."
          value={data.additionalNotes}
          onChange={(e) => onChange("additionalNotes", e.target.value)}
        />
      </div>
    </div>
  );
}
