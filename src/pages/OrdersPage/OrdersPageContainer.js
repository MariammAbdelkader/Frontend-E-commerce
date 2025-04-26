import { useState, useEffect, useCallback } from "react";
import { getAllOrder } from "./OrderServices";

const useOrdersPageContainer = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    const filters = {
      filter,
      search,
    };

    try {
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(search.toLowerCase()) ||
      order.orderId.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" || order.type === filter;

    return matchesSearch && matchesFilter;
  });

  return {
    orders: filteredOrders,
    loading,
    error,
    filter,
    search,
    setSearch,
    handleFilterChange,
  };
};

export default useOrdersPageContainer;
