import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { APIUrl, handleError, handleSuccess } from "../utils";
import loginIllustration from "../Images/Expense.svg";

function Login({ setIsAuthenticated }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const url = `${APIUrl}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;
      const jwtToken = result.data?.token;
      const name = result.data?.name;
      const role = result.data.role;

      if (success) {
        setIsAuthenticated(true);
        handleSuccess(message);
        sessionStorage.setItem("token", jwtToken);
        sessionStorage.setItem("loggedInUser", name);
        sessionStorage.setItem("role", role);
        setTimeout(() => {
          navigate("/expense-table");
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || "Login failed");
    }
  };
  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Grid
        item
        xs={false}
        sm={6}
        sx={{
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          p: 4,
          boxShadow: 3,
          borderRadius: "0 20px 20px 0",
        }}
      >
        <img
          src={loginIllustration}
          alt="Finance illustration"
          style={{ maxWidth: "80%", height: "auto" }}
        />
        <Typography variant="h5" sx={{ mt: 2, color: "#555", fontWeight: 500 }}>
          Manage Your Expenses Smartly
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, color: "#888", textAlign: "center", maxWidth: 300 }}
        >
          Track every penny. Plan your budget. Make smarter financial decisions.
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 4,
          borderRadius: "20px 0 0 20px",
        }}
      >
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            width: "100%",
            maxWidth: 400,
            backgroundColor: "white",
            borderRadius: 2,
            p: 4,
            boxShadow: 4,
          }}
          noValidate
        >
          <img
            src={loginIllustration}
            alt="Expense Logo"
            style={{ width: "80px", marginBottom: "20px" }}
          />
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#666", mb: 2, fontWeight: "bold" }}
          >
            Please login to your account
          </Typography>
          <TextField
            fullWidth
            size="small"
            label="Email"
            name="email"
            type="email"
            value={loginInfo.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            size="small"
            label="Password"
            name="password"
            type="password"
            value={loginInfo.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2, py: 1 }}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                    color: "#1976d2",
                    fontWeight: 500,
                  }}
                >
                  Signup
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <ToastContainer />
    </Grid>
  );
}

export default Login;
