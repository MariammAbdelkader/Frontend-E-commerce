import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
} from "@mui/material";
import styles from "./OrdersPageStyles";
import useOrdersPageContainer from "./OrdersPageContainer";

const OrderDetailsPage = () => {
  const {
    orders,
    loading,
    error,
    ordering,
    handleFilterChange,
  } = useOrdersPageContainer();

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.heading}>
        Order Details
      </Typography>
      <Typography variant="subtitle1" sx={styles.subtitle}>
        Review and manage recent orders
      </Typography>

      <Stack sx={styles.filterRow}>
        <ToggleButtonGroup
          value={ordering}
          exclusive
          onChange={handleFilterChange}
          sx={styles.toggleButtonGroup}>
          <ToggleButton sx={styles.toggleButton} value="orderDate">
            Date
          </ToggleButton>
          <ToggleButton sx={styles.toggleButton} value="totalAmount">
            totalAmount
          </ToggleButton>
    
        </ToggleButtonGroup>

       
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box sx={styles.outerScrollBox}>
          <TableContainer component={Paper} sx={styles.tableContainer}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={styles.tableHeadRow}>
                  {[
                    "Order ID",
                    "Payment Status",
                    "Customer",
                    // "Quantity",
                    "Total Amount",
                    "Details",
                  ].map((header) => (
                    <TableCell key={header} sx={styles.tableCellHeader}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>{`#${order.orderId}`}</TableCell>
                    <TableCell sx={styles.statusCell}>
                      {order.paymentStatus}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar src={order.customer.avatar} />
                        <Box>
                          <Typography fontWeight={600}>
                            {order.customer.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {order.customer.email}
                          </Typography>
                        </Box>
                      </Stack> 
                    </TableCell>
                    {/* <TableCell>
                      {order.products.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}
                    </TableCell> */}
                    <TableCell>{`$${order.totalAmount}`}</TableCell>
                    <TableCell>
                      <Button variant="contained" sx={styles.detailsButton}>
                        View details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default OrderDetailsPage;
