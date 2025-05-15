import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import styles from "./CustomerPageStyles";
import useCustomerPageContainer from "./CustomerPageContainer";

const CustomerList = () => {
  const { customers, loading, error, searchTerm, handleSearchChange } =
    useCustomerPageContainer();
  const navigate = useNavigate();

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
          size="small"
        />
      </Box>

      {loading ? (
        <Box sx={styles.CircularProgressbox}>
          <CircularProgress sx={styles.CircularProgress} />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box sx={styles.filteredCustomerBoxStyle}>
          {customers.map((customer) => (
            <Box key={customer.id || customer.email} sx={styles.cardWrapper}>
              <Card sx={styles.cardStyle}>
                {/* Fixed Top Section */}
                <Box sx={styles.fixedHeader}>
                  <Box sx={styles.boxStyle}>
                    <Avatar
                      src={customer.image}
                      alt={customer.firstName}
                      sx={styles.avatarStyle}
                    />
                    <Box sx={styles.nameAndEmailStyle}>
                      <Typography
                        variant="subtitle1"
                        sx={styles.cardTitleStyle}>
                        {customer.firstName} {customer.lastName}
                      </Typography>
                      <Typography variant="body2" sx={styles.cardTitleStyle}>
                        {customer.email}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Scrollable Content */}
                <CardContent sx={styles.scrollableCardContent}>
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
                    <span style={styles.textStyle}>{customer.phoneNumber}</span>
                  </Typography>
                  <Typography sx={styles.cardContentStyle}>
                    <strong style={styles.strongText}>Address: </strong>
                    <span style={styles.textStyle}>{customer.address}</span>
                  </Typography>
                  <Typography sx={styles.cardContentStyle}>
                    <strong style={styles.strongText}>Segmentation: </strong>
                    <span style={styles.textStyle}>
                      {customer.segmentation || "N/A"}
                    </span>
                  </Typography>
                  <Typography sx={styles.cardContentStyle}>
                    <strong style={styles.strongText}>Gender: </strong>
                    <span style={styles.textStyle}>
                      {customer.gender || "N/A"}
                    </span>
                  </Typography>
                </CardContent>

                {/* Buttons */}
                <Box
                  component="button"
                  onClick={() =>
                    navigate("/viewprofile", {
                      state: { userId: customer.userId },
                    })
                  }
                  sx={styles.viewProfileButton}>
                  View Profile
                </Box>

                <Box
                  component="button"
                  onClick={() =>
                    navigate("/viewhistory", {
                      state: { userId: customer.userId },
                    })
                  }
                  sx={styles.viewHistoryButton}>
                  View History
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CustomerList;
