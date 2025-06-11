import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  function ChangePassword() {
    if (!validate()) return;
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
          pagename: "Expense Data",
          message: error.response?.data?.message || "Something went wrong",
        });
      });
  }

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 10, p: 3, boxShadow: 5 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Change Password
        </Typography>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Old Password"
          name="oldPassword"
          type="password"
          value={formData.oldPassword}
          onChange={handleChange}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword}
          margin="normal"
        />
        <TextField
          fullWidth
          label="New Password"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          error={!!errors.newPassword}
          helperText={errors.newPassword}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
          onClick={ChangePassword}
        >
          Change Password
        </Button>
      </CardContent>
      <CTLNotification notify={notify} setNotify={setNotify} />
    </Card>
  );
};

export default ChangePassword;
