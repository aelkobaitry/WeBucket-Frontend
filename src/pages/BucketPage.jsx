import { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import { fetchBucketData, getCurrentUser } from "../store/Fetch.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import darkTab from "../assets/incomplete-tab.svg";
import lightTab from "../assets/complete-tab.svg";
import IncompleteItems from "../components/IncompleteItems.jsx";
import CompletedItems from "../components/CompletedItems.jsx";

/**
 * Represents a page that contains all checklists in a given space.
 * @return {JSX.Element} Checklists page
 */
function BucketPage() {
  const navigate = useNavigate();
  const { bucketID } = useParams();

  const [activities, setActivities] = useState([]);
  const [food, setFood] = useState([]);
  const [media, setMedia] = useState([]);
  const [bucket, setBucket] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const [showCompletedItems, setShowCompletedItems] = useState(false);

  useEffect(() => {
    fetchBucketData(
      bucketID,
      setActivities,
      setFood,
      setMedia,
      setBucket,
      navigate
    );
    getCurrentUser(setCurrentUser, navigate);
  }, [bucketID, navigate]);

  return (
    <>
      <NavBar />
      <div className="fixed left-0 z-10 w-full p-8 top-24">
        <div>
          <Link to="/home">
            <div className="flex">
              <ArrowBackIosNewRoundedIcon
                sx={{
                  color: "#D48AE0",
                }}
              />
              <p className="inline-block text-light-purple">Back to Buckets</p>
            </div>
          </Link>
          <h1 className="sticky p-4 font-title">
            {bucket?.title ? bucket.title : "Bucket Title"}
          </h1>
          <h4 className="pt-3 pl-10">
            {bucket?.description ? bucket.description : "Bucket Description"}
          </h4>
          <div className="flex pt-8 text-sm">
            <div
              className={`relative h-auto text-center duration-300 cursor-pointer text-dark-purple w-28 ${showCompletedItems ? "z-0" : "z-10"}`}
              onClick={() => setShowCompletedItems(false)}
            >
              <p className="absolute z-10 -translate-x-1/2 -translate-y-1/2 tab-text top-1/2 left-1/2">
                Incomplete
              </p>
              <img
                src={showCompletedItems ? lightTab : darkTab}
                alt="incomplete-tab-image"
                className="absolute z-0 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              />
            </div>
            <div
              className={`relative h-auto text-center text-white duration-300 cursor-pointer w-28 -left-8 ${showCompletedItems ? "z-10" : "z-0"}`}
              onClick={() => setShowCompletedItems(true)}
            >
              <p className="absolute z-10 -translate-x-1/2 -translate-y-1/2 tab-text top-1/2 left-1/2">
                Complete
              </p>
              <img
                src={showCompletedItems ? darkTab : lightTab}
                alt="complete-tab-img"
                className="absolute z-0 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              />
            </div>
          </div>
        </div>
        {showCompletedItems ? (
          <CompletedItems
            activities={activities}
            setActivities={setActivities}
            food={food}
            setFood={setFood}
            media={media}
            setMedia={setMedia}
            currentUser={currentUser}
          />
        ) : (
          <IncompleteItems
            bucketID={bucketID}
            activities={activities}
            setActivities={setActivities}
            food={food}
            setFood={setFood}
            media={media}
            setMedia={setMedia}
          />
        )}
      </div>
    </>
  );
}

export default BucketPage;
