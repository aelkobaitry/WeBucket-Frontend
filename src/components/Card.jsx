import PropTypes from "prop-types";
import { useState } from "react";
import ViewItemModal from "./modals/ViewItemModal.jsx";
import locationIcon from "../assets/location-icon.svg";
import { deleteItemFromBucket, updateItemInBucket } from "../store/Fetch.js";
import { useNavigate } from "react-router-dom";

/**
 * Represents a Card of information about a task. When expanded, more information will appear.
 * @param {string} title Title of this task
 * @param {string} location Location that this task takes place in
 * @param {string} description Description of this task
 * @param {string[]} images An array of all images to be displayed in a carousel
 * @param {boolean} add true if this card is a card that allows the user to create more cards
 * @returns {JSX.Element} Card Element
 */
function Card({ item, setItemsCards, type }) {
  const navigate = useNavigate();
  const [showItemViewModal, setShowItemViewModal] = useState(false);

  const pushCards = (event) => {
    event.target.style.marginBottom = "6.7rem";
  };
  const resetMargin = (event) => {
    event.target.style.marginBottom = null;
  };

  const handleCompleteItem = async (e) => {
    e.stopPropagation();
    await updateItemInBucket(
      item.id,
      { complete: true },
      setItemsCards,
      navigate
    );
  };

  const handleModalClose = async (formDetails) => {
    if (formDetails && Object.keys(formDetails).length > 0) {
      await updateItemInBucket(item.id, formDetails, setItemsCards, navigate);
    }
    setShowItemViewModal(false);
  };

  const handleDeleteItem = async () => {
    await deleteItemFromBucket(item.id, setItemsCards, navigate);
    setShowItemViewModal(false);
  };

  const standardCard = (
    <>
      <div
        className="z-10 card flex flex-col mt-0 p-4 cursor-pointer translate-x-0 translate-y-0 bg-medium-purple border-solid border-3 border-dark-purple rounded-2xl drop-shadow-card duration-300 hover:scale-105 hover:bg-light-purple [&:nth-child(2)]:-mt-6 [&:not(:first-child)]:mt-card"
        onClick={() => setShowItemViewModal(true)}
        onMouseEnter={pushCards}
        onMouseLeave={resetMargin}
      >
        <div className="flex justify-between pointer-events-none">
          <h2 className="overflow-hidden font-bold text-dark-purple drop-shadow-card-title whitespace-nowrap overflow-ellipsis">
            {item.title}
          </h2>
          <div className="flex items-center text-medium-dark-purple">
            {item.location && (
              <img
                src={locationIcon}
                alt="location-icon"
                className="location-icon"
                width="25px"
              />
            )}
            <p className="overflow-hidden location-text whitespace-nowrap overflow-ellipsis">
              {item.location}
            </p>
          </div>
        </div>
        <p
          className={`pt-2 card-description pointer-events-none text-dark-purple h-14 overflow-hidden line-clamp-2`}
        >
          {item.description}
        </p>
        <div className="!mb-0 ml-auto">
          <button
            className="z-50 pt-2 pb-2 pl-6 pr-6 text-white rounded-full bg-dark-purple drop-shadow-btn max-h-16 active:scale-95"
            onClick={handleCompleteItem}
          >
            Complete
          </button>
        </div>
      </div>
      <ViewItemModal
        open={showItemViewModal}
        item={item}
        onClose={handleModalClose}
        type={type}
        onDelete={handleDeleteItem}
      />
    </>
  );

  // const completedCard = (
  //   <div className="z-10 flex flex-col p-4 mt-0 duration-300 translate-x-0 translate-y-0 border-2 border-solid cursor-pointer card border-mainPurple rounded-xl">
  //     <div className="flex pointer-events-none">
  //       <h2 className="font-bold card-title">Completed</h2>
  //     </div>
  //     <p className="pt-2 mb-2 text-white whitespace-pre-wrap pointer-events-none">
  //       {`You have completed the task: ${title}.\nNow, let's have you both rate your task from a scale of 1 being the worst to 10 being the best.`}
  //     </p>
  //     <p className="mb-2 text-dark-purple">
  //       Now, feel free to write down any thoughts either of you had about your
  //       task.
  //     </p>
  //     <div className="block mb-4 bg-white rounded-lg">
  //       <textarea className="user-feedback w-full h-1/2 p-1.5 rounded-lg shadow-input text-medium-dark-purple"></textarea>
  //       <hr />
  //       <textarea className="user-feedback w-full h-1/2 p-1.5 rounded-lg shadow-input text-medium-dark-purple"></textarea>
  //     </div>
  //     <button
  //       className="bg-dark-purple text-white rounded-full drop-shadow-btn max-h-16 text-white ml-auto !mb-0 pt-2 pb-2 pl-6 pr-6"
  //       onClick={() => finish()}
  //     >
  //       Complete
  //     </button>
  //   </div>
  // );

  Card.propTypes = {
    // title: PropTypes.string.isRequired,
    // location: PropTypes.string,
    // description: PropTypes.string,
    item: PropTypes.object.isRequired,
    setItemsCards: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    // images: PropTypes.arrayOf(PropTypes.string.isRequired),
    // add: PropTypes.bool,
    // style: PropTypes.object,
  };

  return standardCard;
}

export default Card;
