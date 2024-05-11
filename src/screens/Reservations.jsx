import { useContext } from "react";
import Reservation from "../components/User/Reservation";
import { GlobalContext } from "../App";
import UserHeader from "../components/User/UserHeader";

function Reservations() {
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
      <UserHeader />
      <Reservation />
    </div>
  );
}

export default Reservations;
