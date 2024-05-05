import { useContext } from "react";
import Login from "../components/User/Login";
import UserHeader from "../components/User/UserHeader";
import { ThemeContext } from "../App";

function UserScreen() {
  const { theme } = useContext(ThemeContext);
  const baseStyle = {
    transition: "all 0.3s",
  };
  const darkStyle = {
    backgroundColor: "#333",
    color: "#fff",
    minHeight: "100vh"
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
      <Login />
    </div>
  );
}

export default UserScreen;
