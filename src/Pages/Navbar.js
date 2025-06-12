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
import { useNavigate, useLocation } from "react-router-dom";
import adminMenu from "../menu/adminMenu";
import userMenu from "../menu/userMenu";

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const UserRole = sessionStorage.getItem("role");
  const UserName = sessionStorage.getItem("loggedInUser");
  const menuItems = UserRole === "ROLE_ADMIN" ? adminMenu : userMenu;
  const currentTab = menuItems.findIndex(
    (item) => item.path === location.pathname
  );
  const handleTabChange = (event, newValue) => {
    navigate(menuItems[newValue].path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("role")
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Tabs
          value={currentTab !== -1 ? currentTab : false}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
        >
          {menuItems.map((item, index) => (
            <Tab
              key={index}
              icon={item.icon}
              label={
                <Typography sx={{ fontWeight: "bold" }}>
                  {item.label}
                </Typography>
              }
            />
          ))}
        </Tabs>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit" onClick={handleLogout}>
            {UserName}
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
