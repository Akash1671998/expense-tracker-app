// src/components/DynamicFormDialog.js

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const DynamicFormDialog = ({
  open,
  columns = [],
  initialData = {},
  onSubmit,
  onCancel,
  title = "Form",
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData, open]);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {columns
            .filter((col) => col.allowForm)
            .map((col) => (
              <Grid item xs={12} key={col.field}>
                <TextField
                  label={col.headerName || col.field}
                  fullWidth
                  value={formData[col.field] || ""}
                  onChange={handleChange(col.field)}
                  variant="outlined"
                />
              </Grid>
            ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}variant="contained" color="error">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="success" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DynamicFormDialog;
