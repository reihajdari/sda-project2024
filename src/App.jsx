import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from "react";
import SinglePost from "./screens/SinglePost";
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
      path: "/posts/:postId",
      element: <SinglePost />,
    },
  ]);

  const themeFromLocalStorage = JSON.parse(localStorage.getItem("theme"));

  const checkedThemeFromLocalStorage = themeFromLocalStorage
    ? themeFromLocalStorage
    : "light";

  const [theme, setTheme] = useState(checkedThemeFromLocalStorage);

  const defaultTheme = true;

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
