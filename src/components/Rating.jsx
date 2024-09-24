import { useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * Represents a user's rating of a particular task. There are three sets of images to be used for ratings, each
 *   corresponding with the type of task the users have completed.
 * @param {string} type can either be "activities", "food", or "movies"
 * @param {string} profile image url of the profile picture to be displayed with the rating
 * @param {function} passRating a function that will pass the final rating back to the parent element
 * @param {boolean} disabled true if this rating is disabled
 * @returns {JSX.Element} Rating on a scale of 1-5
 */
export default function Rating({
  type,
  profile,
  passRating,
  disabled,
  height,
  defaultRating,
}) {
  const [rating, setRating] = useState(0);
  const finalRating = useRef(null);

  // Can be changed anytime
  let numberArray = ["one", "two", "three", "four", "five"];

  if (defaultRating) {
    numberArray = [];
    for (let index = 0; index < parseInt(defaultRating); index++) {
      numberArray.push(index);
    }
  }

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
    passRating: PropTypes.func,
    disabled: PropTypes.bool,
    height: PropTypes.number,
    defaultValue: PropTypes.number,
  };

  return (
    <div
      className={`flex items-center center ${disabled ? "pointer-events-none" : "pointer-events-auto"} ${height ? `h-${height}` : "h-10"}`}
    >
      <img
        src={profile}
        alt="profile-rating"
        className="h-5/6 w-auto max-h-8 align-baseline border-2 border-white rounded-full"
      />
      <div
        className={`flex ml-2 items-center ${height ? `h-${height}` : "h-10"}`}
      >
        {defaultRating ? (
          numberArray.map(item => {
            return (
              <img
                src={ratedImg}
                alt={`${item}-star`}
                key={`${item}-star`}
                className="h-5/6 w-auto max-h-10"
              />
            )
          })
        ) : (
          numberArray.map((item, index) => {
            return (
              <img
                src={rating < index + 1 ? defaultImg : ratedImg}
                alt={`${item}-star`}
                key={`${item}-star`}
                className="h-5/6 w-auto max-h-10 cursor-pointer duration-300 hover:scale-110"
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
          })
        )}
      </div>
    </div>
  );
}
