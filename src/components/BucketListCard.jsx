import React, { useState, useRef, useEffect } from "react";
import { Card, IconButton, Modal, Popover } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import plane from "../assets/icons/plane.png";
import dice from "../assets/icons/dice.png";
import pizza from "../assets/icons/pizza.png";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import SettingsModal from "./BucketSettingsModal";

const BucketListCard = ({ title, description }) => {
  const [cardTitle, setCardTitle] = useState(title);
  const [cardDescription, setCardDescription] = useState(description);

  const [bookmarked, setBookmarked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [titleModal, setTitleModal] = useState(false);
  const [descModal, setDescModal] = useState(false);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleModalClose = () => {
    if (titleRef.current) {
      if (titleModal) {
        setCardTitle(titleRef.current.textContent);
      } else if (descModal) {
        setCardDescription(titleRef.current.textContent);
      }
    }
    setTitleModal(false);
    setDescModal(false);
  };

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
  };

  const titleRef = useRef(null);

  const handleInput = () => {
    // Restore the cursor position
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(titleRef.current.childNodes[0], newTitle.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return (
    <div class="relative">
      <Card class="bg-mainPurple w-[270px] h-[390px] rounded-[30px]">
        <div class="flex justify-between p-2">
          <IconButton
            disableRipple
            disableFocusRipple
            size="small"
            onClick={handleBookmarkClick}
          >
            {bookmarked ? <StarRoundedIcon /> : <StarBorderRoundedIcon />}
          </IconButton>
          <IconButton size="small" onClick={handleOpen}>
            <MoreVertIcon />
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            sx={{
              "& .MuiPopover-paper": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            <SettingsModal setTitleModal={setTitleModal} setDescModal={setDescModal} />
          </Popover>
        </div>
        <div class="flex-grow flex justify-center items-center w-full">
          <div class="bg-midnight w-[235px] h-40 rounded-[25px] shadow-custom flex justify-center items-center">
            <img
              src={plane}
              alt="plane icon"
              class="w-14 h-14 mx-1"
              draggable={false}
            />
            <img src={dice} alt="dice icon" class="w-14 h-14 mx-1" draggable={false} />
            <img
              src={pizza}
              alt="pizza icon"
              class="w-14 h-14 mx-1"
              draggable={false}
            />
          </div>
        </div>
        <h1 class="text-2xl text-midnight ml-5 mt-2 overflow-hidden line-clamp-1 mr-4">
          {cardTitle}
        </h1>
        <div class="w-[230px] h-[75px] flex justify-start items-start mx-auto mb-1.5">
          <p class="text-midnight font-sans overflow-hidden line-clamp-3">
            {cardDescription}
          </p>
        </div>
        <div class="flex justify-center">
          <button class="bg-midnight text-mainPurple text-sm py-2 px-6 mt-1 rounded-full custom-shadow active:scale-95 active:bg-midnight transition-transform duration-100">
            View List
          </button>
        </div>
      </Card>
      <Modal
        open={titleModal || descModal}
        onClose={handleModalClose}
        BackdropProps={{
          sx: {
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-md rounded-xl bg-white p-4">
            <div>
              <p
                contentEditable
                onInput={handleInput}
                suppressContentEditableWarning={true}
                class="text-midnight outline-none"
                ref={titleRef}
              >
                {titleModal ? cardTitle : cardDescription}
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleModalClose}
                className="bg-midnight text-mainPurple text-sm py-2 px-6 rounded-full custom-shadow active:scale-95 active:bg-midnight transition-transform duration-100"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BucketListCard;
