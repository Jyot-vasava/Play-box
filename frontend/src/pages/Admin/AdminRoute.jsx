import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <div className="flex">
      {/* Sidebar with fixed width */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  ) : (
    
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;