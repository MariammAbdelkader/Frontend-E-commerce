import { useState, useEffect } from "react";
import { getAllCustomersInformation } from "./CustomerServices";

const useCustomerPageContainer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const data = await getAllCustomersInformation();
      if (data) {
        setCustomers(data);
      } else {
        setError(data.error);
      }
      setLoading(false);
    };

    fetchCustomers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const filteredCustomers = customers.filter(
  //   (customer) =>
  //     customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     customer.phone.includes(searchTerm)
  // );
  const filteredCustomers = Array.isArray(customers)
    ? customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.includes(searchTerm)
      )
    : [];

  return {
    customers: filteredCustomers,
    loading,
    error,
    searchTerm,
    handleSearchChange,
  };
};

export default useCustomerPageContainer;
