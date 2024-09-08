import React from "react";
import "./App.css";
import Stars from "./components/Stars";
import IncomingPage from "./components/IncomingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import { RequireToken } from "./Auth";
import Login from "./components/Login";
import BucketListCarousel from "./components/BucketListCarousel";

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
  // return <RouterProvider router={router} />;
  return (
    <div class="bg-midnight w-screen h-screen flex justify-center items-center">
      <BucketListCarousel/>
    </div>
  );
}

export default App;
