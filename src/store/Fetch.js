import { fetchToken, deleteToken } from "./Auth";

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
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => setBuckets(data))
    .catch((error) => {
      if (error.message.startsWith("403")) {
        deleteToken();
        navigate("/login");
      } else {
        console.log("Error code: ", error.message);
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
  return fetch(
    `http://localhost:8000/api/v1/create_bucket?title=${newBucketTitle}&description=${newBucketDescription}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + fetchToken(),
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => setBuckets(data))
    .catch((error) => {
      if (error.message.startsWith("403")) {
        deleteToken();
        navigate("/login");
      } else {
        console.log("Error code: ", error.message);
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
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => setBuckets(data))
    .catch((error) => {
      if (error.message.startsWith("403")) {
        deleteToken();
        navigate("/login");
      } else {
        console.log("Error code: ", error.message);
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
    `http://localhost:8000/api/v1/add_user_to_bucket?bucket_id=${bucketID}&add_username=${username}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + fetchToken(),
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    })
    .catch((error) => {
      if (error.message.startsWith("403")) {
        deleteToken();
        navigate("/login");
      } else {
        console.log("Error code: ", error.message);
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
  return fetch(
    `http://localhost:8000/api/v1/update_bucket?bucket_id=${bucketID}`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + fetchToken(),
      },
      body: JSON.stringify(updatedData),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => setBucketContent(data))
    .catch((error) => {
      if (error.message.startsWith("403")) {
        deleteToken();
        navigate("/login");
      } else {
        console.log("Error code: ", error.message);
      }
    });
}
