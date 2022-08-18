import React, { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import CustomersResource from "./helpers/CustomersResource.js";
import { CustomerProvider } from "./customer-context";

const App = () => {
  return (
    <div>
      <React.StrictMode>
        <h1 className="font-bold underline">Indie Users Management App</h1>
        <Link to="/customers">Customers</Link>
        <CustomerProvider>
          <CustomersResource />
        </CustomerProvider>
      </React.StrictMode>
    </div>
  );
};

export default App;
