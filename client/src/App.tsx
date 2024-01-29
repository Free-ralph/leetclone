import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Snackbar from "./components/Snackbar.tsx";
import Layout from "./pages/layout/Layout.tsx";
import Login from "./pages/Login.tsx";
import Regsiter from "./pages/Regsiter.tsx";
import Home from "./pages/Home.tsx";
import ProblemDetail from "./pages/ProblemDetail.tsx";
import { LoaderPage } from "./components/Loader.tsx";
import ProblemDetialLayout from "./pages/ProblemDetialLayout.tsx";
import useTheme from "./hooks/useTheme.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader() {
      return <LoaderPage />;
    },
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Regsiter />,
      },
    ],
  },
  {
    path: "/problem/:id",
    element: <ProblemDetialLayout />,
    children: [
      {
        path: "",
        element: <ProblemDetail />,
      },
    ],
  },
]);
function App() {
  const { theme } = useTheme();
  return (
    <main className={`${theme}`}>
      <Snackbar />
      <RouterProvider fallbackElement={<LoaderPage />} router={router} />
    </main>
  );
}

export default App;
