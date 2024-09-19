import { useState } from "react";
import { Modal } from "@mui/material";
import PropTypes from "prop-types";
import { createBucket } from "../../store/Fetch";
import { useNavigate } from "react-router-dom";

const CreateCardModal = ({ open, setOpen, setBuckets }) => {
  const navigate = useNavigate();
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");

  const handleModalClose = async () => {
    await createBucket(newCardTitle, newCardDescription, setBuckets, navigate);
    // TODO: navigate to the new checklist page!!
    setNewCardTitle("");
    setNewCardDescription("");
    setOpen(false);
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
        <div className="w-full max-w-md p-4 border-2 border-solid border-mainPurple bg-midnight rounded-xl">
          <input
            placeholder="Bucket name"
            className="w-full bg-transparent outline-none text-mainPurple shadow-transparent"
            onChange={(e) => setNewCardTitle(e.target.value)}
          />
          <input
            placeholder="Bucket description"
            className="w-full bg-transparent outline-none text-mainPurple shadow-transparent"
            onChange={(e) => setNewCardDescription(e.target.value)}
          />
          <div className="flex justify-center mt-4">
            <button
              onClick={handleModalClose}
              className="px-6 py-2 text-sm transition-transform duration-100 rounded-full border-mainPurple bg-midnight text-mainPurple custom-shadow active:scale-95"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

CreateCardModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setBuckets: PropTypes.func.isRequired,
};

export default CreateCardModal;
