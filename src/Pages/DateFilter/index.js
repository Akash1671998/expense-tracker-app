// components/ColumnFilter.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

const ColumnFilter = ({
  open,
  onClose,
  onApply,
  filters,
  setFilters,
  columns,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    const cleared = {};
    columns.forEach((col) => {
      if (col.allowFilter && col.dataType === "date") {
        cleared[`${col.field}_from`] = "";
        cleared[`${col.field}_to`] = "";
      }
    });
    setFilters((prev) => ({ ...prev, ...cleared }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Apply Filters</DialogTitle>
      <DialogContent sx={{ minWidth: 400 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {columns
            .filter((col) => col.allowFilter)
            .map((col) =>
              col.dataType === "date" ? (
                <Box key={col.field} sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    fullWidth
                    type="date"
                    label={`From ${col.headerName}`}
                    name={`${col.field}_from`}
                    value={filters[`${col.field}_from`] || ""}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    fullWidth
                    type="date"
                    label={`To ${col.headerName}`}
                    name={`${col.field}_to`}
                    value={filters[`${col.field}_to`] || ""}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
              ) : null
            )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClear} color="info" variant="contained">
          Clear
        </Button>
        <Button onClick={onClose} color="error" variant="contained">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onApply(); // Use this to trigger fetch with current filters
            onClose();
          }}
          color="success"
          variant="contained"
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColumnFilter;
