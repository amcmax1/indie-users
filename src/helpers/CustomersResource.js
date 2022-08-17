import Resource from "./Resource";
import React, { useState } from "react";
import CustomersList from "../components/CustomersList";
import CustomersTable from "../components/CustomersTable";
import ActiveUsersCounter from "../components/ActiveUsersCounter";

const API_URL = "https://run.mocky.io/v3/93a7ac54-14e7-43a0-8a8d-8e3821cf74d0";

export default function CustomersResource() {
  const [users, setUsers] = useState([]);

  const [activeUsersCount, setActiveUsersCount] = useState(0);

  function getTotalActiveUsersCount(users) {
    let activeUsersCount = users.filter(
      (user) => user.isActive === true
    ).length;
    return activeUsersCount;
  }

  function bubbleUpdatedUser(updatedUser) {
    console.log("UPDATED USER", updatedUser);
    setActiveUsersCount(getTotalActiveUsersCount(users));
  }
  return (
    <Resource
      path={API_URL}
      render={(data) => {
        if (data.loading) return "renderLoader";
        return (
          <>
            <ActiveUsersCounter activeUsersCount={activeUsersCount} />

            <CustomersList rawCustomersData={data.payload}></CustomersList>
          </>
        );
      }}
    />
  );
}
