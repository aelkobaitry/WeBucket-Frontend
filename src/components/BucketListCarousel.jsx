import React, { useState, useEffect } from "react";
import BucketListCard from "./BucketListCard";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import CreateNewCard from "./CreateNewCard";
import { MantineProvider } from "@mantine/core";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import { fetchToken } from "../store/Auth";

const BucketListCarousel = () => {
  const [buckets, setBuckets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/get_checklists_for_user", {
      method: "GET",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + fetchToken(),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setBuckets(data))
      .catch((error) => {
        if (error.message.startsWith("403")) {
          deleteToken();
          navigate("/login");
        } else {
          console.log("Error code: ", error.message);
        }
      });
  }, []);

  const handleDeleteChecklist = async (bucketID) => {
    const response = await fetch(
      `http://localhost:8000/api/v1/delete_checklist/${bucketID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + fetchToken(),
        },
      }
    );
    if (response.ok) {
      setBuckets(buckets.filter((bucket) => bucket.id !== bucketID));
    }
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
            controlSize={30}
          >
            {buckets.map((bucket, index) => (
              <CarouselSlide key={index}>
                <BucketListCard
                  bucketContent={bucket}
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
