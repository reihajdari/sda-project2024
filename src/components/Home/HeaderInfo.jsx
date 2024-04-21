import { useContext, useEffect } from "react";
import { ThemeContext } from "../../App";
import "./HeaderInfo.css"; 

function HeaderInfo() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const style =
    theme === "dark"
      ? { backgroundColor: "#333", color: "#fff" }
      : { backgroundColor: "#f8f9fa", color: "#000" };

  return (
    <div style={style} className={`header-info ${theme}`}>
      <div className="p-5 text-center">
        <h1 className="mb-3">Cinema +</h1>
        <p className="mb-3">Check for your favorite movies!</p>
      </div>
    </div>
  );
}

export default HeaderInfo;
