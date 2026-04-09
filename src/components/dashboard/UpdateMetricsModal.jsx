import { useState } from "react";

export default function UpdateMetricsModal({ onSubmit, onDismiss, submitting, error }) {
  const [weight, setWeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");

  const valid = weight && neck && waist && hip;

  function handleSubmit() {
    if (!valid) return;
    onSubmit(parseFloat(weight), parseFloat(neck), parseFloat(waist), parseFloat(hip));
  }

  return (
    /* Backdrop */
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(3, 14, 79, 0.35)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
      backdropFilter: "blur(2px)",
    }}>
      {/* Modal card */}
      <div style={{
        background: "white", borderRadius: "22px",
        padding: "28px 26px", width: "100%", maxWidth: "420px",
        boxShadow: "0 24px 80px rgba(3,14,79,0.14)",
        border: "1px solid rgba(226,230,240,0.85)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "6px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "10px",
            background: "#eef0fb", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "20px", marginBottom: "14px",
          }}>
            ⚖️
          </div>
          <button
            onClick={onDismiss}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#b0b8c9", fontSize: "18px", lineHeight: 1, padding: "4px",
            }}
          >
            ✕
          </button>
        </div>

        <h3 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem",
          color: "#030e4f", margin: "0 0 4px",
        }}>
          Update your metrics
        </h3>
        <p style={{ fontSize: "0.82rem", color: "#8892a4", margin: "0 0 22px", lineHeight: 1.5 }}>
          Your weight or body fat hasn't been logged in over a week. Take 30 seconds to log it now.
        </p>

        {/* Weight */}
        <div style={{ marginBottom: "14px" }}>
          <label style={{
            display: "block", fontSize: "0.72rem", fontWeight: 500,
            color: "#8892a4", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "6px",
          }}>
            Weight (kg)
          </label>
          <input
            className="tc-input"
            type="number"
            placeholder="e.g. 84"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        {/* Divider */}
        <div style={{
          fontSize: "0.72rem", fontWeight: 600, color: "#8892a4",
          textTransform: "uppercase", letterSpacing: "0.08em",
          marginBottom: "12px", marginTop: "4px",
        }}>
          Body fat measurements
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
          <div>
            <label style={{
              display: "block", fontSize: "0.72rem", fontWeight: 500,
              color: "#8892a4", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "6px",
            }}>
              Neck (cm)
            </label>
            <input
              className="tc-input"
              type="number"
              placeholder="e.g. 38"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
            />
          </div>
          <div>
            <label style={{
              display: "block", fontSize: "0.72rem", fontWeight: 500,
              color: "#8892a4", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "6px",
            }}>
              Waist (cm)
            </label>
            <input
              className="tc-input"
              type="number"
              placeholder="e.g. 91"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
            />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{
              display: "block", fontSize: "0.72rem", fontWeight: 500,
              color: "#8892a4", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "6px",
            }}>
              Hip (cm) (female only)
            </label>
            <input
              className="tc-input"
              type="number"
              placeholder="e.g. 91"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
            />
          </div>
        </div>

        <p style={{ fontSize: "0.73rem", color: "#b0b8c9", marginBottom: "20px", marginTop: "4px" }}>
          Body fat % is calculated using the US Navy formula.
        </p>

        {error && (
          <div style={{
            background: "#fff5f5", border: "1px solid #fecaca",
            borderRadius: "8px", padding: "10px 12px",
            fontSize: "0.8rem", color: "#b91c1c", marginBottom: "14px",
          }}>
            {error}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={onDismiss}
            style={{
              flex: 1, background: "transparent",
              border: "1.5px solid #e2e6f0", borderRadius: "10px",
              padding: "10px", fontSize: "0.875rem", fontWeight: 500,
              color: "#8892a4", cursor: "pointer",
            }}
          >
            Remind me later
          </button>
          <button
            onClick={handleSubmit}
            disabled={!valid || submitting}
            style={{
              flex: 2, background: valid ? "#030e4f" : "#dde2ee",
              border: "none", borderRadius: "10px",
              padding: "10px", fontSize: "0.875rem", fontWeight: 600,
              color: valid ? "white" : "#b0b8c9",
              cursor: valid ? "pointer" : "not-allowed",
              fontFamily: "'DM Sans', sans-serif",
              transition: "background 0.15s",
            }}
          >
            {submitting ? "Saving…" : "Save metrics"}
          </button>
        </div>
      </div>
    </div>
  );
}
