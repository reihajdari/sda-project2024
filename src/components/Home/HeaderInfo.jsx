import { useContext, useEffect } from "react";
import { ThemeContext } from "../../App";
import "./HeaderInfo.css";

function HeaderInfo() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const baseStyle = {
    transition: "all 0.3s",
  };

  const darkStyle = {
    backgroundColor: "#333",
    color: "#fff",
    
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
    <div style={currentStyle} className={`header-info ${theme}`}>
      <div className="p-5 text-center">
        <h1 className="mb-3" style={{ fontSize: "2rem" }}>
          Cinema +
        </h1>
        <p className="mb-3" style={{ fontSize: "1.2rem" }}>
          Check for your favorite movies!
        </p>
      </div>
    </div>
  );
}

export default HeaderInfo;
