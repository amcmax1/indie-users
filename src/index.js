import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./routes/customers";
import CustomerDetails from "./routes/customerDetails";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="customers" element={<Customers />} />
        <Route path=":customerId" element={<CustomerDetails />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
