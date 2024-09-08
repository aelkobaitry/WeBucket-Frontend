import PropTypes from "prop-types";

/**
 * Represents a Card of information about a task. When expanded, more information will appear.
 * @param {function} onClick onClick listener function
 * @returns {JSX.Element} Card Element
 */
export default function AddCard({ onClick}) {

  AddCard.propTypes = {
    onClick: PropTypes.func,
  }

  return (
    <div className="add-card grid grid-rows-1" onClick={onClick}>
      <div className="flex justify-between pointer-events-none">
        <h2 className="card-title"><b>Add Card</b></h2>
        <img src="src/assets/plus-icon.svg" alt="plus-icon" className="plus-icon"/>
      </div>
    </div>
  );
}