import { useState, useEffect } from "react";
import { getWeightHistory, getBodyFatHistory, postWeight, postBodyFat } from "../services/api";

const STALE_DAYS = 7;

function isStale(dateStr) {
  if (!dateStr) return true;
  const diff = (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24);
  return diff > STALE_DAYS;
}

export function useBodyMetrics(userId) {
  const [weightHistory, setWeightHistory] = useState([]);
  const [bodyFatHistory, setBodyFatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  async function fetchAll() {
    setLoading(true);
    try {
      const [w, b] = await Promise.all([
        getWeightHistory(userId),
        getBodyFatHistory(userId),
      ]);
      setWeightHistory(w || []);
      setBodyFatHistory(b || []);
      const latestWeight = w?.at(-1)?.date;
      const latestFat = b?.at(-1)?.recordedDate;
      if (isStale(latestWeight) || isStale(latestFat)) setShowPrompt(true);
    } catch (e) {
      console.error("Body metrics fetch failed:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { if (userId) fetchAll(); }, [userId]);

  async function submitMetrics(weight, neck, waist) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await Promise.all([
        postWeight(userId, weight),
        postBodyFat(userId, neck, waist),
      ]);
      setShowPrompt(false);
      await fetchAll();
    } catch (e) {
      setSubmitError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return { weightHistory, bodyFatHistory, loading, showPrompt, setShowPrompt, submitting, submitError, submitMetrics };
}