// src/menus/AdminMenu.js
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';

const adminMenu = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
  },
  {
    label: 'User Profile',
    icon: <AccountCircleIcon />,
    path: '/user-profile',
  },
  {
    label: 'Change User Password',
    icon: <LockResetIcon />,
    path: '/change-user-password',
  },
];

export default adminMenu;
