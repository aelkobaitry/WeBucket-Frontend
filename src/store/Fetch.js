import { fetchToken, deleteToken, setToken } from "./Auth";
import MinorToast from "../components/modals/MinorToast";
import toast from "react-hot-toast";

/**
 * Fetches buckets for the user.
 *
 * @param {Function} setBuckets - Function to set the buckets state.
 * @param {Function} navigate - Function to navigate to a different route.
 */
export async function fetchBuckets(setBuckets, navigate) {
  return fetch("http://localhost:8000/api/v1/get_buckets_for_user", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + fetchToken(),
    },
  })
    .then((response) => {
      if (response.status === 403) {
        throw new Error("Must Login Again");
      }
      return response.json();
    })
    .then((data) => {
      if (data.detail) {
        throw new Error(data.detail);
      } else {
        setBuckets(data);
      }
    })
    .catch((error) => {
      if (error.message.startsWith("Must Login Again")) {
        MinorToast("Error!", error.message);
        deleteToken();
        navigate("/login");
      } else if (error.message) {
        MinorToast("Error!", error.message);
      } else {
        console.log(error);
      }
    });
}

/**
 * Creates a new bucket for the user.
 *
 * @param {string} newBucketTitle - The title of the new bucket.
 * @param {string} newBucketDescription - The description of the new bucket.
 * @param {Function} setBuckets - Function to set the buckets state.
 * @param {Function} navigate - Function to navigate to a different route.
 */
export async function createBucket(
  newBucketTitle,
  newBucketDescription,
  setBuckets,
  navigate
) {
  return fetch("http://localhost:8000/api/v1/create_bucket", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + fetchToken(),
    },
    body: JSON.stringify({
      title: newBucketTitle,
      description: newBucketDescription,
    }),
  })
    .then((response) => {
      if (response.status === 403) {
        throw new Error("Must Login Again");
      }
      return response.json();
    })
    .then((data) => {
      if (data.detail) {
        throw new Error(data.detail);
      } else {
        setBuckets(data);
        MinorToast("Success!", "Bucket created successfully.");
      }
    })
    .catch((error) => {
      if (error.message.startsWith("Must Login Again")) {
        MinorToast("Error!", error.message);
        deleteToken();
        navigate("/login");
      } else if (error.message) {
        MinorToast("Error!", error.message);
      } else {
        console.log(error);
      }
    });
}

/**
 * Delete a bucket for a user
 *
 * @param {string} bucketID - The ID of the bucket to delete.
 * @param {Function} setBuckets - Function to set the buckets state.
 * @param {Function} navigate - Function to navigate to a different route.
 */
export async function deleteBucket(bucketID, setBuckets, navigate) {
  return fetch(`http://localhost:8000/api/v1/delete_bucket/${bucketID}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + fetchToken(),
    },
  })
    .then((response) => {
      if (response.status === 403) {
        throw new Error("Must Login Again");
      }
      return response.json();
    })
    .then((data) => {
      if (data.detail) {
        throw new Error(data.detail);
      } else {
        setBuckets(data);
        MinorToast("Success!", "Bucket removed successfully.");
      }
    })
    .catch((error) => {
      if (error.message.startsWith("Must Login Again")) {
        MinorToast("Error!", error.message);
        deleteToken();
        navigate("/login");
      } else if (error.message) {
        MinorToast("Error!", error.message);
      } else {
        console.log(error);
      }
    });
}

/**
 * Add a user to a bucket
 *
 * @param {string} bucketID - The ID of the bucket.
 * @param {string} username - The username of the user to add.
 * @param {Function} navigate - Function to navigate to a different route.
 */
export async function addUserToBucket(bucketID, username, navigate) {
  return fetch(
    `http://localhost:8000/api/v1/add_user_to_bucket/${bucketID}?add_username=${username}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + fetchToken(),
      },
    }
  )
    .then((response) => {
      if (response.status === 403) {
        throw new Error("Must Login Again");
      }
      return response.json();
    })
    .then((data) => {
      if (data.detail) {
        throw new Error(data.detail);
      } else {
        MinorToast("Success!", "User added to bucket successfully.");
      }
    })
    .catch((error) => {
      if (error.message.startsWith("Must Login Again")) {
        MinorToast("Error!", error.message);
        deleteToken();
        navigate("/login");
      } else if (error.message) {
        MinorToast("Error!", error.message);
      } else {
        console.log(error);
      }
    });
}

/**
 * Updates a bucket for a user
 *
 * @param {string} bucketID - The ID of the bucket to update.
 * @param {Object} updatedData - The updated data for the bucket.
 * @param {Function} setBucketContent - Function to set the bucket content state.
 * @param {Function} navigate - Function to navigate to a different route.
 */
export async function updateBucket(
  bucketID,
  updatedData,
  setBucketContent,
  navigate
) {
  return fetch(`http://localhost:8000/api/v1/update_bucket/${bucketID}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + fetchToken(),
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (response.status === 403) {
        throw new Error("Must Login Again");
      }
      return response.json();
    })
    .then((data) => {
      if (data.detail) {
        throw new Error(data.detail);
      } else {
        setBucketContent(data);
        MinorToast("Success!", "Bucket detail updated successfully.");
      }
    })
    .catch((error) => {
      if (error.message.startsWith("Must Login Again")) {
        MinorToast("Error!", error.message);
        deleteToken();
        navigate("/login");
      } else if (error.message) {
        MinorToast("Error!", error.message);
      } else {
        console.log(error);
      }
    });
}

/**
 * Logs in a user
 *
 * @param {Object} formDetails - The login form details.
 */
export async function loginUser(formDetails, navigate) {
  return fetch("http://localhost:8000/token", {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: formDetails,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.detail) {
        throw new Error(data.detail);
      }
      setToken(data.access_token);
      toast.remove();
      navigate("/home");
    })
    .catch((error) => {
      if (error.message) {
        MinorToast("Error!", error.message);
      } else {
        MinorToast("Error!", "error");
        console.log(error);
      }
    });
}

/**
 * Fetches the items for a bucket
 *
 * @param {string} bucketID - The ID of the bucket to fetch items for.
 * @param {Function} navigate - Function to navigate to a different route.
 */
export async function fetchBucketData(
  bucketID,
  setActivites,
  setFood,
  setMedia,
  setBucketInfo,
  navigate
) {
  return fetch(`http://localhost:8000/api/v1/bucket/${bucketID}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + fetchToken(),
    },
  })
    .then((response) => {
      if (response.status === 403) {
        throw new Error("Must Login Again");
      }
      return response.json();
    })
    .then((data) => {
      if (data.detail) {
        throw new Error(data.detail);
      } else {
        setActivites(data.activity);
        setFood(data.food);
        setMedia(data.media);
        setBucketInfo(data.bucket);
      }
    })
    .catch((error) => {
      if (error.message.startsWith("Must Login Again")) {
        MinorToast("Error!", error.message);
        deleteToken();
        navigate("/login");
      } else if (error.message) {
        MinorToast("Error!", error.message);
      } else {
        console.log(error);
      }
    });
}

/**
 * Adds a new item to a bucket
 *
 * @param {string} bucketID - The ID of the bucket to fetch items for.
 * @param {Function} setChecklist - Function to set the specific checklist state.
 * @param {Object} formDetails - The new item to add to the bucket.
 * @param {Function} navigate - Function to navigate to a different route.
 */
export async function addItemToBucket(
  bucketID,
  setChecklist,
  formDetails,
  navigate
) {
  return fetch(`http://localhost:8000/api/v1/add_item_to_bucket/${bucketID}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + fetchToken(),
    },
    body: JSON.stringify(formDetails),
  })
    .then((response) => {
      if (response.status === 403) {
        throw new Error("Must Login Again");
      }
      return response.json();
    })
    .then((data) => {
      if (data.detail) {
        throw new Error(data.detail);
      } else {
        setChecklist(data);
        MinorToast("Success!", "Item added successfully.");
      }
    })
    .catch((error) => {
      if (error.message.startsWith("Must Login Again")) {
        MinorToast("Error!", error.message);
        deleteToken();
        navigate("/login");
      } else if (error.message) {
        MinorToast("Error!", error.message);
      } else {
        console.log(error);
      }
    });
}

/**
 * Updates an item in a bucket
 *
 * @param {string} itemID - The ID of the item to update.
 * @param {Object} formDetails - The updated item details.
 * @param {Function} setChecklist - Function to set the specific checklist state.
 * @param {Function} navigate - Function to navigate to a different route.
 */
export async function updateItemInBucket(
  itemID,
  formDetails,
  setChecklist,
  navigate
) {
  return fetch(`http://localhost:8000/api/v1/update_item/${itemID}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + fetchToken(),
    },
    body: JSON.stringify(formDetails),
  })
    .then((response) => {
      if (response.status === 403) {
        throw new Error("Must Login Again");
      }
      return response.json();
    })
    .then((data) => {
      if (data.detail) {
        throw new Error(data.detail);
      } else {
        setChecklist(data);
        MinorToast("Success!", "Item updated successfully.");
      }
    })
    .catch((error) => {
      if (error.message.startsWith("Must Login Again")) {
        MinorToast("Error!", error.message);
        deleteToken();
        navigate("/login");
      } else if (error.message) {
        MinorToast("Error!", error.message);
      } else {
        console.log(error);
      }
    });
}

/**
 * Deletes an item from a bucket
 *
 * @param {string} itemID - The ID of the item to delete.
 * @param {Function} setChecklist - Function to set the specific checklist state.
 * @param {Function} navigate - Function to navigate to a different route.
 */
export async function deleteItemFromBucket(itemID, setChecklist, navigate) {
  return fetch(`http://localhost:8000/api/v1/delete_item/${itemID}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + fetchToken(),
    },
  })
    .then((response) => {
      if (response.status === 403) {
        throw new Error("Must Login Again");
      }
      return response.json();
    })
    .then((data) => {
      if (data.detail) {
        throw new Error(data.detail);
      } else {
        setChecklist(data);
        MinorToast("Success!", "Item deleted successfully.");
      }
    })
    .catch((error) => {
      if (error.message.startsWith("Must Login Again")) {
        MinorToast("Error!", error.message);
        deleteToken();
        navigate("/login");
      } else if (error.message) {
        MinorToast("Error!", error.message);
      } else {
        console.log(error);
      }
    });
}

/**
 * Gets the current user data
 *
 * @param {Function} setCurrentUser - Function to set the current user state.
 * @param {Function} navigate - Function to navigate to a different route.
 */
export async function getCurrentUser(setCurrentUser, navigate) {
  return fetch("http://localhost:8000/api/v1/auth/current_user", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + fetchToken(),
    },
  })
    .then((response) => {
      if (response.status === 403) {
        throw new Error("Must Login Again");
      }
      return response.json();
    })
    .then((data) => {
      if (data.detail) {
        throw new Error(data.detail);
      } else {
        return setCurrentUser(data);
      }
    })
    .catch((error) => {
      if (error.message.startsWith("Must Login Again")) {
        MinorToast("Error!", error.message);
        deleteToken();
        navigate("/login");
      } else if (error.message) {
        MinorToast("Error!", error.message);
      } else {
        console.log(error);
      }
    });
}
