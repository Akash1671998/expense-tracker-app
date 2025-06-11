import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f2f5",
        textAlign: "center",
        p: 2,
      }}
    >
      <img
        src="https://i.imgur.com/qIufhof.png"
        alt="404 Not Found"
        style={{ maxWidth: "500px", width: "100%", marginBottom: 30 }}
      />
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Sorry, the page you're looking for doesn’t exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/home")}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
