import { useState, useEffect, useCallback } from "react";
import { getAllOrder } from "../../../Services/OrderServices";

const useOrdersPageContainer = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

  

    try {
        const filters = {
          filter,
          search,
      };

      const data = await getAllOrder(filters);
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
  }, [filter, search]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleFilterChange = (_, newFilter) => {
    if (newFilter !== null) setFilter(newFilter);
  };



  return {
    orders,
    loading,
    error,
    filter,
    search,
    setSearch,
    handleFilterChange,
  };
};

export default useOrdersPageContainer;
