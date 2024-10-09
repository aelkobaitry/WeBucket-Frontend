import { useState } from "react";
import PropTypes from "prop-types";
import plusIcon from "../assets/plus-icon.svg";
import ViewItemModal from "./modals/ViewItemModal.jsx";
import { addItemToBucket } from "../store/Fetch.js";
import { useNavigate } from "react-router-dom";

/**
 * Represents a Card of information about a task. When expanded, more information will appear.
 * @param {function} onClick onClick listener function
 * @param {boolean} expand true if this card is expanded
 * @param {object} style applied if any additional styles are needed
 * @returns {JSX.Element} Card Element
 */
function AddNewItemCard({ type, bucketID, setChecklist }) {
  const navigate = useNavigate();
  const [showItemViewModal, setShowItemViewModal] = useState(false);

  const handleAddNewItemModal = (formDetails) => {
    if (formDetails) {
      formDetails["item_type"] = type;
      addItemToBucket(bucketID, setChecklist, formDetails, navigate);
    }
    setShowItemViewModal(false);
  };

  return (
    <>
      <div
        className="z-10 grid grid-rows-1 pt-4 pb-8 pl-4 pr-4 mt-0 duration-300 border-4 border-solid cursor-pointer bg-medium-dark-purple border-dark-purple rounded-2xl drop-shadow-card hover:bg-medium-purple"
        onClick={() => setShowItemViewModal(true)}
      >
        <div className="flex justify-between pointer-events-none">
          <h2 className="overflow-hidden font-bold text-dark-purple drop-shadow-card-title whitespace-nowrap overflow-ellipsis">
            <b>Add Task</b>
          </h2>
          <img src={plusIcon} alt="plus-icon" />
        </div>
      </div>
      <ViewItemModal
        open={showItemViewModal}
        item={{ title: "", description: "", location: "" }}
        onClose={handleAddNewItemModal}
        newItem={true}
        type={type}
      />
    </>
  );

  // const expandedCard = (
  //   <div
  //     className="z-10 grid grid-rows-1 pt-4 pb-4 pl-4 pr-4 mt-0 duration-300 border-4 border-solid border-dark-purple rounded-2xl"
  //     onClick={onClick}
  //     style={style}
  //   >
  //     <div className="flex">
  //       <h2 className="overflow-hidden font-bold text-dark-purple drop-shadow-card-title whitespace-nowrap overflow-ellipsis">
  //         <b>Add Task</b>
  //       </h2>
  //       <img src="src/assets/plus-icon.svg" alt="plus-icon" />
  //     </div>
  //     <label htmlFor="input-title">Title</label>
  //     <input id="input-title"></input>
  //     <label htmlFor="input-description">Description</label>
  //     <textarea
  //       id="input-description"
  //       className="p-1.5 rounded-lg shadow-input text-medium-dark-purple"
  //     />
  //     {/*}*/}
  //     <label htmlFor="input-location">Location</label>
  //     <input id="input-location" />
  //     <label htmlFor="input-images">Images (Optional)</label>
  //     <input id="input-images" type="file" />
  //     <button
  //       className="complete-btn max-h-16 text-white ml-auto mt-4 !mb-0 pt-2 pb-2 pl-6 pr-6"
  //       onClick={() => {
  //         /* Handles adding card to the backend/frontend */
  //       }}
  //     >
  //       Add Task
  //     </button>
  //   </div>
  // );
}

AddNewItemCard.propTypes = {
  type: PropTypes.string.isRequired,
  bucketID: PropTypes.string.isRequired,
  setChecklist: PropTypes.func.isRequired,
  // style: PropTypes.object,
};

export default AddNewItemCard;
