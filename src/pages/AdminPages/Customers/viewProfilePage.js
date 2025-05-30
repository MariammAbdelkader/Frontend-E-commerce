import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  Typography,
  Grid,
  Stack,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customer = location.state?.customer;

  useEffect(() => {
    if (!customer) {
      navigate("/notfound");
    }
  }, [customer, navigate]);

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: "#f3f6f9", minHeight: "100vh" }}>
      <Card
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: { xs: 3, md: 5 },
          borderRadius: 5,
          boxShadow: 3,
          bgcolor: "#ffffff",
        }}>
        {/* Profile Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            gap: 3,
            mb: 4,
          }}>
          <Avatar
            src={customer?.avatar || ""}
            sx={{ width: 96, height: 96, boxShadow: 2 }}
          />
          <Box>
            <Typography variant="h4" fontWeight={700}>
              {customer.lastName}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 16 }}>
              @{customer.firstName}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Contact Information */}
        <SectionTitle title="Contact Information" />
        <Grid container spacing={2} mb={4}>
          <ProfileItem label="Email" value={customer.email} />
          <ProfileItem label="Phone Number" value={customer.phoneNumber} />
          <ProfileItem label="Address" value={customer.address} />
        </Grid>

        {/* Personal Details */}
        <SectionTitle title="Personal Details" />
        <Grid container spacing={2} mb={4}>
          <ProfileItem label="User ID" value={customer.userId} />
          <ProfileItem label="Gender" value={customer.Gender} />
          <ProfileItem label="Segmentation" value={customer.segmentation} />
        </Grid>
      </Card>
    </Box>
  );
};

const ProfileItem = ({ label, value }) => (
  <Grid item xs={12} sm={6}>
    <Stack spacing={0.5}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        {value || "—"}
      </Typography>
    </Stack>
  </Grid>
);

const SectionTitle = ({ title }) => (
  <Typography
    variant="h6"
    fontWeight={600}
    sx={{ color: "#333", mb: 2, mt: 2 }}>
    {title}
  </Typography>
);

export default UserProfilePage;
