import { Modal } from "@mui/material";
import PropTypes from "prop-types";

const EditTextModal = ({ open, text, setText, handleCloseModal }) => {
  return (
    <>
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
              value={text}
              className="w-full bg-transparent outline-none text-mainPurple shadow-transparent"
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex justify-center mt-4">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 text-sm transition-transform duration-100 rounded-full border-mainPurple bg-midnight text-mainPurple custom-shadow active:scale-95"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

EditTextModal.propTypes = {
  open: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

export default EditTextModal;
