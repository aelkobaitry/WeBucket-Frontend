import React, { useRef } from "react";
import BucketListCard from "./BucketListCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import right from "../assets/icons/rightarrow.png";
import left from "../assets/icons/leftarrow.png";

import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import { Fab } from "@mui/material";
import { items } from "../constants/MockData";

const BucketListCarousel = () => {
  const ref = useRef();

  return (
    <div class="flex justify-center items-center h-screen w-screen bg-midnight">
      <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
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
          style={{ position: "absolute", top: "50%", left: 10, zIndex: 10 }}
          size="small"
          color="primary"
          onClick={() => {
            ref.current?.goBack();
          }}
        >
          <img src={left} />{" "}
        </Fab>
        <Fab
          style={{ position: "absolute", top: "50%", right: 10, zIndex: 10 }}
          size="small"
          color="transparent"
          onClick={() => {
            ref.current?.goNext(6);
          }}
        >
          <img src={right} />{" "}
        </Fab>
      </>
    </div>
  );
};

export default BucketListCarousel;
