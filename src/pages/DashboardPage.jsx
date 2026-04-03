import { useDashboard } from "../hooks/useDashboard";
import { useBodyMetrics } from "../hooks/useBodyMetrics";
import StreakCard from "../components/dashboard/StreakCard";
import ChartCard from "../components/dashboard/ChartCard";
import LineChart from "../components/dashboard/LineChart";
import BarChart from "../components/dashboard/BarChart";
import HabitsHeatmap from "../components/dashboard/HabitsHeatmap";
import BodyMetricsSection from "../components/dashboard/BodyMetricsSection";
import UpdateMetricsModal from "../components/dashboard/UpdateMetricsModal";

const USER_ID = "tejasMukherjee";
const DAYS = 7;

function LoadingScreen() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: "32px", height: "32px", border: "3px solid #eef0fb",
          borderTopColor: "#030e4f", borderRadius: "50%",
          animation: "spin 0.8s linear infinite", margin: "0 auto 12px",
        }} />
        <p style={{ fontSize: "0.85rem", color: "#8892a4" }}>Loading your stats…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

function ErrorScreen({ message, onRetry }) {
  return (
    <div style={{ minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: "320px" }}>
        <div style={{ fontSize: "2rem", marginBottom: "8px" }}>⚠️</div>
        <p style={{ fontSize: "0.875rem", color: "#8892a4", marginBottom: "16px" }}>{message}</p>
        <button onClick={onRetry} style={{
          background: "#030e4f", color: "white", border: "none",
          borderRadius: "8px", padding: "8px 20px", cursor: "pointer", fontSize: "0.85rem",
        }}>
          Retry
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { streaks, rangeData, loading, error, refetch } = useDashboard(USER_ID, DAYS);
  const {
    weightHistory,
    bodyFatHistory,
    showPrompt,
    setShowPrompt,
    submitting,
    submitError,
    submitMetrics,
  } = useBodyMetrics(USER_ID);

  const caloriesData = rangeData.map((d) => ({ date: d.date, value: d.calories?.calories ?? null }));
  const proteinData  = rangeData.map((d) => ({ date: d.date, value: d.calories?.proteinGrams ?? null }));
  const dsaData      = rangeData.map((d) => ({ date: d.date, value: d.dsa?.problemsSolved ?? null }));
  const dsaMinutesData = rangeData.map((d) => ({ date: d.date, value: d.dsa?.minutesSpent ?? null }));
  const gymData      = rangeData.map((d) => ({
    date: d.date,
    value: d.gym?.workoutType && d.gym.workoutType !== "REST" ? 1 : 0,
  }));
  const habitsCompletionData = rangeData.map((d) => {
    if (d._empty || !d.habits) return { date: d.date, value: null };
    const habits = Object.values(d.habits);
    return { date: d.date, value: habits.filter((h) => h.completed).length };
  });

  if (loading) return <LoadingScreen />;
  if (error)   return <ErrorScreen message={error} onRetry={refetch} />;

  const streakKeys = streaks ? Object.keys(streaks) : [];

  return (
    <div className="tc-page">
      {showPrompt && (
        <UpdateMetricsModal
          onSubmit={submitMetrics}
          onDismiss={() => setShowPrompt(false)}
          submitting={submitting}
          error={submitError}
        />
      )}

      <div className="tc-container">
        {/* Header */}
        <div className="tc-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <div>
            <h1>Dashboard</h1>
            <p style={{ fontSize: "0.875rem", color: "#8892a4", marginTop: "4px" }}>
              Last {DAYS} days · {USER_ID}
            </p>
          </div>
          <button onClick={refetch} style={{
            background: "white", border: "1.5px solid #e2e6f0", borderRadius: "9px",
            padding: "7px 14px", fontSize: "0.8rem", fontWeight: 500,
            color: "#8892a4", cursor: "pointer", marginTop: "6px",
          }}>
            ↻ Refresh
          </button>
        </div>

        {/* ── Body Metrics ── */}
        <BodyMetricsSection
          weightHistory={weightHistory}
          bodyFatHistory={bodyFatHistory}
          onLogClick={() => setShowPrompt(true)}
        />

        {/* ── Streaks ── */}
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", color: "#8892a4", marginBottom: "10px",
          }}>
            Streaks
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px" }}>
            {streakKeys.map((key) => (
              <StreakCard key={key} name={key} data={streaks[key]} />
            ))}
          </div>
        </section>

        {/* ── Trends ── */}
        <section>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", color: "#8892a4", marginBottom: "10px",
          }}>
            Trends
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
              <ChartCard title="Calories" icon="🔥" subtitle="kcal per day">
                <LineChart data={caloriesData} color="#f49f1c" label="calories" />
              </ChartCard>
              <ChartCard title="Protein" icon="💪" subtitle="grams per day">
                <LineChart data={proteinData} color="#030e4f" label="protein" />
              </ChartCard>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
              <ChartCard title="DSA Problems" icon="🧠" subtitle="solved per day">
                <BarChart data={dsaData} color="#030e4f" label="dsa" />
              </ChartCard>
              <ChartCard title="DSA Minutes" icon="⏱️" subtitle="time spent per day">
                <LineChart data={dsaMinutesData} color="#7c3aed" label="dsa-mins" />
              </ChartCard>
            </div>

            <ChartCard title="Gym Activity" icon="🏋️" subtitle="workout days (REST shown as empty)">
              <div style={{ marginBottom: "8px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {rangeData.filter((d) => d.gym?.workoutType).map((d) => (
                  <span key={d.date} style={{
                    fontSize: "0.7rem", fontWeight: 500, padding: "2px 8px",
                    borderRadius: "999px", background: "#eef0fb", color: "#030e4f",
                  }}>
                    {d.gym.workoutType}
                  </span>
                ))}
              </div>
              <BarChart data={gymData} color="#030e4f" label="gym" />
            </ChartCard>

            <ChartCard title="Habits" icon="✅" subtitle="daily completion grid">
              <HabitsHeatmap rangeData={rangeData} />
              <div style={{ marginTop: "10px" }}>
                <LineChart data={habitsCompletionData} color="#059669" label="habits" />
              </div>
            </ChartCard>
          </div>
        </section>
      </div>
    </div>
  );
}
