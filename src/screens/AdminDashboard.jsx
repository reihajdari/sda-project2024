import { useContext } from "react";
import AdminHeader from "../components/Admin/AdminHeader";
import AdminReservationPage from "../components/Admin/AdminReservationPage";
import { GlobalContext } from "../App";

function AdminDashboard() {
   const { theme } = useContext(GlobalContext);
   const baseStyle = {
     transition: "all 0.3s",
   };
   const darkStyle = {
     backgroundColor: "#333",
     color: "#fff",
     minHeight: "100vh",
   };
   const lightStyle = {
     backgroundColor: "#f8f9fa",
     color: "#000",
   };

   const currentStyle =
     theme === "dark"
       ? { ...baseStyle, ...darkStyle }
       : { ...baseStyle, ...lightStyle };
  return (
    <div style={currentStyle}>
      <AdminHeader />
      <AdminReservationPage />
    </div>
  );
}

export default AdminDashboard;
