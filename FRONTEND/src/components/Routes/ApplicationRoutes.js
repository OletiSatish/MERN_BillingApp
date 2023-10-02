import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import DataTable from "../DataTable/DataTable";
import Billing from "../Billing/Billing";
import NewDataForm from "../NewDataItem/NewDataForm";

function ApplicationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/datatable" element={<DataTable />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/newitem" element={<NewDataForm />} />
    </Routes>
  );
}

export default ApplicationRoutes;
