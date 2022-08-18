import Resource from "./Resource";
import React, { useState } from "react";
import CustomersList from "../components/CustomersList";
import ActiveUsersCounter from "../components/ActiveUsersCounter";

const API_URL = "https://run.mocky.io/v3/93a7ac54-14e7-43a0-8a8d-8e3821cf74d0";

export default function CustomersResource() {
  return (
    <Resource
      path={API_URL}
      render={(data) => {
        if (data.loading) return "renderLoader";
        return (
          <>
            <ActiveUsersCounter />
            <CustomersList rawCustomersData={data.payload}></CustomersList>
          </>
        );
      }}
    />
  );
}
