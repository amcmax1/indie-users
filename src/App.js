import React, { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import CustomersTable from "./components/CustomersTable";
import ActiveUsersCounter from "./components/ActiveUsersCounter";
import CustomersList from "./components/CustomersList";
import CustomersResource from "./helpers/CustomersResource.js";

const App = () => {
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
    <div>
      <React.StrictMode>
        <h1 className="font-bold underline">Indie Users Management App</h1>
        <Link to="/customers">Customers</Link>
        <CustomersResource>
          <ActiveUsersCounter activeUsersCount={activeUsersCount} />
          <CustomersTable
            users={users}
            bubbleUpdatedUser={bubbleUpdatedUser}
            setUsers={setUsers}
          />
        </CustomersResource>
      </React.StrictMode>
    </div>
  );
};

export default App;
