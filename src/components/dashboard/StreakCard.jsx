const STREAK_META = {
  dsa:          { icon: "🧠", label: "DSA" },
  gym:          { icon: "🏋️", label: "Gym" },
  calories:     { icon: "🥗", label: "Calories" },
  meditation:   { icon: "🧘", label: "Meditation" },
  reading:      { icon: "📚", label: "Reading" },
  sleepBefore12:{ icon: "🌙", label: "Sleep <12" },
  noSmoking:    { icon: "🚭", label: "No Smoking" },
};

function FlameIcon({ active }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1C7 1 9.5 3.5 9.5 6C9.5 6 8.5 5.5 8 5C8 5 9 7 7.5 8.5C7.5 8.5 8 7.5 7 7C7 7 5 8.5 5 10C5 11.657 5.895 13 7 13C8.105 13 9 11.657 9 10"
        stroke={active ? "#f49f1c" : "#b0b8c9"}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StreakCard({ name, data }) {
  const meta = STREAK_META[name] || { icon: "◆", label: name };
  const isActive = data.current > 0;

  return (
    <div style={{
      background: "var(--card, #fff)",
      border: `1.5px solid ${isActive ? "#e8edfc" : "var(--border, #e2e6f0)"}`,
      borderRadius: "12px",
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <span style={{ fontSize: "15px" }}>{meta.icon}</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--muted, #8892a4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {meta.label}
          </span>
        </div>
        <FlameIcon active={isActive} />
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: "0.68rem", color: "var(--muted, #8892a4)", marginBottom: "2px" }}>Current</div>
          <div style={{
            fontSize: "1.6rem",
            fontWeight: 700,
            fontFamily: "'Syne', sans-serif",
            color: isActive ? "var(--navy, #030e4f)" : "#b0b8c9",
            lineHeight: 1,
          }}>
            {data.current}
            <span style={{ fontSize: "0.75rem", fontWeight: 400, marginLeft: "3px", color: "var(--muted, #8892a4)" }}>days</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.68rem", color: "var(--muted, #8892a4)", marginBottom: "2px" }}>Best</div>
          <div style={{ fontSize: "1rem", fontWeight: 600, color: "#b0b8c9" }}>
            {data.highest}
          </div>
        </div>
      </div>

      {/* Mini progress bar */}
      <div style={{ height: "3px", background: "#eef0fb", borderRadius: "999px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${Math.min(100, (data.current / Math.max(data.highest, 1)) * 100)}%`,
          background: isActive ? "var(--navy, #030e4f)" : "#dde2ee",
          borderRadius: "999px",
          transition: "width 0.6s ease",
        }} />
      </div>
    </div>
  );
}
