import React from "react";
import BucketListCard from "./BucketListCard";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { items } from "../constants/MockData";
import CreateNewCard from "./CreateNewCard";
import { MantineProvider } from "@mantine/core";

const BucketListCarousel = () => {
  return (
    <MantineProvider>
      <div className="w-screen h-screen flex items-center justify-center">
        <div class="w-full flex flex-col items-center">
          <h1 class="text-light-purple font-righteous z-10">My Bucket Lists</h1>
          <div class="w-full">
            <Carousel
              slideSize="5%"
              align="center"
              slidesToScroll={1}
              height="29rem"
              slideGap="xs"
              controlsOffset="xl"
              controlSize={30}
              withControls={true}
            >
              {items.map((item, index) => (
                <CarouselSlide>
                  <BucketListCard key={index} data={items} dataIndex={index} />
                </CarouselSlide>
              ))}
              <CarouselSlide>
                <CreateNewCard />
              </CarouselSlide>
            </Carousel>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
};

export default BucketListCarousel;
