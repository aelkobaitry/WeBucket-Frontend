import React from "react";
import "./App.css";
import Stars from "./components/Stars";
import IncomingPage from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import { RequireToken } from "./Auth";
import Login from "./components/Login";
import Profile from "./pages/Profile";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Stars />,
    errorElement: <ErrorPage />,
  },
  {
    path: "home",
    element: (
      <RequireToken>
        <Home />
        <Stars />
      </RequireToken>
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
  {
    path: "profile",
    element: (
      <>
        <RequireToken>
          <Profile />
          <Stars />
        </RequireToken>
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
