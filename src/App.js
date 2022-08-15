import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import CustomersTable from "./components/CustomersTable";
import ActiveUsersCounter from "./components/ActiveUsersCounter";
import Resource from "./helpers/Resource";
const API_URL = "https://run.mocky.io/v3/93a7ac54-14e7-43a0-8a8d-8e3821cf74d0";
import CustomersList from "./components/CustomersList";
const renderLoader = () => <p>Loading</p>;

const DIGEST_API_URL = "";

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
      <h1 className="font-bold underline">Indie Users Management App</h1>
      <Link to="/customers">Customers</Link>
      <Resource
        path={API_URL}
        render={(data) => {
          if (data.loading) return renderLoader;
          return (
            <>
              <CustomersList
                data={data.payload}
                setActiveUsersCount={setActiveUsersCount}
                setUsers={setUsers}
                getTotalActiveUsersCount={getTotalActiveUsersCount}
              />
              <ActiveUsersCounter activeUsersCount={activeUsersCount} />
              <CustomersTable
                users={data.payload}
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
