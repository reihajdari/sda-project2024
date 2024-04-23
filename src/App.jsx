import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from "react";
import SinglePost from "./screens/SinglePost";
import Home from "./screens/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import UserScreen from "./screens/UserScreen";


export const client = new QueryClient();
export const ThemeContext = createContext();


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/posts/:postId",
      element: <SinglePost />,
    },
    {
      path: "/user",
      element: <UserScreen />,
    },
  ]);
    const [favorites, setFavorites] = useState([]);

  const themeFromLocalStorage = JSON.parse(localStorage.getItem("theme"));
  

  const checkedThemeFromLocalStorage = themeFromLocalStorage
    ? themeFromLocalStorage
    : "light";

  const [theme, setTheme] = useState(checkedThemeFromLocalStorage);

  

  const defaultTheme = "dark";
  localStorage.setItem("theme", JSON.stringify(defaultTheme));
  

  return (
    <QueryClientProvider client={client}>
      <ThemeContext.Provider
        value={{
          theme,
          setTheme,
          favorites,
          setFavorites,
        }}
      >
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
