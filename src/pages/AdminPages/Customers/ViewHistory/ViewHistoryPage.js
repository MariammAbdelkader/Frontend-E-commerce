import React from "react";
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
import { useViewHistoryContainer } from "./ViewHistoryContainer";
import { styles } from "./ViewHistoryStyles";

const CustomerHistoryPage = () => {
  const { state } = useLocation();
  const userId = state?.userId;

  const {
    loading,
    error,
    history,
    groupedOrders,
    groupedReturns,
    groupedActivities,
    formatTime,
  } = useViewHistoryContainer(userId);

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.errorContainer}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.pageWrapper}>
      <Typography variant="h4" gutterBottom sx={styles.pageTitle}>
        View Customer History
      </Typography>

      {/* Orders */}
      {history.orders.length > 0 && (
        <Box sx={styles.section}>
          <Typography variant="h6" sx={styles.sectionHeader}>
            Order History
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.tableHeadCell}>Order Date</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Order ID</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Order Time</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Total Amount</TableCell>
                  <TableCell sx={styles.tableHeadCell}>
                    Payment Status
                  </TableCell>
                  <TableCell sx={styles.tableHeadCell}>Products</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(groupedOrders).map(([date, ordersForDate]) =>
                  ordersForDate.map((order, idx) => (
                    <TableRow key={`${date}-${idx}`}>
                      <TableCell>{date}</TableCell>
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
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Returns */}
      {history.returns.length > 0 && (
        <Box sx={styles.section}>
          <Typography variant="h6" sx={styles.sectionHeader}>
            Return History
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.tableHeadCell}>Return Date</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Return Time</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Return Reason</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Refund Amount</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Product</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(groupedReturns).map(([date, returnsForDate]) =>
                  returnsForDate.map((returnItem, idx) => (
                    <TableRow key={`${date}-${idx}`}>
                      <TableCell>{date}</TableCell>
                      <TableCell>{formatTime(returnItem.returnDate)}</TableCell>
                      <TableCell>{returnItem.returnReason}</TableCell>
                      <TableCell>{returnItem.refundAmount}</TableCell>
                      <TableCell>
                        {returnItem.product?.name || "No Product"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Activities */}
      {history.activities.length > 0 && (
        <Box sx={styles.section}>
          <Typography variant="h6" sx={styles.sectionHeader}>
            Activity History
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={styles.tableHeadCell}>Activity Date</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Activity Time</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Activity Type</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Product</TableCell>
                  <TableCell sx={styles.tableHeadCell}>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(groupedActivities).map(
                  ([date, activitiesForDate]) =>
                    activitiesForDate.map((activity, idx) => (
                      <TableRow key={`${date}-${idx}`}>
                        <TableCell>{date}</TableCell>
                        <TableCell>
                          {formatTime(activity.ActivityDate)}
                        </TableCell>
                        <TableCell>{activity.ActivityType}</TableCell>
                        <TableCell>{activity.product?.name|| ""}</TableCell>

                        <TableCell>{activity.description}</TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* No History */}
      {history.orders.length === 0 &&
        history.returns.length === 0 &&
        history.activities.length === 0 && (
          <Typography>No history available for this customer.</Typography>
        )}
    </Box>
  );
};

export default CustomerHistoryPage;
