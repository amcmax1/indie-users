import { Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1 className="font-bold underline">Indie Users Management App</h1>
      <Link to="/customers">Customers</Link>
    </div>
  );
};

export default App;
