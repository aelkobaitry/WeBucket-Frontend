import "./App.css";
import Stars from "./components/Stars";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import { RequireToken } from "./store/Auth";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import BucketPage from "./pages/BucketPage.jsx";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";

import { RequireEarlyAccessToken } from "./store/EarlyAccess";
import EarlyAccessPage from "./pages/AccessPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <EarlyAccessPage />
        <Stars />
        <Toaster />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "home",
    element: (
      <RequireToken>
        <HomePage />
        <Stars />
        <Toaster />
      </RequireToken>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: (
      <RequireEarlyAccessToken>
        <LoginPage />
        <Stars />
        <Toaster />
      </RequireEarlyAccessToken>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "signup",
    element: (
      <RequireEarlyAccessToken>
        <SignupPage />
        <Stars />
        <Toaster />
      </RequireEarlyAccessToken>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "profile",
    element: (
      <RequireToken>
        <ProfilePage />
        <Stars />
        <Toaster />
      </RequireToken>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "bucket/:bucketID",
    element: (
      <RequireToken>
        <BucketPage />
        <Stars />
        <Toaster />
      </RequireToken>
    ),
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
