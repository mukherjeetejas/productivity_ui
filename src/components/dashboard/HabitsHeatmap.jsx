import { shortDate } from "../../utils/dateUtils";
import { habitIcon, habitLabel } from "../../hooks/useHabits";

export default function HabitsHeatmap({ rangeData, habits }) {
  if (!rangeData.length || !habits?.length) return (
    <p style={{ fontSize: "0.8rem", color: "#b0b8c9", textAlign: "center", padding: "12px 0" }}>
      No habits tracked yet.
    </p>
  );

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", minWidth: "320px" }}>
        <thead>
          <tr>
            <th style={{ width: "110px" }} />
            {rangeData.map((d) => (
              <th key={d.date} style={{
                fontSize: "0.68rem", fontWeight: 400, color: "#b0b8c9",
                padding: "0 3px 8px", textAlign: "center", whiteSpace: "nowrap",
              }}>
                {shortDate(d.date)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habitKey) => (
            <tr key={habitKey}>
              <td style={{
                fontSize: "0.75rem", color: "var(--muted, #8892a4)",
                paddingRight: "10px", paddingBottom: "6px", whiteSpace: "nowrap",
              }}>
                {habitIcon(habitKey)} {habitLabel(habitKey)}
              </td>
              {rangeData.map((d) => {
                const completed = d.habits?.[habitKey]?.completed;
                const isEmpty = d._empty;
                return (
                  <td key={d.date} style={{ textAlign: "center", paddingBottom: "6px" }}>
                    <div style={{
                      width: "22px", height: "22px", borderRadius: "6px", margin: "0 auto",
                      background: isEmpty ? "#f4f5f8" : completed ? "#030e4f" : "#f0f3fc",
                      border: isEmpty ? "none" : `1.5px solid ${completed ? "#030e4f" : "#dde2ee"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {!isEmpty && completed && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
