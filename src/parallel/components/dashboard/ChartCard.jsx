export default function ChartCard({ title, icon, subtitle, children }) {
  return (
    <div style={{
      background: "var(--card, #fff)",
      border: "1px solid var(--border, #e2e6f0)",
      borderRadius: "14px",
      padding: "18px 20px 14px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "28px", height: "28px", borderRadius: "7px",
            background: "#eef0fb", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "13px", flexShrink: 0,
          }}>
            {icon}
          </div>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--navy, #030e4f)" }}>{title}</div>
            {subtitle && <div style={{ fontSize: "0.72rem", color: "var(--muted, #8892a4)" }}>{subtitle}</div>}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
