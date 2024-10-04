import { useState } from "react";
import PropTypes from "prop-types";
import activityIcon from "../assets/icons/plane.png";
import foodIcon from "../assets/icons/pizza.png";
import mediaIcon from "../assets/icons/dice.png";
import avatar1 from "../assets/avatar-test-1.png";
// import avatar2 from "../assets/avatar-test-2.png";
import { useNavigate } from "react-router-dom";
import ViewCompletedItemModal from "./modals/ViewCompletedItemModal";
import { deleteItemFromBucket, updateItemInBucket } from "../store/Fetch.js";

/**
 * Represents a list of completed items in a bucket.
 * @param {Object[]} activities List of activities
 * @param {Function} setActivities Function to set the list of activities
 * @param {Object[]} food List of food items
 * @param {Function} setFood Function to set the list of food items
 * @param {Object[]} media List of media items
 * @param {Function} setMedia Function to set the list of media items
 * @returns {JSX.Element} Completed Items Element
 */
function CompletedItems({
  activities,
  setActivities,
  food,
  setFood,
  media,
  setMedia,
  currentUser,
}) {
  const navigate = useNavigate();
  const rows = activities.concat(food, media);
  const [showItemModal, setShowItemModal] = useState(false);

  const [updateItem, setUpdateItem] = useState({});

  const handleShowItemModal = (row) => {
    setUpdateItem(row);
    setShowItemModal(true);
  };

  const handleUpdateModal = async (formDetails) => {
    if (formDetails && Object.keys(formDetails).length > 0) {
      // depending on item type use setActivities, setFood, or setMedia
      let setItemsCards;
      if (updateItem.item_type === "activity") {
        setItemsCards = setActivities;
      } else if (updateItem.item_type === "food") {
        setItemsCards = setFood;
      } else {
        setItemsCards = setMedia;
      }
      await updateItemInBucket(
        updateItem.id,
        formDetails,
        setItemsCards,
        navigate
      );
    }
    setShowItemModal(false);
  };

  const handleDeleteItem = async () => {
    let setItemsCards;
    if (updateItem.item_type === "activity") {
      setItemsCards = setActivities;
    } else if (updateItem.item_type === "food") {
      setItemsCards = setFood;
    } else {
      setItemsCards = setMedia;
    }
    await deleteItemFromBucket(updateItem.id, setItemsCards, navigate);
    setShowItemModal(false);
  };

  return (
    <div className="relative w-full mt-8">
      <table className="w-full text-sm text-left">
        <thead className="sticky top-0 text-white uppercase">
          <tr>
            <th scope="col" className="px-2 py-3 w-[5%]">
              Type
            </th>
            <th scope="col" className="px-6 py-3 w-[12%]">
              Item
            </th>
            <th scope="col" className="px-6 py-3 w-[23%]">
              Description
            </th>
            <th scope="col" className="px-6 py-3 w-[40%]">
              Thoughts
            </th>
            <th scope="col" className="px-6 py-3 w-[10%]">
              Ratings
            </th>
            <th scope="col" className="px-6 py-3 w-[10%]">
              Details
            </th>
          </tr>
        </thead>
      </table>
      <table className="overflow-y-auto max-h-[55vh] w-full overflow-x-auto">
        <tbody>
          {rows
            .filter((row) => row.complete)
            .map((row) => (
              <tr
                className="min-w-full text-sm bg-transparent border-b-2 border-b-medium-dark-purple"
                key={row.id}
              >
                <td className="px-2 py-3 align-top w-[5%]">
                  <div className="flex items-center w-8">
                    <img
                      src={
                        row.item_type === "activity"
                          ? activityIcon
                          : row.item_type === "food"
                            ? foodIcon
                            : mediaIcon
                      }
                      alt={`${row.item_type}-icon`}
                    />
                  </div>
                </td>
                <td className="px-6 py-3 align-top w-[12%]">{row.title}</td>
                <td className="px-6 py-3 align-top w-[23%]">
                  {row.description}
                </td>
                <td className="px-6 py-3 align-top w-[40%]">
                  {Object.keys(row.comments).map((key) => (
                    <div key={key} className="flex-col items-center">
                      <p className="font-medium text-[#fbd3d3] text-base">
                        {key}
                      </p>
                      <p className="ml-2 text-light-purple">
                        {row.comments[key]}
                      </p>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-3 align-top w-[10%] flex-col flex items-end">
                  {Object.keys(row.ratings).map((key) => (
                    <div
                      key={key}
                      className="flex items-center w-8 mt-1 space-x-2"
                    >
                      <p className="text-sm text-light-purple">{`${row.ratings[key]}/5`}</p>
                      <img
                        src={avatar1}
                        alt="pfp-1"
                        className="w-auto rounded-full h-5/6"
                      />
                    </div>
                  ))}
                </td>
                <td className="px-6 py-3.5 w-[10%] align-top">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleShowItemModal(row)}
                      className="px-3 py-1.5 transition-transform duration-200 bg-transparent border-2 border-light-purple hover:scale-105 active:scale-95"
                    >
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ViewCompletedItemModal
        open={showItemModal}
        item={updateItem}
        onClose={handleUpdateModal}
        onDelete={handleDeleteItem}
        currentUser={currentUser}
      />
    </div>
  );
}

CompletedItems.propTypes = {
  activities: PropTypes.array.isRequired,
  setActivities: PropTypes.func.isRequired,
  food: PropTypes.array.isRequired,
  setFood: PropTypes.func.isRequired,
  media: PropTypes.array.isRequired,
  setMedia: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default CompletedItems;
