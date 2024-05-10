import {
  getDatabase,
  ref,
  remove,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";

export const deleteUserAndCvs = async (userId) => {
  console.log(userId);
  const db = getDatabase();
  const userRef = ref(db, "applicant/" + (userId - 1));
  const cvsRef = ref(db, "cv");

  try {
    // Query all CVs associated with the user
    const cvsQuery = query(cvsRef, orderByChild("idUser"), equalTo(userId));

    // console.log(cvsRef);
    const snapshot = await get(cvsQuery);

    // Delete each CV
    snapshot.forEach((cvSnapshot) => {
      remove(ref(db, "cv/" + cvSnapshot.key));
    });

    // Delete the user
    await remove(userRef);
    console.log("User and related CVs deleted successfully");
  } catch (error) {
    console.error("Error deleting user and CVs: ", error);
  }
};
