import { useState, useEffect, useCallback } from "react";
import { getAllOrder } from "../../../Services/OrderServices";
import { Navigate } from "react-router-dom";
const useOrdersPageContainer = () => {
  const [orders, setOrders] = useState([]);
  const [ordering, setOrdering] = useState("totalAmount");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

  

    try {

      const data = await getAllOrder(ordering);
      if (data) {
        setOrders(data);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Error fetching orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [ordering]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleFilterChange = (_, newFilter) => {
    if (newFilter !== null) setOrdering(newFilter);
  };





  return {
    orders,
    loading,
    error,
    ordering,
    handleFilterChange,
  };
};

export default useOrdersPageContainer;
