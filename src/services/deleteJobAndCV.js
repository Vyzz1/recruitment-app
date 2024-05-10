import {
  getDatabase,
  ref,
  remove,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";

export const deleteJobAndCV = async (id) => {
  console.log(id);
  const db = getDatabase();
  const jobRef = ref(db, "jobs/" + (id - 1));
  const cvsRef = ref(db, "cv");

  try {
    // Query all CVs associated with the user
    const cvsQuery = query(cvsRef, orderByChild("jobId"), equalTo(id));

    // console.log(cvsRef);
    const snapshot = await get(cvsQuery);

    // Delete each CV
    snapshot.forEach((cvSnapshot) => {
      remove(ref(db, "cv/" + cvSnapshot.key));
    });

    // Delete the user
    await remove(jobRef);
    console.log("Job and related CVs deleted successfully");
  } catch (error) {
    console.error("Error deleting job and CVs: ", error);
  }
};
