import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  TablePagination,
  Box,
  IconButton,
} from "@mui/material";
import { application } from "../../authentication/auth";
import TuneIcon from "@mui/icons-material/Tune";

const CustomTable = ({
  title,
  apiUrl,
  columns,
  searchEnable,
  filterEnable,
  updateList,
  onSearchChange,
  dynamicSearch = false,
}) => {
  const [data, setData] = useState([]);
  const [localSearch, setLocalSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = () => {
    application
      .get(apiUrl)
      .then((response) => {
        setData(response.data.data || []);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl, updateList]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (dynamicSearch) {
      onSearchChange?.(value); // if provided
    } else {
      setLocalSearch(value.toLowerCase());
    }
  };

  const filteredData = !dynamicSearch
    ? data.filter((item) =>
        columns.some((col) =>
          item[col.field]?.toString().toLowerCase().includes(localSearch)
        )
      )
    : data;

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleTuneClick() {
    alert("Filter clicked");
  }

  return (
    <Paper
      elevation={3}
      style={{
        padding: 20,
        marginTop: 20,
        width: "97%",
        maxWidth: "6000px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        {searchEnable && (
          <TextField
            variant="outlined"
            placeholder="Search..."
            onChange={handleSearchChange}
            style={{ width: 300 }}
          />
        )}
        {filterEnable && (
          <IconButton
            onClick={handleTuneClick}
            color="success"
            sx={{ width: 60, height: 60 }}
          >
            <TuneIcon sx={{ fontSize: 36 }} />
          </IconButton>
        )}
      </Box>

      <TableContainer>
        <Table>
          <TableHead style={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>#</TableCell>
              {columns.map((col) => (
                <TableCell key={col.field} style={{ color: "white" }}>
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row._id || index}>
                  <TableCell style={{ fontWeight: "600" }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell
                      key={col.field}
                      style={{ fontWeight: "500", fontSize: "15px" }}
                    >
                      {col.renderCell
                        ? col.renderCell({ row })
                        : row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomTable;
