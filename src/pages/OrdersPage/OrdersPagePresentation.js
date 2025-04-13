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
} from "@mui/material";
import styles from "./OrdersPageStyles"; // Import styles

const orders = [
  {
    code: "#001",
    status: "Paid",
    customer: {
      name: "Mohamed F.",
      email: "mohamed@example.com",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    quantity: 3,
    cost: "300$",
    type: "top",
  },
  {
    code: "#002",
    status: "Pending",
    customer: {
      name: "Layla K.",
      email: "layla@example.com",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    quantity: 2,
    cost: "150$",
    type: "latest",
  },
  {
    code: "#003",
    status: "Shipped",
    customer: {
      name: "Ahmed N.",
      email: "ahmed@example.com",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    quantity: 7,
    cost: "500$",
    type: "top",
  },
  {
    code: "#004",
    status: "Paid",
    customer: {
      name: "Sara M.",
      email: "sara@example.com",
      avatar: "https://randomuser.me/api/portraits/women/46.jpg",
    },
    quantity: 1,
    cost: "75$",
    type: "latest",
  },
  {
    code: "#002",
    status: "Pending",
    customer: {
      name: "Layla K.",
      email: "layla@example.com",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    quantity: 2,
    cost: "150$",
    type: "latest",
  },
  {
    code: "#003",
    status: "Shipped",
    customer: {
      name: "Ahmed N.",
      email: "ahmed@example.com",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    quantity: 7,
    cost: "500$",
    type: "top",
  },
  {
    code: "#004",
    status: "Paid",
    customer: {
      name: "Sara M.",
      email: "sara@example.com",
      avatar: "https://randomuser.me/api/portraits/women/46.jpg",
    },
    quantity: 1,
    cost: "75$",
    type: "latest",
  },
];

const OrderDetailsPage = () => {
  const [filter, setFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");

  const handleFilterChange = (_, newFilter) => {
    if (newFilter !== null) setFilter(newFilter);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(search.toLowerCase()) ||
      order.code.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" || order.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.heading}>
        Order Details
      </Typography>
      <Typography variant="subtitle1" sx={styles.subtitle}>
        Review and manage Recent orders
      </Typography>

      <Stack sx={styles.filterRow}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          sx={styles.toggleButtonGroup}>
          <ToggleButton value="all">View All</ToggleButton>
          <ToggleButton value="top">Top Orders</ToggleButton>
          <ToggleButton value="latest">Latest Orders</ToggleButton>
        </ToggleButtonGroup>

        <TextField
          placeholder="Search for orders..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={styles.searchInput}
          InputProps={{
            style: { borderRadius: 25 },
          }}
        />
      </Stack>

      <Box sx={styles.outerScrollBox}>
        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={styles.tableHeadRow}>
                {[
                  "Order code",
                  "Status",
                  "Customer",
                  "Quantity",
                  "Cost",
                  "Details",
                ].map((header) => (
                  <TableCell key={header} sx={styles.tableCellHeader}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.code}</TableCell>
                  <TableCell sx={styles.statusCell}>{order.status}</TableCell>
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
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.cost}</TableCell>
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
    </Box>
  );
};

export default OrderDetailsPage;
