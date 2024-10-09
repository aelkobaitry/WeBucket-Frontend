import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "@mui/material";
import PropTypes from "prop-types";
import MinorToast from "./MinorToast";

const ViewItemModal = ({ open, item, onClose, newItem, type, onDelete }) => {
  const [newItemTitle, setNewItemTitle] = useState(item.title);
  const [newItemDescription, setNewItemDescription] = useState(
    item.description
  );
  const [newItemLocation, setNewItemLocation] = useState(item.location);

  const handleAddItemComplete = () => {
    if (!newItemTitle) {
      MinorToast("Error!", "Item title cannot be empty");
      return;
    }
    let formDetails = {};
    if (newItemTitle !== item.title) {
      formDetails["title"] = newItemTitle;
    }
    if (newItemDescription !== item.description) {
      formDetails["description"] = newItemDescription;
    }
    if (newItemLocation !== item.location) {
      formDetails["location"] = newItemLocation;
    }
    if (newItem) {
      setNewItemTitle("");
      setNewItemDescription("");
      setNewItemLocation("");
    }
    onClose(formDetails);
  };

  const handleExitModal = () => {
    if (newItem) {
      setNewItemTitle("");
      setNewItemDescription("");
      setNewItemLocation("");
    } else {
      setNewItemTitle(item.title);
      setNewItemDescription(item.description);
      setNewItemLocation(item.location);
    }
    onClose();
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
        <div className="flex flex-col justify-center w-full max-w-lg p-4 text-center border-2 border-solid border-mainPurple bg-midnight rounded-xl text-mainPurple">
          <input
            placeholder="Title (Required)"
            value={newItemTitle ? newItemTitle : ""}
            className="w-full bg-transparent outline-none text-mainPurple shadow-transparent"
            onChange={(e) => setNewItemTitle(e.target.value)}
          />
          <input
            placeholder="Description"
            value={newItemDescription ? newItemDescription : ""}
            className="w-full bg-transparent outline-none text-mainPurple shadow-transparent"
            onChange={(e) => setNewItemDescription(e.target.value)}
          />
          <input
            placeholder="Location"
            value={newItemLocation ? newItemLocation : ""}
            className="w-full bg-transparent outline-none text-mainPurple shadow-transparent"
            onChange={(e) => setNewItemLocation(e.target.value)}
          />
          <div
            className={`items-center justify-between mt-4 ${!newItem ? "flex" : ""}`}
          >
            <div>
              <button
                onClick={handleExitModal}
                className="px-6 py-2 mr-4 text-sm transition-transform duration-100 rounded-full border-mainPurple bg-midnight text-mainPurple custom-shadow active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItemComplete}
                className="px-6 py-2 text-sm transition-transform duration-100 rounded-full border-mainPurple bg-midnight text-mainPurple custom-shadow active:scale-95"
              >
                {newItem ? "Add new item" : "Done"}
              </button>
            </div>
            {newItem ? null : (
              <DeleteIcon
                onClick={onDelete}
                fontSize="large"
                className="transition-transform duration-100 cursor-pointer text-mainPurple active:scale-95 hover:scale-110"
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

ViewItemModal.propTypes = {
  open: PropTypes.bool.isRequired,
  //   title: PropTypes.string.isRequired,
  //   location: PropTypes.string,
  //   description: PropTypes.string,
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  newItem: PropTypes.bool,
  type: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default ViewItemModal;
