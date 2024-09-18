import React, { useState, useEffect } from "react";
import BucketListCard from "./BucketListCard";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import CreateNewCard from "./CreateNewCard";
import { MantineProvider } from "@mantine/core";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import { fetchBuckets, deleteBucket } from "../store/Fetch";
import { useNavigate } from "react-router-dom";
import right from "../assets/icons/rightarrow.png";
import left from "../assets/icons/leftarrow.png";

const BucketListCarousel = () => {
  const [buckets, setBuckets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuckets(setBuckets, navigate);
  }, []);

  const handleDeleteChecklist = async (bucketID) => {
    deleteBucket(bucketID, setBuckets, navigate);
  };

  return (
    <MantineProvider>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <h1 className="z-10 text-light-purple font-righteous">
          My Bucket Lists
        </h1>
        <div className="z-10 w-full">
          <Carousel
            slideSize="5%"
            align="center"
            height="29rem"
            slideGap="xs"
            controlsOffset="xl"
            nextControlIcon={
              <img
                src={right}
                alt="right arrow"
                className="w-10 h-10"
                draggable={false}
              />
            }
            previousControlIcon={
              <img
                src={left}
                alt="left arrow"
                className="w-10 h-10"
                draggable={false}
              />
            }
          >
            {buckets.map((bucket, index) => (
              <CarouselSlide key={index}>
                <BucketListCard
                  bucket={bucket}
                  deleteBucketFetch={handleDeleteChecklist}
                />
              </CarouselSlide>
            ))}
            <CarouselSlide>
              <CreateNewCard />
            </CarouselSlide>
          </Carousel>
        </div>
      </div>
    </MantineProvider>
  );
};

export default BucketListCarousel;
