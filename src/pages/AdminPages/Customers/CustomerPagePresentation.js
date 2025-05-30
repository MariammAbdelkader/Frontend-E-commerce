import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Avatar,
  Box,
  TextField,
  CircularProgress,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import styles from "./CustomerPageStyles";
import useCustomerPageContainer from "./CustomerPageContainer";

const CustomerList = () => {
  const {
    customers,
    loading,
    error,
    searchTerm,
    SegmentTypes,
    segmentation,
    handleSearchChange,
    handleSlecetSegmentation,
  } = useCustomerPageContainer();
  const navigate = useNavigate();

  return (
    <Box sx={styles.customerListContainer}>
      <Box sx={styles.customerSearchBox}>
        <Typography variant="h4" sx={styles.headingStyle}>
          Our Customers
        </Typography>

        <FormControl style={styles.formControl} size="small">
          <InputLabel>Segmentation</InputLabel>
          <Select
            name="Segmentation"
            value={segmentation}
            onChange={handleSlecetSegmentation}
            label="Segmentation"
            required>
            {SegmentTypes.map((seg) => (
              <MenuItem value={seg}>{seg}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
                <Box
                  sx={styles.fixedHeader}
                  onClick={() =>
                    navigate("/viewprofile", { state: { customer: customer } })
                  }
                  style={{ cursor: "pointer" }}>
                  <Box
                    sx={{
                      ...styles.boxStyle,
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#1e00ad" },
                    }}>
                    <Avatar
                      src={customer.avatar || ""}
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
                {/* <CardContent sx={styles.scrollableCardContent}>
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
                </CardContent> */}

                {/* Buttons */}
                <Button
                  onClick={() =>
                    navigate("/viewhistory", {
                      state: { userId: customer.userId },
                    })
                  }
                  sx={styles.viewHistoryButton}>
                  View History
                </Button>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CustomerList;
