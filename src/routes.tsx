import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./views/HomePage";
import NotFoundPage from "./views/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
