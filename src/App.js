import { Link } from "react-router-dom";
import CustomersTable from "./components/CustomersTable";

const App = () => {
  return (
    <div>
      <h1 className="font-bold underline">Indie Users Management App</h1>
      <Link to="/customers">Customers</Link>
      <CustomersTable />
    </div>
  );
};

export default App;
