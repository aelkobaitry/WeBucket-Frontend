import "./App.css";
import Stars from "./components/Stars";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import { RequireToken } from "./store/Auth";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import RootPage from "./pages/RootPage";
import { Toaster } from "react-hot-toast";
import BucketPage from "./pages/BucketPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <RootPage />
        <Stars />
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
      <>
        <LoginPage />
        <Stars />
        <Toaster />
      </>
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
