// src/pages/UserDetails.js
import React from "react";

import { APIUrl } from "../../utils";
import CustomTable from "../Table";

const UserDetails = () => {
  const columns = [
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "role", headerName: "Role" },
  ];

  return (
    <CustomTable
      title="User Details"
      apiUrl={`${APIUrl}/users/list`}
      columns={columns}
    />
  );
};

export default UserDetails;
