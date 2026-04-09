import { useState, useEffect } from "react";

function buildHabitsState(habitKeys) {
  const habits = {};
  habitKeys.forEach((key) => {
    habits[key] = { completed: false, description: "" };
  });
  return habits;
}

const baseState = {
  dsa: { problemsSolved: "", minutesSpent: "", topic: "", description: "" },
  gym: {
    workoutType: "", cardioDone: false, cardioMinutes: "",
    cardioExercises: "", absDone: false, exercises: [], additionalNotes: "",
  },
  calories: { calories: "", proteinGrams: "", description: "", targetMet: false },
  habits: {},
  notes: "",
};

export function useTimecardForm(initialHabitKeys = []) {
  const [formData, setFormData] = useState({
    ...baseState,
    habits: buildHabitsState(initialHabitKeys),
  });

  // When habits load from API, sync into form without losing entered values
  useEffect(() => {
    setFormData((prev) => {
      const next = { ...buildHabitsState(initialHabitKeys) };
      Object.keys(prev.habits).forEach((k) => {
        if (next[k]) next[k] = prev.habits[k];
      });
      return { ...prev, habits: next };
    });
  }, [initialHabitKeys.join(",")]);

  const handleChange = (section, field, value) =>
    setFormData((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));

  const handleHabitChange = (habit, field, value) =>
    setFormData((prev) => ({
      ...prev,
      habits: { ...prev.habits, [habit]: { ...prev.habits[habit], [field]: value } },
    }));

  // Add a brand new habit key to this session's form only
  const addHabitToForm = (key) => {
    setFormData((prev) => {
      if (prev.habits[key]) return prev; // already exists
      return { ...prev, habits: { ...prev.habits, [key]: { completed: false, description: "" } } };
    });
  };

  const addExercise = () =>
    setFormData((prev) => ({
      ...prev,
      gym: { ...prev.gym, exercises: [...prev.gym.exercises, { name: "", sets: [] }] },
    }));

  const removeExercise = (index) =>
    setFormData((prev) => ({
      ...prev,
      gym: { ...prev.gym, exercises: prev.gym.exercises.filter((_, i) => i !== index) },
    }));

  const addSet = (exerciseIndex) => {
    const exercises = [...formData.gym.exercises];
    exercises[exerciseIndex].sets.push({ reps: "", weight: "" });
    setFormData((prev) => ({ ...prev, gym: { ...prev.gym, exercises } }));
  };

  const removeSet = (exerciseIndex, setIndex) => {
    const exercises = [...formData.gym.exercises];
    exercises[exerciseIndex].sets = exercises[exerciseIndex].sets.filter((_, i) => i !== setIndex);
    setFormData((prev) => ({ ...prev, gym: { ...prev.gym, exercises } }));
  };

  const updateExercise = (index, value) => {
    const exercises = [...formData.gym.exercises];
    exercises[index].name = value;
    setFormData((prev) => ({ ...prev, gym: { ...prev.gym, exercises } }));
  };

  const updateSet = (exerciseIndex, setIndex, field, value) => {
    const exercises = [...formData.gym.exercises];
    exercises[exerciseIndex].sets[setIndex][field] = value;
    setFormData((prev) => ({ ...prev, gym: { ...prev.gym, exercises } }));
  };

  const setNotes = (value) =>
    setFormData((prev) => ({ ...prev, notes: value }));

  return {
    formData, handleChange, handleHabitChange, addHabitToForm,
    addExercise, removeExercise, addSet, removeSet,
    updateExercise, updateSet, setNotes,
  };
}
