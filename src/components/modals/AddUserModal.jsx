import { useState } from "react";
import { Modal } from "@mui/material";
import { addUserToBucket } from "../../store/Fetch";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AddUserModal = ({ open, setOpen, bucketID }) => {
  const navigate = useNavigate();
  const [addUsername, setAddUsername] = useState("");

  const handleAddUser = async () => {
    if (!addUsername) return;
    setOpen(false);
    addUserToBucket(bucketID, addUsername, navigate);
    setAddUsername("");
  };

  return (
    <Modal
      open={Boolean(open)}
      slotProps={{
        sx: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col justify-center w-full max-w-md p-4 text-center border-2 border-solid border-mainPurple bg-midnight rounded-xl text-mainPurple">
          <input
            placeholder="Enter username"
            className="w-full bg-transparent outline-none text-mainPurple shadow-transparent"
            onChange={(e) => setAddUsername(e.target.value)}
          />
          <div className="flex-row">
            <button
              onClick={() => setOpen(false)}
              className="px-6 py-2 mt-4 mr-4 text-sm transition-transform duration-100 rounded-full border-mainPurple bg-midnight text-mainPurple custom-shadow active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleAddUser}
              className="px-6 py-2 text-sm transition-transform duration-100 rounded-full border-mainPurple bg-midnight text-mainPurple custom-shadow active:scale-95"
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

AddUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  bucketID: PropTypes.string.isRequired,
};

export default AddUserModal;
