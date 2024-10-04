import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { Modal, Rating } from "@mui/material";
import PropTypes from "prop-types";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

const ViewCompletedItemModal = ({
  open,
  item,
  onClose,
  onDelete,
  currentUser,
}) => {
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    if (item.comments && item.comments[currentUser.username]) {
      setNewComment(item.comments[currentUser.username]);
    } else {
      setNewComment("");
    }
    if (item.ratings && item.ratings[currentUser.username]) {
      setNewRating(item.ratings[currentUser.username]);
    } else {
      setNewRating(0);
    }
  }, [currentUser, item]);

  const handleUpdateItem = () => {
    let formDetails = {};
    if (newComment !== item.comments[currentUser.username]) {
      formDetails["comment"] = newComment;
    }
    if (newRating !== item.ratings[currentUser.username]) {
      formDetails["score"] = newRating;
    }
    onClose(formDetails);
  };

  return (
    <Modal
      open={Boolean(open)}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col justify-center w-full max-w-lg p-4 text-center border-2 border-solid h-52 border-mainPurple bg-midnight rounded-xl text-mainPurple">
          <Rating
            name="half-rating"
            precision={0.5}
            value={newRating}
            onChange={(event, newValue) => setNewRating(newValue)}
            emptyIcon={
              <StarBorderOutlinedIcon
                sx={{
                  color: "#D48AE0",
                }}
                fontSize="inherit"
              />
            }
            icon={
              <StarIcon
                sx={{
                  color: "#D48AE0",
                }}
                fontSize="inherit"
              />
            }
          />
          <textarea
            placeholder="Your thoughts"
            value={newComment ? newComment : ""}
            className="w-full h-32 mt-2 bg-transparent outline-none resize-none text-mainPurple shadow-transparent"
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className={`items-center justify-between mt-4 flex`}>
            <div>
              <button
                onClick={() => {
                  setNewComment(item.comments[currentUser.username]);
                  onClose();
                }}
                className="px-6 py-2 mr-4 text-sm transition-transform duration-100 rounded-full border-mainPurple bg-midnight text-mainPurple custom-shadow active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateItem}
                className="px-6 py-2 text-sm transition-transform duration-100 rounded-full border-mainPurple bg-midnight text-mainPurple custom-shadow active:scale-95"
              >
                Update item
              </button>
            </div>
            <DeleteIcon
              onClick={onDelete}
              fontSize="large"
              className="transition-transform duration-100 cursor-pointer text-mainPurple active:scale-95 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

ViewCompletedItemModal.propTypes = {
  open: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default ViewCompletedItemModal;
