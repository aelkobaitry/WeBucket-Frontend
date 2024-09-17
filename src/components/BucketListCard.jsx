import React, { useState } from "react";
import { Card, IconButton, Modal, Popover } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import plane from "../assets/icons/plane.png";
import dice from "../assets/icons/dice.png";
import pizza from "../assets/icons/pizza.png";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import SettingsModal from "./BucketSettingsModal";
import { addUserToBucket, updateBucket } from "../store/Fetch";
import { useNavigate } from "react-router-dom";

const BucketListCard = React.memo(function ({ bucket, deleteBucketFetch }) {
  const navigate = useNavigate();
  const [bucketContent, setBucketContent] = useState(bucket);
  const [cardTitle, setCardTitle] = useState(bucketContent.title);
  const [cardDescription, setCardDescription] = useState(
    bucketContent.description
  );

  const [bookmarked, setBookmarked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);

  const [deleteChecklist, setDeleteChecklist] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [addUsername, setAddUsername] = useState("");

  const handleModalChange = (e) => {
    if (editTitle) {
      setCardTitle(e.target.value);
    } else {
      setCardDescription(e.target.value);
    }
  };

  const handleClose = () => addUserOpen(false);

  const handleModalClose = async () => {
    let formDetails = {};
    if (cardTitle !== bucketContent.title) {
      formDetails["title"] = cardTitle;
    } else if (cardDescription !== bucketContent.description) {
      formDetails["description"] = cardDescription;
    }
    updateBucket(bucketContent.id, formDetails, setBucketContent, navigate);
    setEditTitle(false);
    setEditDescription(false);
    setAnchorEl(false);
  };

  const handleDeleteChecklist = async () => {
    setDeleteChecklist(false);
    deleteBucketFetch(bucketContent.id);
  };

  const handleAddUser = async () => {
    addUserToBucket(bucketContent.id, addUsername, navigate);
    setAddUserOpen(false);
    setAddUsername("");
  };

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
    //TODO: add to the bookmarked list in the backend
  };

  return (
    <div className="relative">
      <Card class="bg-mainPurple w-[270px] h-[390px] rounded-[30px] m-10">
        <div className="flex justify-between p-2">
          <IconButton
            disableRipple
            disableFocusRipple
            size="small"
            onClick={handleBookmarkClick}
          >
            {bookmarked ? <StarRoundedIcon /> : <StarBorderRoundedIcon />}
          </IconButton>
          <IconButton
            size="small"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(false)}
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
            <SettingsModal
              setEditTitle={setEditTitle}
              setEditDescription={setEditDescription}
              setDeleteChecklist={setDeleteChecklist}
              setAddUserOpen={setAddUserOpen}
            />
          </Popover>
        </div>
        <div className="flex items-center justify-center flex-grow w-full">
          <div className="bg-midnight w-[235px] h-40 rounded-[25px] shadow-custom flex justify-center items-center">
            <img
              src={plane}
              alt="plane icon"
              className="mx-1 w-14 h-14"
              draggable={false}
            />
            <img
              src={dice}
              alt="dice icon"
              className="mx-1 w-14 h-14"
              draggable={false}
            />
            <img
              src={pizza}
              alt="pizza icon"
              className="mx-1 w-14 h-14"
              draggable={false}
            />
          </div>
        </div>
        <h1 className="mt-2 ml-5 mr-4 overflow-hidden text-2xl font-righteous text-midnight line-clamp-1">
          {cardTitle}
        </h1>
        <div className="w-[230px] h-[75px] flex justify-start items-start mx-auto mb-1.5">
          <p className="overflow-hidden font-sans text-midnight line-clamp-3">
            {cardDescription}
          </p>
        </div>
        <div className="flex justify-center">
          <button className="px-6 py-2 mt-1 text-sm transition-transform duration-100 rounded-full bg-midnight text-mainPurple custom-shadow active:scale-95 active:bg-midnight">
            View List
          </button>
        </div>
      </Card>
      <Modal
        open={Boolean(editTitle || editDescription)}
        BackdropProps={{
          sx: {
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-full max-w-md p-4 bg-mainPurple rounded-xl">
            <input
              value={editTitle ? cardTitle : cardDescription}
              className="w-full bg-midnight text-mainPurple"
              onChange={handleModalChange}
            />
            <div className="flex justify-center mt-4">
              <button
                onClick={handleModalClose}
                className="px-6 py-2 text-sm transition-transform duration-100 rounded-full bg-midnight text-mainPurple custom-shadow active:scale-95 active:bg-midnight"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={Boolean(deleteChecklist)}
        BackdropProps={{
          sx: {
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-row justify-center w-full max-w-md p-4 bg-mainPurple rounded-xl">
            Are you sure you want to delete this bucket?
            <button
              onClick={() => setDeleteChecklist(false)}
              className="m-2 text-sm transition-transform duration-100 rounded-full bg-midnight text-mainPurple custom-shadow active:scale-95 active:bg-midnight"
            >
              NO
            </button>
            <button
              onClick={handleDeleteChecklist}
              className="m-2 text-sm transition-transform duration-100 rounded-full bg-midnight text-mainPurple custom-shadow active:scale-95 active:bg-midnight"
            >
              YES
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={Boolean(addUserOpen)}
        onClose={handleClose}
        BackdropProps={{
          sx: {
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-full max-w-md p-4 bg-mainPurple rounded-xl">
            <input
              placeholder="Enter username"
              className="w-full bg-midnight text-mainPurple"
              onChange={(e) => setAddUsername(e.target.value)}
            />
            <div className="flex justify-center mt-4">
              <button
                onClick={handleAddUser}
                className="px-6 py-2 text-sm transition-transform duration-100 rounded-full bg-midnight text-mainPurple custom-shadow active:scale-95 active:bg-midnight"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default BucketListCard;
