import { useState, useEffect } from "react";
import { getCustomerHistory } from "../../../../Services/CustomerServices";

export const useViewHistoryContainer = (userId) => {
  const [history, setHistory] = useState({
    orders: [],
    returns: [],
    activities: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) {
        setError("No customer ID provided.");
        setLoading(false);
        return;
      }

      try {
        const result = await getCustomerHistory(userId);
        if (result.success === false) {
          setError(result.error || "Failed to fetch data.");
        } else {
          const sortByDateDesc = (arr, key) =>
            [...arr].sort((a, b) => new Date(b[key]) - new Date(a[key]));

          const sortedOrders = sortByDateDesc(result.orders || [], "orderDate");
          const sortedReturns = sortByDateDesc(
            result.returns || [],
            "returnDate"
          );
          const sortedActivities = sortByDateDesc(
            result.activities || [],
            "ActivityDate"
          );

          setHistory({
            orders: sortedOrders,
            returns: sortedReturns,
            activities: sortedActivities,
          });
        }
      } catch (err) {
        console.error("Error fetching history:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const groupByDate = (items, dateKey) => {
    return items.reduce((acc, item) => {
      const dateObj = new Date(item[dateKey]);
      if (isNaN(dateObj)) return acc;

      const dateStr = dateObj.toLocaleDateString("en-GB");
      if (!acc[dateStr]) acc[dateStr] = [];
      acc[dateStr].push(item);
      return acc;
    }, {});
  };

  const groupedOrders = groupByDate(history.orders, "orderDate");
  const groupedReturns = groupByDate(history.returns, "returnDate");
  const groupedActivities = groupByDate(history.activities, "ActivityDate");

  return {
    loading,
    error,
    history,
    groupedOrders,
    groupedReturns,
    groupedActivities,
    formatTime,
  };
};
