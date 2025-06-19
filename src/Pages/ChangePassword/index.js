import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CTLNotification from "../Notification";
import { application } from "../../authentication/auth";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
    pagename: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.oldPassword)
      newErrors.oldPassword = "Old Password is required";
    if (!formData.newPassword)
      newErrors.newPassword = "New Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);

    const data = {
      email: formData.email,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };

    application
      .post("/auth/changePassword", data)
      .then((response) => {
        setNotify({
          isOpen: true,
          type: "success",
          pagename: "Change Password",
          message: response.data.message || "Password changed successfully",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          type: "error",
          pagename: "Change Password",
          message: error.response?.data?.message || "Something went wrong",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fa",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 450,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Change Password
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Old Password"
            name="oldPassword"
            type="password"
            value={formData.oldPassword}
            onChange={handleChange}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword}
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
            fullWidth
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? "Updating..." : "Change Password"}
          </Button>
        </Box>
        <CTLNotification notify={notify} setNotify={setNotify} />
      </Paper>
    </Box>
  );
};

export default ChangePassword;
