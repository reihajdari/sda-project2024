import Cards from "../components/Home/Cards";
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import { createContext, useContext, useEffect, useState } from "react";
export const SearchContext = createContext();
import { GlobalContext } from "../App";

function Home() {
  const { theme } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const style =
    theme === "dark"
      ? { backgroundColor: "#222", color: "black", minHeight: "100vh" }
      : { backgroundColor: "white", color: "white", minHeight:"100vh" };

  return (
    <div style={style} className="movie-list">
      <SearchContext.Provider
        value={{
          searchTerm,
          setSearchTerm,
        }}
      >
        <Header />
        <Cards />
        <Footer />
      </SearchContext.Provider>
    </div>
  );
}

export default Home;
