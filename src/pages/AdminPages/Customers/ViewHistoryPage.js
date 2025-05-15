import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { getCustomerHistory } from "../../../Services/CustomerServices";

const primaryColor = "#1b0099";
const white = "#ffffff";

const sectionStyle = {
  backgroundColor: white,
  borderRadius: "12px",
  padding: "16px",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  marginBottom: "24px",
};

const headerTextStyle = {
  color: primaryColor,
  fontWeight: "bold",
  marginBottom: "8px",
};

const tableHeadCellStyle = {
  backgroundColor: primaryColor,
  color: white,
  fontWeight: "bold",
};

const CustomerHistoryPage = () => {
  const { state } = useLocation();
  const userId = state?.userId;

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

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // Helper to format time (HH:mm)
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Group items by date string
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

  // Grouped data for each section
  const groupedOrders = groupByDate(history.orders, "orderDate");
  const groupedReturns = groupByDate(history.returns, "returnDate");
  const groupedActivities = groupByDate(history.activities, "ActivityDate");

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9ff", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: primaryColor, fontWeight: "bold" }}>
        View Customer History
      </Typography>

      {/* Orders */}
      {history.orders.length > 0 && (
        <Box sx={sectionStyle}>
          <Typography variant="h6" sx={headerTextStyle}>
            Order History
          </Typography>
          {Object.entries(groupedOrders).map(([date, ordersForDate]) => (
            <Box key={date} sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1, color: primaryColor }}>
                Order Date: {date}
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={tableHeadCellStyle}>Order ID</TableCell>
                      <TableCell sx={tableHeadCellStyle}>Order Time</TableCell>
                      <TableCell sx={tableHeadCellStyle}>
                        Total Amount
                      </TableCell>
                      <TableCell sx={tableHeadCellStyle}>
                        Payment Status
                      </TableCell>
                      <TableCell sx={tableHeadCellStyle}>Products</TableCell>
                    </TableRow>
                  </TableHead>
                  {/* Orders */}
                  <TableBody>
                    {ordersForDate.map((order, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{order.orderId}</TableCell>
                        <TableCell>{formatTime(order.orderDate)}</TableCell>
                        <TableCell>{order.totalAmount}</TableCell>
                        <TableCell>{order.paymentStatus}</TableCell>
                        <TableCell>
                          <ul>
                            {order.products.map((product, pIdx) => (
                              <li key={pIdx}>
                                {product.name} - {product.quantity} x{" "}
                                {product.price}
                              </li>
                            ))}
                          </ul>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}
        </Box>
      )}

      {/* Returns */}
      {history.returns.length > 0 && (
        <Box sx={sectionStyle}>
          <Typography variant="h6" sx={headerTextStyle}>
            Return History
          </Typography>
          {Object.entries(groupedReturns).map(([date, returnsForDate]) => (
            <Box key={date} sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1, color: primaryColor }}>
                Return Date: {date}
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={tableHeadCellStyle}>Return Time</TableCell>
                      <TableCell sx={tableHeadCellStyle}>
                        Return Reason
                      </TableCell>
                      <TableCell sx={tableHeadCellStyle}>
                        Refund Amount
                      </TableCell>
                      <TableCell sx={tableHeadCellStyle}>Product</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {returnsForDate.map((returnItem, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          {formatTime(returnItem.returnDate)}
                        </TableCell>
                        <TableCell>{returnItem.returnReason}</TableCell>
                        <TableCell>{returnItem.refundAmount}</TableCell>
                        <TableCell>
                          {returnItem.product?.name || "No Product"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}
        </Box>
      )}

      {/* Activities */}
      {history.activities.length > 0 && (
        <Box sx={sectionStyle}>
          <Typography variant="h6" sx={headerTextStyle}>
            Activity History
          </Typography>
          {Object.entries(groupedActivities).map(
            ([date, activitiesForDate]) => (
              <Box key={date} sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1, color: primaryColor }}>
                  Activity Date: {date}
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={tableHeadCellStyle}>
                          Activity Time
                        </TableCell>
                        <TableCell sx={tableHeadCellStyle}>
                          Activity Type
                        </TableCell>
                        <TableCell sx={tableHeadCellStyle}>
                          Description
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {activitiesForDate.map((activity, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            {formatTime(activity.ActivityDate)}
                          </TableCell>
                          <TableCell>{activity.ActivityType}</TableCell>
                          <TableCell>{activity.Description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )
          )}
        </Box>
      )}

      {/* No History Message */}
      {history.orders.length === 0 &&
        history.returns.length === 0 &&
        history.activities.length === 0 && (
          <Typography>No history available for this customer.</Typography>
        )}
    </Box>
  );
};

export default CustomerHistoryPage;
