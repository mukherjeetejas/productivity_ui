import { useDashboard } from "../hooks/useDashboard";
import { useBodyMetrics } from "../hooks/useBodyMetrics";
import { useHabits, habitIcon, habitLabel } from "../hooks/useHabits";
import { useAuth } from "../context/AuthContext";
import StreakCard from "../components/dashboard/StreakCard";
import ChartCard from "../components/dashboard/ChartCard";
import LineChart from "../components/dashboard/LineChart";
import BarChart from "../components/dashboard/BarChart";
import HabitsHeatmap from "../components/dashboard/HabitsHeatmap";
import BodyMetricsSection from "../components/dashboard/BodyMetricsSection";
import UpdateMetricsModal from "../components/dashboard/UpdateMetricsModal";

const DAYS = 7;

// One distinct color per habit slot
const HABIT_COLORS = ["#030e4f","#7c3aed","#059669","#d97706","#0891b2","#db2777","#65a30d","#dc2626"];

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
        }}>Retry</button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const userId = user?.id;

  const { streaks, rangeData, loading, error, refetch } = useDashboard(userId, DAYS);
  const { habits } = useHabits(userId);
  const {
    weightHistory, bodyFatHistory,
    showPrompt, setShowPrompt,
    submitting, submitError, submitMetrics,
  } = useBodyMetrics(userId);

  // Streaks: use habitStreaks from user object (already has all keys dynamically)
  const streakKeys = streaks ? Object.keys(streaks) : [];

  // Chart data
  const caloriesData     = rangeData.map((d) => ({ date: d.date, value: d.calories?.calories ?? null }));
  const proteinData      = rangeData.map((d) => ({ date: d.date, value: d.calories?.proteinGrams ?? null }));
  const dsaData          = rangeData.map((d) => ({ date: d.date, value: d.dsa?.problemsSolved ?? null }));
  const dsaMinutesData   = rangeData.map((d) => ({ date: d.date, value: d.dsa?.minutesSpent ?? null }));
  const gymData          = rangeData.map((d) => ({
    date: d.date,
    value: d.gym?.workoutType && d.gym.workoutType !== "REST" ? 1 : 0,
  }));

  // Per-habit completion trend: 1 = done, 0 = not done, null = no entry
  const habitTrendData = habits.map((habitKey, i) => ({
    key: habitKey,
    color: HABIT_COLORS[i % HABIT_COLORS.length],
    data: rangeData.map((d) => ({
      date: d.date,
      value: d._empty ? null : (d.habits?.[habitKey]?.completed ? 1 : 0),
    })),
  }));

  // Total habits completed per day
  const habitsCompletionData = rangeData.map((d) => {
    if (d._empty || !d.habits) return { date: d.date, value: null };
    return { date: d.date, value: Object.values(d.habits).filter((h) => h.completed).length };
  });

  if (loading) return <LoadingScreen />;
  if (error)   return <ErrorScreen message={error} onRetry={refetch} />;

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
        <div className="tc-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <div>
            <h1>Dashboard</h1>
            <p style={{ fontSize: "0.875rem", color: "#8892a4", marginTop: "4px" }}>
              Last {DAYS} days · {user?.name || userId}
            </p>
          </div>
          <button onClick={refetch} style={{
            background: "white", border: "1.5px solid #e2e6f0", borderRadius: "9px",
            padding: "7px 14px", fontSize: "0.8rem", fontWeight: 500,
            color: "#8892a4", cursor: "pointer", marginTop: "6px",
          }}>↻ Refresh</button>
        </div>

        <BodyMetricsSection
          weightHistory={weightHistory}
          bodyFatHistory={bodyFatHistory}
          onLogClick={() => setShowPrompt(true)}
        />

        {/* Streaks — dynamic from user.habitStreaks keys */}
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", color: "#8892a4", marginBottom: "10px",
          }}>Streaks</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px" }}>
            {streakKeys.map((key) => (
              <StreakCard key={key} name={key} data={streaks[key]} />
            ))}
          </div>
        </section>

        {/* Trends */}
        <section>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", color: "#8892a4", marginBottom: "10px",
          }}>Trends</h2>

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
                  }}>{d.gym.workoutType}</span>
                ))}
              </div>
              <BarChart data={gymData} color="#030e4f" label="gym" />
            </ChartCard>

            {/* Habits section — heatmap + per-habit trend lines */}
            <ChartCard title="Habits" icon="✅" subtitle="daily completion grid">
              <HabitsHeatmap rangeData={rangeData} habits={habits} />

              {habits.length > 0 && (
                <>
                  {/* Total per day */}
                  <div style={{ marginTop: "16px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "0.72rem", color: "#8892a4", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                      Total completed per day
                    </span>
                  </div>
                  <LineChart data={habitsCompletionData} color="#059669" label="habits-total" />

                  {/* Per-habit breakdown */}
                  <div style={{ marginTop: "16px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "0.72rem", color: "#8892a4", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                      Per habit (1 = done, 0 = missed)
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {habitTrendData.map(({ key, color, data }) => (
                      <div key={key}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0 }} />
                          <span style={{ fontSize: "0.75rem", color: "#8892a4", fontWeight: 500 }}>
                            {habitIcon(key)} {habitLabel(key)}
                          </span>
                        </div>
                        <LineChart data={data} color={color} label={`habit-${key}`} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </ChartCard>
          </div>
        </section>
      </div>
    </div>
  );
}
