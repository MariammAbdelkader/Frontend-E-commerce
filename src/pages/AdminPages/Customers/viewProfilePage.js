import React, { useEffect, useState } from "react";
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
import { getCustomerProfile } from "../../../Services/CustomerServices";

const UserProfilePage = () => {
  const { state } = useLocation();
  const { userId } = state || {};

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setError("User ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await getCustomerProfile(userId);
        if (data) {
          setProfile({
            userId: data.userId,
            fullName: `${data.firstName} ${data.lastName}`,
            phone: data.phoneNumber,
            address: data.address,
            gender: data.gender,
            segmentation: data.segment?.SegmentType || "N/A",
          });
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("An error occurred while fetching the profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

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
            src={profile.avatarUrl}
            sx={{ width: 96, height: 96, boxShadow: 2 }}
          />
          <Box>
            <Typography variant="h4" fontWeight={700}>
              {profile.fullName}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 16 }}>
              @{profile.username}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Contact Information */}
        <SectionTitle title="Contact Information" />
        <Grid container spacing={2} mb={4}>
          <ProfileItem label="Email" value={profile.email} />
          <ProfileItem label="Phone Number" value={profile.phone} />
          <ProfileItem label="Address" value={profile.address} />
        </Grid>

        {/* Personal Details */}
        <SectionTitle title="Personal Details" />
        <Grid container spacing={2} mb={4}>
          <ProfileItem label="User ID" value={profile.userId} />
          <ProfileItem label="Gender" value={profile.gender} />
          <ProfileItem label="Segmentation" value={profile.segmentation} />
        </Grid>

        {/* Bio Section */}
        <SectionTitle title="About" />
        <Typography
          sx={{ whiteSpace: "pre-line", color: "#444", fontSize: 15 }}>
          {profile.bio}
        </Typography>
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
