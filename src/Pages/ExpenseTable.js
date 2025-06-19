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
import DownloadIcon from "@mui/icons-material/Download";
import CustomTable from "./Table";
import { APIUrl } from "../utils";
import UserActions from "./UserActions";
import DateCell from "./DateCell";
import ColumnFilter from "./DateFilter";

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
  const [searchText, setSearchText] = useState("");

  const buildURL = () => {
    let url = "/expense/list?";
    if (filters.fromDate) url += `fromDate=${filters.fromDate}&`;
    if (filters.toDate) url += `toDate=${filters.toDate}&`;
    if (filters.text || searchText) url += `text=${filters.text || searchText}`;
    return url;
  };
  const dynamicUrl = buildURL();

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
    setSelectedRows(rowId._id);
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

  const columns = [
    { field: "_id", headerName: "ID", flex: 1, allowForm: true },
    {
      field: "createAt",
      headerName: "Date",
      flex: 1,
      allowForm: true,
      allowFilter: true,
      dataType: "date",
      renderCell: (params) => <DateCell value={params.row} />,
    },
    { field: "amount", headerName: "Amount", flex: 1, allowForm: true },
    { field: "text", headerName: "Description", flex: 1, allowForm: true },
    {
      field: "accountType",
      headerName: "Account Type",
      flex: 1,
      allowForm: true,
    },
    { field: "category", headerName: "Category", flex: 1, allowForm: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <UserActions
          row={params.row}
          // onEdit={handleEdit}
          onDelete={deleteRow}
        />
      ),
    },
  ];

  function onClose() {
    setOpenFilterModal(false);
  }

  return (
    <>
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
          <CustomTable
            dynamicSearch={true}
            searchEnable={true}
            filterEnable={true}
            title="Your Expenses"
            apiUrl={dynamicUrl}
            columns={columns}
            updateList={updateList}
            onSearchChange={(val) => setSearchText(val)}
          />
          <ColumnFilter
            open={openFilterModal}
            onClose={onClose}
            onApply={fetchExpenses}
            filters={filters}
            setFilters={setFilters}
            columns={columns}
          />
          <DeleteConfirmation
            entityName="Expense Data"
            confirmDelete={confirmDelete}
            onAgree={DeleteExpens}
            onCancel={onCancel}
          />
        </Box>
      </Box>
    </>
  );
};

export default ExpenseTable;
