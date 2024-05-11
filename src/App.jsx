import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from "react";
import SinglePost from "./screens/SinglePost";
import Home from "./screens/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import UserScreen from "./screens/UserScreen";
import Reservations from "./screens/Reservations";
import AdminDashboard from "./screens/AdminDashboard";
import Unauthorized from "./screens/Unauthorized";

export const client = new QueryClient();
export const GlobalContext = createContext();

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
    {
      path: "/reservations",
      element: <Reservations />,
    },
    {
      path: "/admindashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />,
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
      <GlobalContext.Provider
        value={{
          theme,
          setTheme,
          favorites,
          setFavorites,
        }}
      >
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
