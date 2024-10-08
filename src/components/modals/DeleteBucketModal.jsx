import { Modal } from "@mui/material";
import PropTypes from "prop-types";
import { deleteBucket } from "../../store/Fetch";
import { useNavigate } from "react-router-dom";

const DeleteBucketModal = ({
  open,
  setOpen,
  setAnchorEl,
  bucketID,
  setBuckets,
}) => {
  const navigate = useNavigate();

  const handleDeleteChecklist = async () => {
    deleteBucket(bucketID, setBuckets, navigate);
    setOpen(false);
    setAnchorEl(false);
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
        <div className="flex flex-col justify-center w-full max-w-md p-4 text-center border-2 border-solid border-mainPurple bg-midnight rounded-xl text-mainPurple">
          Are you sure you want to delete this bucket?
          <div className="flex-row">
            <button
              onClick={() => setOpen(false)}
              className="px-6 py-2 mt-4 mr-4 text-sm transition-transform duration-100 rounded-full border-mainPurple bg-midnight text-mainPurple custom-shadow active:scale-95"
            >
              NO
            </button>
            <button
              onClick={handleDeleteChecklist}
              className="px-6 py-2 text-sm transition-transform duration-100 rounded-full border-mainPurple bg-midnight text-mainPurple custom-shadow active:scale-95"
            >
              YES
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

DeleteBucketModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setAnchorEl: PropTypes.func.isRequired,
  bucketID: PropTypes.string.isRequired,
  setBuckets: PropTypes.func,
};

export default DeleteBucketModal;
