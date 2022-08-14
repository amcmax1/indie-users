import { useState } from "react";
import { Link } from "react-router-dom";
import CustomersTable from "./components/CustomersTable";
import ActiveUsersCounter from "./components/ActiveUsersCounter";
import { customersData } from "./data/customersData";
import Resource from "./helpers/Resource";

const API_URL = "https://run.mocky.io/v3/93a7ac54-14e7-43a0-8a8d-8e3821cf74d0";
const DIGEST_API_URL = "";

function getTotalActiveUsersCount(users) {
  let activeUsersCount = users.filter((user) => user.isActive === true).length;
  return activeUsersCount;
}

const App = () => {
  const [users, setUsers] = useState(customersData);
  const [activeUsersCount, setActiveUsersCount] = useState(
    getTotalActiveUsersCount(users)
  );

  function bubbleUpdatedUser(updatedUser) {
    console.log("UPDATED USER", updatedUser);
    setActiveUsersCount(getTotalActiveUsersCount(users));
  }

  return (
    <div>
      <h1 className="font-bold underline">Indie Users Management App</h1>
      <Link to="/customers">Customers</Link>
      <Resource
        path={API_URL}
        render={(data) => {
          if (data.loading) return "Loading";
          return (
            <>
              <ActiveUsersCounter activeUsersCount={activeUsersCount} />
              <CustomersTable
                users={users}
                bubbleUpdatedUser={bubbleUpdatedUser}
                setUsers={setUsers}
              />
            </>
          );
        }}
      />
    </div>
  );
};

export default App;
