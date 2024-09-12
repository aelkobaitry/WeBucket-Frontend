import React from "react";
import "./App.css";
import Stars from "./components/Stars";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import { RequireToken } from "./Auth";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

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
        <HomePage />
        <Stars />
      </RequireToken>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: (
      <>
        <LoginPage />
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
          <ProfilePage />
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
