import { useTimecardForm } from "../../hooks/useTimecardForm";
import { submitTimecard } from "../../services/timecardService";
import DSASection from "./sections/DSASection";
import GymSection from "./sections/GymSection";
import CaloriesSection from "./sections/CaloriesSection";
import HabitsSection from "./sections/HabitsSection";
import NotesSection from "./sections/NotesSection";

function getDateString() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export default function TimecardForm() {
  const {
    formData,
    handleChange,
    handleHabitChange,
    addExercise,
    removeExercise,
    addSet,
    removeSet,
    updateExercise,
    updateSet,
    setNotes,
  } = useTimecardForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitTimecard("tejasMukherjee", formData);
      alert("Submitted successfully 🚀");
    } catch {
      alert("Submission failed");
    }
  };

  return (
    <div className="tc-page">
      <div className="tc-container">
        {/* Header */}
        <div className="tc-header">
          <h1>Submit Timecard</h1>
          <div className="date-badge">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="1" y="2" width="11" height="10" rx="2" stroke="#8892a4" strokeWidth="1.2"/>
              <path d="M4 1v2M9 1v2" stroke="#8892a4" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M1 5h11" stroke="#8892a4" strokeWidth="1.2"/>
            </svg>
            {getDateString()}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <DSASection
            data={formData.dsa}
            onChange={(field, value) => handleChange("dsa", field, value)}
          />

          <GymSection
            data={formData.gym}
            onChange={(field, value) => handleChange("gym", field, value)}
            addExercise={addExercise}
            removeExercise={removeExercise}
            addSet={addSet}
            removeSet={removeSet}
            updateExercise={updateExercise}
            updateSet={updateSet}
          />

          <CaloriesSection
            data={formData.calories}
            onChange={(field, value) => handleChange("calories", field, value)}
          />

          <HabitsSection
            data={formData.habits}
            onChange={handleHabitChange}
          />

          <NotesSection value={formData.notes} onChange={setNotes} />

          <button type="submit" className="tc-submit">
            Submit Timecard →
          </button>
        </form>
      </div>
    </div>
  );
}
