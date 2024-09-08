import PropTypes from "prop-types";
import Rating from "./Rating.jsx";
import {useState} from "react";

/**
 * Represents a Card of information about a task. When expanded, more information will appear.
 * @param {string} title Title of this task
 * @param {string} location Location that this task takes place in
 * @param {string} description Description of this task
 * @param {string[]} images An array of all images to be displayed in a carousel
 * @param {boolean} add true if this card is a card that allows the user to create more cards
 * @param {function} onClick onClick listener function
 * @param {function} onHover onHover listener function
 * @param {function} onLeave onMouseLeave listener function
 * @returns {JSX.Element} Card Element
 */
export default function Card(props) {

  const [complete, setComplete] = useState(false);

  const finish = () => {
    // TODO: Handles completion of a card and will move it to the "complete" tab
  }

  const standardCard = (
    <div
      className="card flex flex-col mt-0 p-4 z-0 cursor-pointer translate-x-0 translate-y-0 duration-300 hover:scale-105 hover:bg-light-purple [&:nth-child(2)]:-mt-6 [&:not(:first-child)]:mt-card"
      onClick={props.onClick}
      onMouseEnter={props.onHover}
      onMouseLeave={props.onLeave}
      style={props.style}
    >
      <div className="flex justify-between pointer-events-none">
        <h2 className="card-title font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">
          {props.title}
        </h2>
        <div className="location flex items-center">
          {props.location && (
            <img
              src="src/assets/location-icon.svg"
              alt="location-icon"
              className="location-icon"
              width="25px"
            />
          )}
          <p className="location-text whitespace-nowrap overflow-hidden overflow-ellipsis">
            {props.location}
          </p>
        </div>
      </div>
      <p className={`pt-2 card-description pointer-events-none text-dark-purple ${!props.expand && "h-14 overflow-hidden line-clamp-2"}`}>{props.description}</p>
      {props.images && (
        <div
          className="carousel m-4 max-w-full"
          style={props.expand ? undefined : { display: "none", visibility: "hidden" }}
        >
          {props.images.map((image, index) => {
            return (
              <img
                src={image}
                alt={`image-${index}`}
                key={`image-${index}`}
                className="block ml-auto mr-auto w-3/4 justify-self-center"
              />
            );
          })}
        </div>
      )}
      <div className="!mb-0 ml-auto">
        <button
          className="edit-btn max-h-16 text-medium-dark-purple pt-2 pb-2 pl-6 pr-6"
        >
          <u>Edit</u>
        </button>
        <button
          className="complete-btn max-h-16 text-white pt-2 pb-2 pl-6 pr-6"
          onClick={() => {
            setComplete(true);
          }}
        >
          Complete
        </button>
      </div>
    </div>
  );

  const completedCard = (
    <div
      className="card flex flex-col mt-0 p-4 z-0 cursor-pointer translate-x-0 translate-y-0 duration-300"
      style={props.style}
    >
      <div className="flex pointer-events-none">
        <h2 className="card-title font-bold">Completed</h2>
      </div>
      <p className="pt-2 mb-2 text-dark-purple pointer-events-none whitespace-pre-wrap">
        {`You have completed the task: ${props.title}.\nNow, let's have you both rate your task from a scale of 1 being the worst to 10 being the best.`}
      </p>
      <div className="mb-4">
        <Rating profile="src/assets/avatar-test-1.png" type="default" />
        <Rating profile="src/assets/avatar-test-2.png" type="default" />
      </div>
      <p className="text-dark-purple mb-2">
        Now, feel free to write down any thoughts either of you had about your
        task.
      </p>
      <div className="block bg-white rounded-lg mb-4">
        <textarea className="user-feedback"></textarea>
        <hr />
        <textarea className="user-feedback"></textarea>
      </div>
      <button
        className="complete-btn max-h-16 text-white ml-auto !mb-0 pt-2 pb-2 pl-6 pr-6"
        onClick={() => finish()}
      >
        Complete
      </button>
    </div>
  );

  Card.propTypes = {
    title: PropTypes.string.isRequired,
    location: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string.isRequired),
    add: PropTypes.bool,
    onClick: PropTypes.func,
    onHover: PropTypes.func,
    onLeave: PropTypes.func,
    expand: PropTypes.bool.isRequired,
    style: PropTypes.object,
  };

  return complete ? completedCard : standardCard;
}
