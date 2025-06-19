import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { handleSuccess } from "../utils";
import { application } from "../authentication/auth";
import CTLNotification from "./Notification";

function ExpenseForm() {
  const [expenseInfo, setExpenseInfo] = useState({
    amount: "",
    text: "",
    category: "",
    accountType: "",
    date: "",
    email: false,
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
    pagename: "",
  });

  const accountTypes = ["Cash", "Online", "Bank Account", "Card"];
  const categories = [
    "Food",
    "Health",
    "Education",
    "Beauty",
    "Travelling",
    "Gift",
    "Other",
  ];

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setExpenseInfo((prev) => ({ ...prev, date: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExpenseInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  function AddTransaction() {
    const { amount, text } = expenseInfo;

    if (!amount || !text) {
      setNotify({
        isOpen: true,
        type: "warning",
        pagename: "Expense Add",
        message: "Please Fill The Required Fields",
      });
      return;
    }

    application
      .post("/expense/create", expenseInfo)
      .then((response) => {
        handleSuccess(response?.data.message);
        const today = new Date().toISOString().split("T")[0];
        setExpenseInfo({
          amount: "",
          text: "",
          category: "",
          accountType: "",
          date: today,
        });
        setNotify({
          isOpen: true,
          type: "success",
          pagename: "Add Expense",
          message: response.data.message,
        });
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          type: "error",
          pagename: "Add Expense",
          message: error.response?.data?.message || "Something went wrong",
        });
      });
  }

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 500,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
       
          <Typography variant="h5" gutterBottom textAlign="center">
            Add New Expense
          </Typography>
         
       

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            label="Date"
            type="date"
            name="date"
            value={expenseInfo.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="account-type-label">Account Type</InputLabel>
            <Select
              labelId="account-type-label"
              name="accountType"
              value={expenseInfo.accountType}
              onChange={handleChange}
              label="Account Type"
            >
              {accountTypes &&
                accountTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={expenseInfo.category}
              onChange={handleChange}
              label="Category"
            >
              {categories &&
                categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={expenseInfo.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            fullWidth
          />
          <TextField
            label="Description"
            name="text"
            value={expenseInfo.text}
            onChange={handleChange}
            placeholder="Write about the expense..."
            multiline
            rows={3}
            fullWidth
          />
           <FormControlLabel
            label="Send Email Notification"
            labelPlacement="start"
            control={
              <Switch
                name="email"
                checked={expenseInfo.email}
                onChange={handleChange}
              />
            }
          />

          <Button
            variant="contained"
            color="primary"
            onClick={AddTransaction}
            sx={{ mt: 1 }}
          >
            Add Expense
          </Button>
        </Box>
        <CTLNotification notify={notify} setNotify={setNotify} />
      </Paper>
    </Box>
  );
}

export default ExpenseForm;
