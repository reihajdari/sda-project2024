import Cards from "../components/Home/Cards";
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import { createContext, useState } from "react";
export const SearchContext = createContext();

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
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
  );
}

export default Home;
