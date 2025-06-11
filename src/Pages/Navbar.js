// src/components/Navbar.js
import React from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  IconButton,
  Typography,
  Box,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import TableChartIcon from "@mui/icons-material/TableChart";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LockResetIcon from "@mui/icons-material/LockReset";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useNavigate, useLocation } from "react-router-dom";

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const pathToTab = {
    "/expense-table": 0,
    "/add-expense": 1,
    "/ChangePassword": 2,
  };

  const tabToPath = ["/expense-table", "/add-expense", "/ChangePassword"];

  const currentTab = pathToTab[location.pathname] ?? false;

  const handleTabChange = (event, newValue) => {
    navigate(tabToPath[newValue]);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab
            icon={<TableChartIcon />}
            label={<Typography sx={{ fontWeight: "bold" }}>Expense</Typography>}
          />
          <Tab
            icon={<AddCircleIcon />}
            label={
              <Typography sx={{ fontWeight: "bold" }}>Add Expense</Typography>
            }
          />
          <Tab
            icon={<LockResetIcon />}
            label={
              <Typography sx={{ fontWeight: "bold" }}>
                Change Password
              </Typography>
            }
          />
        </Tabs>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit" onClick={handleLogout}>
            <AccountCircleIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
