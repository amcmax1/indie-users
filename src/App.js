import React, { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { CustomerProvider } from "./customer-context";
import { ActiveUsersCounter } from "./components/ActiveUsersCounter";
import CustomersList from "./components/CustomersList";
import Resource from "./helpers/Resource";
const API_URL = "https://run.mocky.io/v3/93a7ac54-14e7-43a0-8a8d-8e3821cf74d0";

const App = () => {
  return (
    <div>
      <React.StrictMode>
        <h1 className="font-bold underline">Indie Users Management App</h1>
        <Link to="/customers">Customers</Link>
        <Resource
          path={API_URL}
          render={(data) => {
            if (data.loading) return "renderLoader";
            return (
              <>
                <CustomerProvider data={data.payload}>
                  <ActiveUsersCounter />
                  <CustomersList />
                </CustomerProvider>
              </>
            );
          }}
        />
      </React.StrictMode>
    </div>
  );
};

export default App;
