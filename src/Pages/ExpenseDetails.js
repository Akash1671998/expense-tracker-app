import React, { useEffect, useState } from 'react'
import { application } from '../authentication/auth';
import { Box } from '@mui/material';

function ExpenseDetails() {
        const [expenses, setExpenses] = useState([]);
        const [incomeAmt, setIncomeAmt] = useState(0);
        const [expenseAmt, setExpenseAmt] = useState(0);


         function fetchExpenses() {
            application.get("/expense/list").then((response) => {
              console.log("/expense/list/expense/list", response);
              setExpenses(response.data.data);
            });
          }
        
          useEffect(() => {
            fetchExpenses();
          }, []);

          useEffect(() => {
                 const amounts = expenses.map(item => item.amount);
                 const income = amounts.filter(item => item > 0)
                     .reduce((acc, item) => (acc += item), 0);
                 const exp = amounts.filter(item => item < 0)
                     .reduce((acc, item) => (acc += item), 0) * -1;
                 setIncomeAmt(income);
                 setExpenseAmt(exp);
             }, [expenses])
    return (
        <Box sx={{ p: 9 }}>
            <div>
                Your Balance is ₹ {incomeAmt - expenseAmt}
            </div>
            <div className="amounts-container">
                Income
                <span className="income-amount">₹{incomeAmt}</span>
                Expense
                <span className="expense-amount">₹{expenseAmt}</span>
            </div>
        </Box>
    )
}

export default ExpenseDetails