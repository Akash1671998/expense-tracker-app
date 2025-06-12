
import TableChartIcon from '@mui/icons-material/TableChart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LockResetIcon from '@mui/icons-material/LockReset';

const userMenu = [
  {
    label: 'Expense',
    icon: <TableChartIcon />,
    path: '/expense-table',
  },
  {
    label: 'Add Expense',
    icon: <AddCircleIcon />,
    path: '/add-expense',
  },
  {
    label: 'Change Password',
    icon: <LockResetIcon />,
    path: '/ChangePassword',
  },
];

export default userMenu;
