import Card from "./Card.jsx";
import AddNewItemCard from "./AddCard.jsx";
import PropTypes from "prop-types";

/**
 * Represents a list of completed items in a bucket.
 * @param {string} bucketID ID of the bucket
 * @param {Object[]} activities List of activities
 * @param {Function} setActivities Function to set the list of activities
 * @param {Object[]} food List of food items
 * @param {Function} setFood Function to set the list of food items
 * @param {Object[]} media List of media items
 * @param {Function} setMedia Function to set the list of media items
 * @returns {JSX.Element} Completed Items Element
 */
function IncompleteItems({
  bucketID,
  activities,
  setActivities,
  food,
  setFood,
  media,
  setMedia,
}) {
  return (
    <div className="relative grid grid-cols-1 gap-4 overflow-y-auto checklists mt-14 md:grid-cols-3 max-h-[60vh] p-2">
      <div className="checklist">
        <h2 className="text-center">Activities</h2>
        <div className="card-group" id="group-1">
          <AddNewItemCard
            type={"activity"}
            bucketID={bucketID}
            setChecklist={setActivities}
          />
          {/* only show completed items */}
          {activities
            .filter((item) => !item.complete)
            .map((item) => (
              <Card
                key={item.id}
                item={item}
                setItemsCards={setActivities}
                type={"activity"}
              />
            ))}
        </div>
      </div>
      <div className="checklist">
        <h2 className="text-center">To Eat</h2>
        <div className="card-group" id="group-2">
          <AddNewItemCard
            type={"food"}
            bucketID={bucketID}
            setChecklist={setFood}
          />
          {food
            .filter((item) => !item.complete)
            .map((item) => (
              <Card
                key={item.id}
                item={item}
                setItemsCards={setFood}
                type={"food"}
              />
            ))}
        </div>
      </div>
      <div className="checklist">
        <h2 className="text-center">To Watch</h2>
        <div className="card-group" id="group-3">
          <AddNewItemCard
            type={"media"}
            bucketID={bucketID}
            setChecklist={setMedia}
          />
          {media
            .filter((item) => !item.complete)
            .map((item) => (
              <Card
                key={item.id}
                item={item}
                setItemsCards={setMedia}
                type={"media"}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

IncompleteItems.propTypes = {
  bucketID: PropTypes.string.isRequired,
  activities: PropTypes.array.isRequired,
  food: PropTypes.array.isRequired,
  media: PropTypes.array.isRequired,
  setActivities: PropTypes.func.isRequired,
  setFood: PropTypes.func.isRequired,
  setMedia: PropTypes.func.isRequired,
};

export default IncompleteItems;
