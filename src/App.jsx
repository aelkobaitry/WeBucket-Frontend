import React from "react";
import "./App.css";
import Stars from "./components/Stars";
import IncomingPage from "./components/IncomingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import { RequireToken } from "./Auth";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Stars />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "home",
    element: (
      <>
        <RequireToken>
          <IncomingPage />
          <Stars />
        </RequireToken>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: (
      <>
        <Login />
        <Stars />
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
