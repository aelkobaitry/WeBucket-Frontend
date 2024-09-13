import React from "react";
import { Card, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import plane from "../assets/icons/plane.png";
import dice from "../assets/icons/dice.png";
import pizza from "../assets/icons/pizza.png";

const CreateNewCard = () => {
  return (
    <div class="relative opacity-50">
      <Card class="bg-mainPurple w-[270px] h-[390px] rounded-[30px] m-10">
        <div class="flex justify-between p-2">
          <IconButton
            disableRipple
            disableFocusRipple
            size="small"
            disabled
          >
            <StarBorderRoundedIcon />
          </IconButton>
          <IconButton size="small" disabled>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div class="flex-grow flex justify-center items-center w-full">
          <div class="bg-midnight w-[235px] h-40 rounded-[25px] shadow-custom flex justify-center items-center">
            <img
              src={plane}
              alt="plane icon"
              class="w-14 h-14 mx-1"
              draggable={false}
            />
            <img
              src={dice}
              alt="dice icon"
              class="w-14 h-14 mx-1"
              draggable={false}
            />
            <img
              src={pizza}
              alt="pizza icon"
              class="w-14 h-14 mx-1"
              draggable={false}
            />
          </div>
        </div>
        <h1 class="text-2xl font-righteous text-midnight ml-5 mt-2 overflow-hidden line-clamp-1 mr-4">
          New List Title
        </h1>
        <div class="w-[230px] h-[75px] flex justify-start items-start mx-auto mb-1.5">
          <p class="text-midnight font-sans overflow-hidden line-clamp-3">
            Add a description...
          </p>
        </div>
        <div class="flex justify-center">
          <button class="bg-midnight text-mainPurple text-sm py-2 px-6 mt-1 rounded-full custom-shadow active:scale-95 active:bg-midnight transition-transform duration-100">
            Create
          </button>
        </div>
      </Card>
    </div>
  );
};

export default CreateNewCard;
