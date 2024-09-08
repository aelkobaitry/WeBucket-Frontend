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
  const data = items;
  const ref = useRef();

  return (
    // <MantineProvider>
    <div class="bg-midnight w-screen h-screen flex justify-center items-center">
      <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          // If you want to use a ref to call the method of StackedCarousel, you cannot set the ref directly on the carousel component
          // This is because ResponsiveContainer will not render the carousel before its parent's width is determined
          // parentWidth is determined after your parent component mounts. Thus if you set the ref directly it will not work since the carousel is not rendered
          // Thus you need to pass your ref object to the ResponsiveContainer as the carouselRef prop and in your render function you will receive this ref object
          let currentVisibleSlide = 5;
          if (parentWidth <= 1440) currentVisibleSlide = 3;
          if (parentWidth <= 1080) currentVisibleSlide = 1;
          return (
            <StackedCarousel
              ref={carouselRef}
              slideComponent={BucketListCard}
              slideWidth={parentWidth < 800 ? parentWidth - 40 : 750}
              carouselWidth={parentWidth}
              data={items}
              currentVisibleSlide={currentVisibleSlide}
              maxVisibleSlide={5}
              useGrabCursor
              renderSlide={({ title, description }) => (
                <BucketListCard title={title} description={description} />
              )}
            />
          );
        }}
      />
      <>
        <Fab
          style={{ position: "absolute", top: "40%", left: 10, zIndex: 10 }}
          size="small"
          color="primary"
          onClick={() => {
            ref.current?.goBack();
          }}
        >
          <ArrowBackIcon />
        </Fab>
        <Fab
          style={{ position: "absolute", top: "40%", right: 10, zIndex: 10 }}
          size="small"
          color="primary"
          onClick={() => {
            ref.current?.goNext(6);
          }}
        >
          <ArrowForwardIcon />
        </Fab>
      </>
      {/* <Carousel
        class="w-screen ml-20"
          slideGap=""
          align="center"
          withControls={true}
          controlsOffset="xl"
          slidesToScroll={1}
        >
          <CarouselSlide>
            <BucketListCard
              title="Yodangang"
              description="All the things we have done and all the things we have left to do i am adding
              more things because i have so much more to say"
            />
          </CarouselSlide>
          <CarouselSlide>
            <BucketListCard
              title="hi"
              description="All the things we have done and all the things we have left to do i am adding
              more things because i have so much more to say"
            />
          </CarouselSlide>
          <CarouselSlide>
            <BucketListCard
              title="boo"
              description="All the things we have done and all the things we have left to do i am adding
              more things because i have so much more to say"
            />
          </CarouselSlide>
        </Carousel> */}
    </div>
    //  </MantineProvider>
  );
}

export default App;
