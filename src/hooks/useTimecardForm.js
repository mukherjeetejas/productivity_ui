import { useState } from "react";

const initialState = {
  dsa: {
    problemsSolved: "",
    minutesSpent: "",
    topic: "",
    description: "",
  },
  gym: {
    workoutType: "",
    cardioDone: false,
    cardioMinutes: "",
    cardioExercises: "",
    absDone: false,
    exercises: [],
    additionalNotes: "",
  },
  calories: {
    calories: "",
    proteinGrams: "",
    description: "",
    targetMet: false,
  },
  habits: {
    meditation: { completed: false, description: "" },
    reading: { completed: false, description: "" },
    noSmoking: { completed: false, description: "" },
    sleepBefore12: { completed: false, description: "" },
  },
  notes: "",
};

export function useTimecardForm() {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleHabitChange = (habit, field, value) => {
    setFormData((prev) => ({
      ...prev,
      habits: {
        ...prev.habits,
        [habit]: { ...prev.habits[habit], [field]: value },
      },
    }));
  };

  const addExercise = () => {
    setFormData((prev) => ({
      ...prev,
      gym: {
        ...prev.gym,
        exercises: [...prev.gym.exercises, { name: "", sets: [] }],
      },
    }));
  };

  const removeExercise = (index) => {
    setFormData((prev) => ({
      ...prev,
      gym: {
        ...prev.gym,
        exercises: prev.gym.exercises.filter((_, i) => i !== index),
      },
    }));
  };

  const addSet = (exerciseIndex) => {
    const exercises = [...formData.gym.exercises];
    exercises[exerciseIndex].sets.push({ reps: "", weight: "" });
    setFormData((prev) => ({ ...prev, gym: { ...prev.gym, exercises } }));
  };

  const removeSet = (exerciseIndex, setIndex) => {
    const exercises = [...formData.gym.exercises];
    exercises[exerciseIndex].sets = exercises[exerciseIndex].sets.filter(
      (_, i) => i !== setIndex
    );
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

  const setNotes = (value) => {
    setFormData((prev) => ({ ...prev, notes: value }));
  };

  return {
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
  };
}
