// src/components/UserActions.js
import React from "react";
import { IconButton, Stack } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

const UserActions = ({ row, onEdit, onDelete }) => {
  return (
    <Stack direction="row" spacing={1}>
      {onEdit && (
        <IconButton color="primary" size="small" onClick={() => onEdit(row)}>
          <EditNoteIcon />
        </IconButton>
      )}
      {onDelete && (
        <IconButton color="error" size="small" onClick={() => onDelete(row)}>
          <DeleteIcon />
        </IconButton>
      )}
    </Stack>
  );
};

export default UserActions;
