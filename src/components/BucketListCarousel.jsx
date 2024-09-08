import React, { useRef } from "react";
import BucketListCard from "./BucketListCard";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/carousel/styles.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import { Fab } from "@mui/material";
import { items } from "../constants/MockData";

const BucketListCarousel = () => {
  const data = items;
  const ref = useRef();

  return (
    // <MantineProvider>
    <div class="flex justify-center items-center h-screen w-screen bg-midnight">
      <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          // If you want to use a ref to call the method of StackedCarousel, you cannot set the ref directly on the carousel component
          // This is because ResponsiveContainer will not render the carousel before its parent's width is determined
          // parentWidth is determined after your parent component mounts. Thus if you set the ref directly it will not work since the carousel is not rendered
          // Thus you need to pass your ref object to the ResponsiveContainer as the carouselRef prop and in your render function you will receive this ref object
          let currentVisibleSlide = 5;
        //   if (parentWidth <= 1440) currentVisibleSlide = 3;
        //   if (parentWidth <= 1080) currentVisibleSlide = 1;
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
    </div>
    //  </MantineProvider>
  );
};

export default BucketListCarousel;
