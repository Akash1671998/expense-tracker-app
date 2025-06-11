import React, { useEffect } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Icon,
} from "@mui/material";
export default function DeleteConfirmation({
  confirmDelete,
  onCancel,
  entityName,
  onAgree,
}) {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(confirmDelete);
  }, [confirmDelete]);

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">
        {" "}
        <Icon color="error" style={{ paddingTop: "5px" }} fontSize="large">
          <WarningAmberIcon />
        </Icon>{" "}
        Are you sure you want to delete the selected {entityName}
      </DialogTitle>
      <DialogActions>
        <Button onClick={onCancel}  variant="contained" color="error">
          Disagree
        </Button>
        <Button onClick={onAgree}  variant="contained" color="success" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
