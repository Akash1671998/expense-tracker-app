import React, { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography,
  Box,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Close,
  LockReset as LockResetIcon,
} from "@mui/icons-material";
import { application } from "../../authentication/auth";
import { APIUrl } from "../../utils";
//import logo from "../../Images/logo.png";

const PasswordResetComponent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    // confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [defaultMode, setDefaultMode] = useState(false);

  useEffect(() => {
    application
      .get(`${APIUrl}/users/list`)
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.error("User fetch error:", err));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = () => {
    const data = {
       email: selectedUser,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };
   application
         .post("/auth/changePassword", data)
      .then(() => {})
      .catch(() => {});
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e3f2fd, #f1f8e9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: 1,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: 4,
          boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            textAlign: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            <LockResetIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            {defaultMode
              ? "Set Default Password For User"
              : "Reset User Password"}
          </Typography>
          {defaultMode && (
            <IconButton onClick={() => setDefaultMode(false)} color="error">
              <Close />
            </IconButton>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box display="flex" gap={2} alignItems="center">
          <TextField
            fullWidth
            select
            label="Select User"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            sx={{ mb: 2 }}
          >
            {users &&
              users.map((user) => (
                <MenuItem key={user._id} value={user.email}>
                  {user.name}
                </MenuItem>
              ))}
          </TextField>
        </Box>

        {!defaultMode && (
          <>
            {["oldPassword", "newPassword"].map((field, idx) => {
              const label =
                field === "oldPassword"
                  ? "Old Password"
                  : field === "newPassword"
                  ? "New Password"
                  : "Confirm Password";
              return (
                <TextField
                  key={field}
                  fullWidth
                  name={field}
                  label={label}
                  type={
                    showPassword[field.replace("Password", "")]
                      ? "text"
                      : "password"
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            toggleVisibility(field.replace("Password", ""))
                          }
                        >
                          {showPassword[field.replace("Password", "")] ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              );
            })}
          </>
        )}

        <Box display="flex" justifyContent="space-between" mt={3}>
          {!defaultMode && (
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setDefaultMode(true);
                setFormData({ oldPassword: "", newPassword: "" });
              }}
            >
              Default Password
            </Button>
          )}
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PasswordResetComponent;
