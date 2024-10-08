import { useState } from "react";
import { Avatar, Card, IconButton, Popover } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import plane from "../assets/icons/plane.png";
import dice from "../assets/icons/dice.png";
import pizza from "../assets/icons/pizza.png";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import SettingsModal from "./BucketSettingsModal";
import { updateBucket } from "../store/Fetch";
import { Link, useNavigate } from "react-router-dom";
import avatar2 from "../assets/avatar-test-1.png";
import PropTypes from "prop-types";
import DeleteBucketModal from "./modals/DeleteBucketModal";
import AddUserModal from "./modals/AddUserModal";
import EditTextModal from "./modals/EditTextModal";

function BucketListCard({ bucket, setBuckets }) {
  const navigate = useNavigate();
  const [cardTitle, setCardTitle] = useState(bucket.title);
  const [cardDescription, setCardDescription] = useState(bucket.description);
  const [anchorEl, setAnchorEl] = useState(false);

  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);

  const [showDeleteBucketModal, setShowDeleteBucketModal] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);

  const handleCloseModal = async () => {
    if (!cardTitle) {
      return;
    }
    let formDetails = {};
    if (cardTitle !== bucket.title) {
      formDetails["title"] = cardTitle;
    } else if (cardDescription !== bucket.description) {
      formDetails["description"] = cardDescription;
    }
    if (Object.keys(formDetails).length > 0) {
      await updateBucket(bucket.id, formDetails, setBuckets, navigate);
    }
    setEditTitle(false);
    setEditDescription(false);
    setAnchorEl(false);
  };

  const handleBookmarkClick = () => {
    updateBucket(
      bucket.id,
      { bookmark: !bucket.bookmark },
      setBuckets,
      navigate
    );
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
            {bucket.bookmark ? <StarRoundedIcon /> : <StarBorderRoundedIcon />}
          </IconButton>
          <div className="flex flex-row">
            {bucket.users.map((user, index) => (
              <Avatar
                key={index}
                sx={{
                  position: "absolute",
                  top: 8.5,
                  right: 85 + 20 * index,
                  width: 32,
                  height: 32,
                  zIndex: 100 - index,
                }}
                src={avatar2}
              />
            ))}
            <IconButton
              size="small"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
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
              setDeleteChecklist={setShowDeleteBucketModal}
              setAddUserOpen={setAddUserModalOpen}
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
          <Link to={`/bucket/${bucket.id}`}>
            <button className="px-6 py-2 mt-1 text-sm transition-transform duration-100 rounded-full bg-midnight text-mainPurple custom-shadow active:scale-95 active:bg-midnight">
              View List
            </button>
          </Link>
        </div>
      </Card>
      <EditTextModal
        open={editTitle || editDescription}
        text={editTitle ? cardTitle : cardDescription}
        setText={editTitle ? setCardTitle : setCardDescription}
        handleCloseModal={handleCloseModal}
      />
      <DeleteBucketModal
        open={showDeleteBucketModal}
        setOpen={setShowDeleteBucketModal}
        setAnchorEl={setAnchorEl}
        bucketID={bucket.id}
        setBuckets={setBuckets}
      />
      <AddUserModal
        open={addUserModalOpen}
        setOpen={setAddUserModalOpen}
        bucketID={bucket.id}
      />
    </div>
  );
}

BucketListCard.propTypes = {
  bucket: PropTypes.object.isRequired,
  setBuckets: PropTypes.func.isRequired,
};

export default BucketListCard;
