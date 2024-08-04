import PropTypes from "prop-types";

/**
 * Represents a Card of information about a task. When expanded, more information will appear.
 * @param {string} title Title of this task
 * @param {string} location Location that this task takes place in
 * @param {string} description Description of this task
 * @param {string[]} images An array of all images to be displayed in a carousel
 * @returns {JSX.Element} Card Element
 */
export default function Card({ title, location, description, images }) {

  Card.propTypes = {
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  let expand = false;

  return (
    <div>
      <div className="first-row">
        <h2>{title}</h2>
        <p><img src="src/assets/location_icon.svg" alt="location-icon"/> {location}</p>
      </div>
      <div className="second-row">
        <p>{description}</p>
      </div>
      {expand &&
        <div className="carousel">
          {images.map((image, index) => {
            return (<img src={image} alt={`image-${index}`} key={`image-${index}`} />);
          })}
        </div>
      }
      <button className="complete-btn">Complete</button>
    </div>
  );
}