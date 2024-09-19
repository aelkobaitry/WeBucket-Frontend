import { useState } from "react";
import { Modal } from "@mui/material";
import { addUserToBucket } from "../../store/Fetch";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AddUserModal = ({ open, setOpen, bucketID }) => {
  const navigate = useNavigate();
  const [addUsername, setAddUsername] = useState("");

  const handleAddUser = async () => {
    setOpen(false);
    addUserToBucket(bucketID, addUsername, navigate);
    setAddUsername("");
  };

  return (
    <Modal
      open={Boolean(open)}
      onClose={() => setOpen(false)}
      slotProps={{
        sx: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full max-w-md p-4 border-2 border-solid border-mainPurple bg-midnight rounded-xl">
          <input
            placeholder="Enter username"
            className="w-full bg-transparent outline-none text-mainPurple shadow-transparent"
            onChange={(e) => setAddUsername(e.target.value)}
          />
          <div className="flex justify-center mt-4">
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
