import { useCustomerContext } from ".././customer-context";

function ActiveUsersCounter() {
  const {
    state: { activeUsersCount },
  } = useCustomerContext();
  console.log("Rendered activeUserCount", activeUsersCount);
  return <div>Active Customers: {activeUsersCount}</div>;
}

export { ActiveUsersCounter };
