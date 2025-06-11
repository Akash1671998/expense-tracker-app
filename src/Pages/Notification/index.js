import React, { useEffect, useRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CTLNotification({ notify, setNotify }) {
  const timerRef = useRef(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setNotify({ ...notify, isOpen: false });
  };

  useEffect(() => {
    if (notify.isOpen) {
      timerRef.current = setTimeout(() => {
        setNotify({ ...notify, isOpen: false });
      }, 3000);
    }

    return () => clearTimeout(timerRef.current);
  }, [notify]);

  // Standard message mapping
  const getMessage = (status) => {
    switch (status) {
      case "OK":
        return "200 OK";
      case 400:
        return "400 Bad Request";
      case 401:
        return "401 Unauthorized";
      case 402:
        return "402 Payment Required";
      case 403:
        return "403 Forbidden";
      case 404:
        return "404 Not Found";
      case 405:
        return "405 Method Not Allowed";
      case 406:
        return "406 Not Acceptable";
      case 407:
        return "407 Proxy Authentication Required";
      case 408:
        return "408 Request Timeout";
      default:
        if (status >= 409 && status <= 699) {
          return "Server Error. Contact the administrator.";
        }
        return typeof status === "boolean" ? status : "Something went wrong.";
    }
  };

  return (
    <Snackbar
      key={notify.message} 
      open={notify.isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={notify.type || "info"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        <strong>{notify.pagename}</strong>
        <br />
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
