import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Link to="/leads">
        <button>View All Leads</button>
      </Link>
    </div>
  );
};

export default Dashboard;
