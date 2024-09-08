import PropTypes from "prop-types";

/**
 * Represents a Card of information about a task. When expanded, more information will appear.
 * @param {function} onClick onClick listener function
 * @param {boolean} expand true if this card is expanded
 * @param {object} style applied if any additional styles are needed
 * @returns {JSX.Element} Card Element
 */
export default function AddCard({ onClick, expand, style }) {
  const defaultCard = (
    <div
      className="grid grid-rows-1 mt-0 pl-4 pt-4 pr-4 pb-8 z-0 bg-medium-dark-purple duration-300 cursor-pointer border-solid border-4 border-dark-purple rounded-2xl drop-shadow-card hover:bg-medium-purple"
      onClick={onClick}
    >
      <div className="flex justify-between pointer-events-none">
        <h2 className="text-dark-purple drop-shadow-card-title font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
          <b>Add Task</b>
        </h2>
        <img src="src/assets/plus-icon.svg" alt="plus-icon" />
      </div>
    </div>
  );

  const expandedCard = (
    <div
      className="grid grid-rows-1 mt-0 pl-4 pt-4 pr-4 pb-4 z-0 border-solid border-4 border-dark-purple rounded-2xl duration-300"
      onClick={onClick}
      style={style}
    >
      <div className="flex">
        <h2 className="text-dark-purple drop-shadow-card-title font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
          <b>Add Task</b>
        </h2>
        <img src="src/assets/plus-icon.svg" alt="plus-icon" />
      </div>
      <label htmlFor="input-title">Title</label>
      <input id="input-title"></input>
      <label htmlFor="input-description">Description</label>
      <textarea id="input-description" className="p-1.5 rounded-lg shadow-input text-medium-dark-purple" />
    {/*}*/}
      <label htmlFor="input-location">Location</label>
      <input id="input-location" />
      <label htmlFor="input-images">Images (Optional)</label>
      <input id="input-images" type="file" />
      <button
        className="complete-btn max-h-16 text-white ml-auto mt-4 !mb-0 pt-2 pb-2 pl-6 pr-6"
        onClick={() => {
          /* Handles adding card to the backend/frontend */
        }}
      >
        Add Task
      </button>
    </div>
  );

  AddCard.propTypes = {
    onClick: PropTypes.func,
    expand: PropTypes.bool.isRequired,
    style: PropTypes.object
  };

  return expand ? expandedCard : defaultCard;
}