import { useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * Represents a user's rating of a particular task. There are three sets of images to be used for ratings, each
 *   corresponding with the type of task the users have completed.
 * @param {string} type can either be "activities", "food", or "movies"
 * @param {string} profile image url of the profile picture to be displayed with the rating
 * @param {function} passRating a function that will pass the final rating back to the parent element
 * @returns {JSX.Element} Rating on a scale of 1-5
 */
export default function Rating({ type, profile, passRating }) {
  const [rating, setRating] = useState(0);
  const finalRating = useRef(null);

  // Can be changed anytime
  const numberArray = ["one", "two", "three", "four", "five"];

  let ratedImg;
  let defaultImg;

  switch (type) {
    case "activities":
      ratedImg =
        /* Activities Rating */ "src/assets/ratings/activityrating.svg";
      defaultImg =
        /* Activities Default */ "src/assets/ratings/activitydefault.svg";
      break;
    case "food":
      ratedImg = /* Food Rating */ "src/assets/ratings/foodrating.svg";
      defaultImg = /* Food Default */ "src/assets/ratings/fooddefault.svg";
      break;
    case "movies":
      ratedImg = /* Movies Rating */ "src/assets/ratings/moviesrating.svg";
      defaultImg = /* Movies Default */ "src/assets/ratings/moviesdefault.svg";
      break;
    default:
      ratedImg = "src/assets/ratings/starrating.svg";
      defaultImg = "src/assets/ratings/stardefault.svg";
      break;
  }

  Rating.propTypes = {
    type: PropTypes.oneOf(["activities", "food", "movies"]),
    profile: PropTypes.string.isRequired,
    passRating: PropTypes.func.isRequired,
  };

  return (
    <div className="flex items-center center pointer-events-auto">
      <img src={profile} alt="profile-rating" className="w-8 h-8 align-baseline border-2 border-white rounded-full" />
      <div className="flex ml-2">
        {numberArray.map((item, index) => {
          return (
            <img
              src={rating < index + 1 ? defaultImg : ratedImg}
              alt={`${item}-star`}
              key={`${item}-star`}
              className="w-10 h-10 cursor-pointer duration-300 hover:scale-110"
              onMouseEnter={() => {
                finalRating.current === null && setRating(index + 1);
                console.log(finalRating.current);
              }}
              onMouseLeave={() => {
                finalRating.current === null && index === 0 && setRating(0);
              }}
              onClick={() => {
                if (
                  finalRating.current === null ||
                  finalRating.current !== index + 1
                ) {
                  finalRating.current = index + 1;
                  setRating(index + 1);
                  passRating(finalRating.current);
                } else {
                  finalRating.current = null;
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}