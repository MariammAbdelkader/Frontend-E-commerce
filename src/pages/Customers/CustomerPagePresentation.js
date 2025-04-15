import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  TextField,
} from "@mui/material";
import styles from "./CustomerPageStyles";

const customers = [
  {
    name: "Mohamed F",
    email: "mohamedf@example.com",
    firstName: "Mohamed",
    lastName: "Fareed",
    phone: "011534782155",
    address: "Alsharqia, 10th Of Ramadan",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Sara K",
    email: "sarak@example.com",
    firstName: "Sara",
    lastName: "Khaled",
    phone: "01012345678",
    address: "Cairo, Maadi",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Ahmed M",
    email: "ahmedm@example.com",
    firstName: "Ahmed",
    lastName: "Mohamed",
    phone: "01234567890",
    address: "Alexandria, City Center",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Layla Z",
    email: "laylaz@example.com",
    firstName: "Layla",
    lastName: "Zaki",
    phone: "01124578945",
    address: "Giza, 6th October City",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    name: "Omar E",
    email: "omare@example.com",
    firstName: "Omar",
    lastName: "El-Sayed",
    phone: "01098765432",
    address: "Cairo, Zamalek",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Mohamed F",
    email: "mohamedf@example.com",
    firstName: "Mohamed",
    lastName: "Fareed",
    phone: "011534782155",
    address: "Alsharqia, 10th Of Ramadan",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Sara K",
    email: "sarak@example.com",
    firstName: "Sara",
    lastName: "Khaled",
    phone: "01012345678",
    address: "Cairo, Maadi",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Ahmed M",
    email: "ahmedm@example.com",
    firstName: "Ahmed",
    lastName: "Mohamed",
    phone: "01234567890",
    address: "Alexandria, City Center",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Layla Z",
    email: "laylaz@example.com",
    firstName: "Layla",
    lastName: "Zaki",
    phone: "01124578945",
    address: "Giza, 6th October City",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    name: "Omar E",
    email: "omare@example.com",
    firstName: "Omar",
    lastName: "El-Sayed",
    phone: "01098765432",
    address: "Cairo, Zamalek",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Mohamed F",
    email: "mohamedf@example.com",
    firstName: "Mohamed",
    lastName: "Fareed",
    phone: "011534782155",
    address: "Alsharqia, 10th Of Ramadan",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Sara K",
    email: "sarak@example.com",
    firstName: "Sara",
    lastName: "Khaled",
    phone: "01012345678",
    address: "Cairo, Maadi",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Ahmed M",
    email: "ahmedm@example.com",
    firstName: "Ahmed",
    lastName: "Mohamed",
    phone: "01234567890",
    address: "Alexandria, City Center",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Layla Z",
    email: "laylaz@example.com",
    firstName: "Layla",
    lastName: "Zaki",
    phone: "01124578945",
    address: "Giza, 6th October City",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    name: "Omar E",
    email: "omare@example.com",
    firstName: "Omar",
    lastName: "El-Sayed",
    phone: "01098765432",
    address: "Cairo, Zamalek",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
];

const CustomerCard = ({ customer }) => (
  <Card sx={styles.cardStyle}>
    <CardContent>
      <Box sx={styles.boxStyle}>
        <Avatar
          src={customer.avatar}
          alt={customer.name}
          sx={styles.avatarStyle}
        />
        <Box sx={styles.nameAndEmailStyle}>
          <Typography variant="subtitle1" sx={styles.cardTitleStyle}>
            {customer.name}
          </Typography>
          <Typography variant="body2" sx={styles.cardTitleStyle}>
            {customer.email}
          </Typography>
        </Box>
      </Box>
      <Typography sx={styles.cardContentStyle}>
        <strong style={styles.strongText}>FirstName: </strong>
        <span style={styles.textStyle}>{customer.firstName}</span>
      </Typography>
      <Typography sx={styles.cardContentStyle}>
        <strong style={styles.strongText}>LastName: </strong>
        <span style={styles.textStyle}>{customer.lastName}</span>
      </Typography>
      <Typography sx={styles.cardContentStyle}>
        <strong style={styles.strongText}>Phone: </strong>
        <span style={styles.textStyle}>{customer.phone}</span>
      </Typography>
      <Typography sx={styles.cardContentStyle}>
        <strong style={styles.strongText}>Address: </strong>
        <span style={styles.textStyle}>{customer.address}</span>
      </Typography>
    </CardContent>
  </Card>
);

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    );
  });

  return (
    <Box sx={styles.customerListContainer}>
      <Box sx={styles.customerSearchBox}>
        <Typography variant="h4" sx={styles.headingStyle}>
          My Customers
        </Typography>
        <TextField
          variant="outlined"
          label="Search Customers"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={styles.searchInputStyle}
        />
      </Box>

      <Box sx={styles.filteredCustomerBoxStyle}>
        {filteredCustomers.map((customer, index) => (
          <Box key={index}>
            <CustomerCard customer={customer} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CustomerList;
