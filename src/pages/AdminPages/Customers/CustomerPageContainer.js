import { useState, useEffect } from "react";
import { getAllCustomersInformation } from "../../../Services/CustomerServices";

const useCustomerPageContainer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [segmentation, setSegmentation] = useState("");

  const SegmentTypes =([
    'VIP', 'Loyal Customer','New Customer','"Frequent Returner','Occasional Buyer',
    'Cart Abandoner','Inactive','Highly Active','Impulse Buyer']);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);

      const result = await getAllCustomersInformation({type: segmentation});
      if (result.success) {
        setCustomers(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchCustomers();
  }, [segmentation]);

 const  handleSlecetSegmentation=(event)=> {
    setSegmentation(event.target.value);
  }

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
    ? customers.filter((customer) => {
        const fullName =
          `${customer.firstName} ${customer.lastName}`.toLowerCase();
        return (
          fullName.includes(searchTerm.toLowerCase()) ||
          (customer.email &&
            customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (customer.phoneNumber && customer.phoneNumber.includes(searchTerm))
        );
      })
    : [];

  return {
    customers: filteredCustomers,
    loading,
    error,
    searchTerm,
    SegmentTypes,
    segmentation,
    handleSearchChange,
    handleSlecetSegmentation,
  };
};

export default useCustomerPageContainer;
