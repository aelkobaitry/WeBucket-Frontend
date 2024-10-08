import { useEffect, useState } from "react";
import {
  fetchBucketData,
  getCurrentUser,
  updateBucket,
} from "../store/Fetch.js";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Avatar, IconButton, Popover } from "@mui/material";
import {
  ArrowBackIosNewRounded,
  MoreVert,
  StarRounded,
  StarBorderRounded,
} from "@mui/icons-material";

import darkTab from "../assets/incomplete-tab.svg";
import lightTab from "../assets/complete-tab.svg";

import NavBar from "../components/NavBar.jsx";
import IncompleteItems from "../components/IncompleteItems.jsx";
import CompletedItems from "../components/CompletedItems.jsx";
import SettingsModal from "../components/BucketSettingsModal";
import DeleteBucketModal from "../components/modals/DeleteBucketModal";
import AddUserModal from "../components/modals/AddUserModal";
import EditTextModal from "../components/modals/EditTextModal";

import avatar1 from "../assets/avatar-test-1.png";

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

  const [bookmarked, setBookmarked] = useState(false);
  const [bucketTitle, setBucketTitle] = useState("");
  const [bucketDescription, setBucketDescription] = useState("");
  const [anchorEl, setAnchorEl] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [showDeleteBucketModal, setShowDeleteBucketModal] = useState(false);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [bucketUsers, setBucketUsers] = useState([]);

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

  useEffect(() => {
    if (bucket.users) {
      setBookmarked(bucket.bookmark);
      setBucketTitle(bucket.title);
      setBucketDescription(bucket.description);
      setBucketUsers(bucket.users);
    }
  }, [bucket]);

  const handleCloseUpdateBucketModal = async () => {
    if (!bucketTitle) {
      return;
    }
    let formDetails = {};
    if (bucketTitle !== bucket.title) {
      formDetails["title"] = bucketTitle;
    } else if (bucketDescription !== bucket.description) {
      formDetails["description"] = bucketDescription;
    }
    if (Object.keys(formDetails).length > 0) {
      await updateBucket(bucket.id, formDetails, setBucket, navigate, true);
    }
    setEditTitle(false);
    setEditDescription(false);
    setAnchorEl(false);
  };

  const handleBookmarkClick = async () => {
    await updateBucket(
      bucket.id,
      { bookmark: !bucket.bookmark },
      setBucket,
      navigate,
      true
    );
    setBookmarked(!bookmarked);
  };

  return (
    <>
      <NavBar />
      <div className="fixed left-0 z-10 w-full p-8 top-24">
        <div>
          <Link
            to="/home"
            className="flex w-40 text-mainPurple hover:text-mainPurple"
          >
            <ArrowBackIosNewRounded
              sx={{
                color: "#D48AE0",
              }}
            />
            Back to Buckets
          </Link>
          <div className="relative z-10 flex items-center justify-between w-full p-2">
            <h1 className="sticky p-4 font-title">
              {bucketTitle}
              <IconButton
                disableRipple
                disableFocusRipple
                onClick={handleBookmarkClick}
              >
                {bookmarked ? (
                  <StarRounded
                    fontSize="large"
                    sx={{
                      color: "#D48AE0",
                    }}
                  />
                ) : (
                  <StarBorderRounded
                    fontSize="large"
                    sx={{
                      color: "#D48AE0",
                    }}
                  />
                )}
              </IconButton>
            </h1>
            <div className="flex flex-row items-center">
              {bucketUsers.map((user, index) => (
                <Avatar
                  key={index}
                  sx={{
                    right: 20 * (index),
                    width: 32,
                    height: 32,
                    zIndex: 100 - index,
                  }}
                  src={avatar1}
                />
              ))}
              <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                <MoreVert
                  fontSize="large"
                  sx={{
                    color: "#D48AE0",
                  }}
                />
              </IconButton>
            </div>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(false)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              sx={{
                "& .MuiPopover-paper": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
              }}
            >
              <SettingsModal
                setEditTitle={setEditTitle}
                setEditDescription={setEditDescription}
                setDeleteChecklist={setShowDeleteBucketModal}
                setAddUserOpen={setAddUserModalOpen}
              />
            </Popover>
          </div>
          <EditTextModal
            open={editTitle || editDescription}
            text={editTitle ? bucketTitle : bucketDescription}
            setText={editTitle ? setBucketTitle : setBucketDescription}
            handleCloseModal={handleCloseUpdateBucketModal}
          />
          <DeleteBucketModal
            open={showDeleteBucketModal}
            setOpen={setShowDeleteBucketModal}
            setAnchorEl={setAnchorEl}
            bucketID={bucketID}
            setBuckets={undefined}
          />
          <AddUserModal
            open={addUserModalOpen}
            setOpen={setAddUserModalOpen}
            bucketID={bucketID}
          />
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
