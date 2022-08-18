import { useCustomerContext } from ".././customer-context";

export default function ActiveCustomersCounter() {
  const {
    state: { activeUsersCount },
  } = useCustomerContext();
  return <div>Active Customers: {activeUsersCount}</div>;
}
