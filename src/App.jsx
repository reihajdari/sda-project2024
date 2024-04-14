import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from "react";
import SinglePost from "./screens/SinglePost";
import Users from "./screens/Users";
import Home from "./screens/Home";
import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line react-refresh/only-export-components
export const client = new QueryClient();
export const ThemeContext = createContext();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/posts/:postId/:userId",
      element: <SinglePost />,
    },
    {
      path: "/users",
      element: <Users />,
    },
  ]);

  const themeFromLocalStorage = JSON.parse(localStorage.getItem("theme"));

  const checkedThemeFromLocalStorage = themeFromLocalStorage
    ? themeFromLocalStorage
    : "light";

  const [theme, setTheme] = useState(checkedThemeFromLocalStorage);

  const defaultTheme = "dark";

  localStorage.setItem("theme", JSON.stringify(defaultTheme));

  return (
    <>
      <QueryClientProvider client={client}>
        <ThemeContext.Provider
          value={{
            theme,
            setTheme,
          }}
        >
          <RouterProvider router={router} />
        </ThemeContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
