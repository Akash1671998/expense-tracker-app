import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { application } from "../authentication/auth";
import CTLNotification from "./Notification";
import DeleteConfirmation from "./ConfirmationBox";
import ClearIcon from "@mui/icons-material/Clear";
import DownloadIcon from '@mui/icons-material/Download';

const ExpenseTable = ({ updateList, setUpdateList }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedRows, setSelectedRows] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    text: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
    pagename: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fetchExpenses = () => {
    let url = "/expense/list?";
    if (filters.fromDate) url += `fromDate=${filters.fromDate}&`;
    if (filters.toDate) url += `toDate=${filters.toDate}&`;
    if (filters.text) url += `text=${filters.text}`;

    application.get(url).then((response) => {
      setExpenses(response.data.data || []);
    });
  };

  const deleteRow = (rowId) => {
    setConfirmDelete(true);
    setSelectedRows(rowId);
  };

  const onCancel = () => {
    setConfirmDelete(false);
    setSelectedRows(null);
  };

  const DeleteExpens = () => {
    if (!selectedRows) return;
    application
      .delete(`/expense/delete/${selectedRows}`)
      .then((response) => {
        setNotify({
          isOpen: true,
          type: "success",
          pagename: "Expense Data",
          message: response.data.message,
        });
        setTimeout(() => {
          setUpdateList(Date.now());
        }, 1000);
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          type: "error",
          pagename: "Expense Data",
          message: error.response?.data?.message || "Delete failed",
        });
      });
    setConfirmDelete(false);
    setSelectedRows(null);
  };

  useEffect(() => {
    fetchExpenses();
  }, [updateList]);

  function handleClearSearch() {
    setFilters((prev) => ({ ...prev, text: "" }));
  }
  function ClearFilter() {
    setFilters((prev) => ({ ...prev, fromDate: "", toDate: "" }));
  }


  const downloadCSV = () => {
    let url = "/expense/csv/export?";
    if (filters.fromDate) url += `fromDate=${filters.fromDate}&`;
    if (filters.toDate) url += `toDate=${filters.toDate}&`;
    if (filters.text) url += `text=${filters.text}`;
  
    application
      .get(url, { responseType: "blob" })
      .then((response) => {
        const blob = new Blob([response.data], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "expenses.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          type: "error",
          pagename: "Expense Export",
          message: "CSV Export Failed",
        });
      });
  };
  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Your Expenses
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TextField
            label="Search"
            name="text"
            value={filters.text}
            onChange={handleInputChange}
            placeholder="Search by description"
            sx={{ width: 300 }}
            InputProps={{
              endAdornment: filters.text && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch} edge="end">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            size="large"
            color="success"
            onClick={() => setOpenFilterModal(true)}
            sx={{ p: 1.5 }}
          >
            <TuneIcon sx={{ fontSize: 32 }} />
          </IconButton>
          <IconButton
            size="large"
            color="success"
            onClick={fetchExpenses}
            sx={{ p: 1.5 }}
          >
            <SearchIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {expenses.map((expense) => {
          const date = new Date(expense.createAt || expense.createdAt);
          const formattedDate = isNaN(date.getTime())
            ? "Invalid Date"
            : date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

          return (
            <Grid item xs={12} sm={6} md={4} key={expense._id}>
              <Card
                elevation={4}
                sx={{
                  borderLeft: `4px solid ${
                    expense.amount > 0 ? "#2ecc71" : "#e74c3c"
                  }`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "120px",
                  padding: 1,
                  position: "relative",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" fontSize={30}>
                    {expense.text}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold" color="info">
                    {formattedDate}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    right: 8,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" color="success">
                    RS:{expense.amount}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    color="primary"
                    aria-label="view all"
                    size="small"
                    onClick={() => downloadCSV()}
                  >
                  
                  <DownloadIcon fontSize="small" />
                  </IconButton>


                  <IconButton
                    onClick={() => deleteRow(expense._id)}
                    color="error"
                    aria-label="delete"
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Dialog open={openFilterModal} onClose={() => setOpenFilterModal(false)}>
        <DialogTitle>Filter by Date</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            minWidth: 400,
            minHeight: 100,
          }}
        >
          <TextField
            fullWidth
            label="From Date"
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="To Date"
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ClearFilter} variant="contained" color="info">
            Clear
          </Button>
          <Button onClick={() => setOpenFilterModal(false)} variant="contained" color="error">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpenFilterModal(false);
              fetchExpenses();
            }}
            color="success"
            variant="contained"
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      <DeleteConfirmation
        entityName="Expense Data"
        confirmDelete={confirmDelete}
        onAgree={DeleteExpens}
        onCancel={onCancel}
      />
      <CTLNotification notify={notify} setNotify={setNotify} />
    </Box>
  );
};

export default ExpenseTable;
