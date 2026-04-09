import { useState, useEffect } from "react";
import { getHabits } from "../services/api";

export const HABIT_ICONS = {
  meditation: "🧘", reading: "📚", noSmoking: "🚭",
  sleepBefore12: "🌙", exercise: "🏃", journaling: "✍️",
  coldShower: "🚿", walking: "🚶", water: "💧", stretching: "🤸",
};

export function habitIcon(key) { return HABIT_ICONS[key] || "⭐"; }

export function habitLabel(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim();
}

export function useHabits(userId) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    getHabits(userId)
      .then((data) => setHabits(data || []))
      .catch(() => setHabits([]))
      .finally(() => setLoading(false));
  }, [userId]);

  return { habits, setHabits, loading };
}
