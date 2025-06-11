import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { handleError, handleSuccess } from "../utils";
import { application } from "../authentication/auth";
import { useNavigate } from "react-router-dom";
import CTLNotification from "./Notification";

function ExpenseForm() {
  const [expenseInfo, setExpenseInfo] = useState({
    amount: "",
    text: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
    pagename: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseInfo((prev) => ({ ...prev, [name]: value }));
  };

  function AddTransaction() {
    if (!expenseInfo.amount || !expenseInfo.text) {
      setNotify({
        isOpen: true,
        type: "warning",
        pagename: "Expense Add",
        message: "Please Fill The Information In Text Box",
      });
      return;
    }
    application
      .post("/expense/create", expenseInfo)
      .then((response) => {
        handleSuccess(response?.data.message);
        setExpenseInfo({
          amount: "",
          text: "",
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
          message: error.response.data.message,
        });
      });
  }

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Expense Tracker
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Expense Detail"
            variant="outlined"
            name="text"
            value={expenseInfo.text}
            onChange={handleChange}
            placeholder="Enter your Expense Detail..."
            fullWidth
          />
          <TextField
            label="Amount"
            variant="outlined"
            name="amount"
            type="number"
            value={expenseInfo.amount}
            onChange={handleChange}
            placeholder="Enter your Amount..."
            fullWidth
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            onClick={AddTransaction}
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
