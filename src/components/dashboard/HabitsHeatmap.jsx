import { shortDate } from "../../utils/dateUtils";

const HABITS = [
  { key: "meditation", icon: "🧘", label: "Meditation" },
  { key: "reading", icon: "📚", label: "Reading" },
  { key: "noSmoking", icon: "🚭", label: "No Smoking" },
  { key: "sleepBefore12", icon: "🌙", label: "Sleep <12" },
];

export default function HabitsHeatmap({ rangeData }) {
  if (!rangeData.length) return null;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", minWidth: "320px" }}>
        <thead>
          <tr>
            <th style={{ width: "90px" }} />
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
          {HABITS.map((habit) => (
            <tr key={habit.key}>
              <td style={{
                fontSize: "0.75rem", color: "var(--muted, #8892a4)",
                paddingRight: "10px", paddingBottom: "6px", whiteSpace: "nowrap",
              }}>
                {habit.icon} {habit.label}
              </td>
              {rangeData.map((d) => {
                const completed = d.habits?.[habit.key]?.completed;
                const isEmpty = d._empty;
                return (
                  <td key={d.date} style={{ textAlign: "center", paddingBottom: "6px" }}>
                    <div style={{
                      width: "22px", height: "22px", borderRadius: "6px", margin: "0 auto",
                      background: isEmpty
                        ? "#f4f5f8"
                        : completed
                        ? "#030e4f"
                        : "#f0f3fc",
                      border: isEmpty ? "none" : `1.5px solid ${completed ? "#030e4f" : "#dde2ee"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {!isEmpty && completed && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
