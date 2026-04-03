import { useState, useEffect, useCallback } from "react";
import { getStreaks, getRange } from "../services/api";
import { todayStr, daysAgoStr, fillDateRange } from "../utils/dateUtils";

export function useDashboard(userId, days = 7) {
  const [streaks, setStreaks] = useState(null);
  const [rangeData, setRangeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const start = daysAgoStr(days - 1);
      const end = todayStr();
      const [streakRes, rangeRes] = await Promise.all([
        getStreaks(userId),
        getRange(userId, start, end),
      ]);
      setStreaks(streakRes);
      setRangeData(fillDateRange(rangeRes, start, end));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [userId, days]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return { streaks, rangeData, loading, error, refetch: fetchAll };
}
