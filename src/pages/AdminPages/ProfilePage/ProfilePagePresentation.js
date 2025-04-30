import React, { useState, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Fade,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { styles } from "./ProfilePageStyles";

const ProfilePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showPage, setShowPage] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    setShowPage(true);
  }, []);

  return (
    <Fade in={showPage} timeout={800}>
      <Box sx={styles.pageContainer}>
        <AppBar position="static" elevation={0} sx={styles.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate("/")}
              sx={styles.backButton}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={styles.pageTitle}>
              My Profile
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={styles.mainContent}>
          <Card sx={styles.card}>
            <Box sx={styles.tabsContainer}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                textColor="inherit"
                TabIndicatorProps={{ style: styles.tabIndicator }}>
                <Tab label="Profile Info" sx={styles.tab} />
                <Tab label="Change Password" sx={styles.tab} />
              </Tabs>
            </Box>

            <CardContent sx={styles.cardContent}>
              {tabValue === 0 && (
                <Grid container spacing={4}>
                  <Grid item xs={12} textAlign="center">
                    <Avatar
                      src="https://i.pravatar.cc/150?img=5"
                      sx={styles.avatar}
                    />
                    <Typography variant="h6" sx={styles.avatarName}>
                      Alex Johnson
                    </Typography>
                  </Grid>

                  {[
                    { label: "First Name", value: "Alex" },
                    { label: "Last Name", value: "Johnson" },
                    { label: "Email", value: "alex.j@example.com" },
                    { label: "Phone Number", value: "+1 209 555 0134" },
                  ].map((field, index) => (
                    <Grid key={index} item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label={field.label}
                        defaultValue={field.value}
                        variant="outlined"
                        InputProps={{ sx: styles.inputField }}
                      />
                    </Grid>
                  ))}

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      defaultValue="456 Silicon Valley, CA"
                      variant="outlined"
                      InputProps={{ sx: styles.inputField }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      fullWidth
                      label="Gender"
                      defaultValue="male"
                      variant="outlined"
                      InputProps={{ sx: styles.inputField }}>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      defaultValue="United States"
                      variant="outlined"
                      InputProps={{ sx: styles.inputField }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      multiline
                      rows={4}
                      defaultValue="Building digital experiences with passion and precision."
                      variant="outlined"
                      InputProps={{ sx: styles.inputField }}
                    />
                  </Grid>

                  <Grid item xs={12} textAlign="right">
                    <Button variant="contained" sx={styles.saveButton}>
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              )}

              {tabValue === 1 && (
                <Box maxWidth="sm" mx="auto">
                  <Divider sx={{ my: 4 }} />
                  <Grid container spacing={3}>
                    {[
                      "Current Password",
                      "New Password",
                      "Confirm New Password",
                    ].map((label, index) => (
                      <Grid key={index} item xs={12}>
                        <TextField
                          fullWidth
                          label={label}
                          type="password"
                          variant="outlined"
                          InputProps={{ sx: styles.inputField }}
                        />
                      </Grid>
                    ))}

                    <Grid item xs={12} textAlign="right">
                      <Button
                        variant="contained"
                        sx={styles.updatePasswordButton}>
                        Update Password
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Fade>
  );
};

export default ProfilePage;
