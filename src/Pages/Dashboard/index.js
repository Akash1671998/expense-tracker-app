import React from "react";
import { Box, Typography, Paper } from "@mui/material";

function Dashboard() {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const UserRole = sessionStorage.getItem("role");
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ p: 9 }}
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 4,
          backgroundColor: "#ffffff",
          minWidth: 300,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome, {loggedInUser}!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Role: {UserRole}
        </Typography>
        <Typography variant="body1" mt={2}>
          This is your dashboard. Use the navigation above to access your pages.
        </Typography>
      </Paper>
    </Box>
  );
}

export default Dashboard;
