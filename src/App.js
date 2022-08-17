import React, { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import CustomersTable from "./components/CustomersTable";
import ActiveUsersCounter from "./components/ActiveUsersCounter";
import CustomersList from "./components/CustomersList";
import CustomersResource from "./helpers/CustomersResource.js";

const App = () => {
  return (
    <div>
      <React.StrictMode>
        <h1 className="font-bold underline">Indie Users Management App</h1>
        <Link to="/customers">Customers</Link>
        <CustomersResource />
      </React.StrictMode>
    </div>
  );
};

export default App;
