import {
  getDatabase,
  ref,
  remove,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";

export const deleteAllByCompany = async (id) => {
  console.log(id);
  const db = getDatabase();
  const userRef = ref(db, "company/" + (id - 1));
  const cvsRef = ref(db, "cv");
  const jobRef = ref(db, "jobs");

  try {
    // Query all CVs associated with the user
    const cvsQuery = query(cvsRef, orderByChild("companyId"), equalTo(id));
    const jobsQuery = query(jobRef, orderByChild("idCompany"), equalTo(id));

    // console.log(cvsRef);
    const snapshot1 = await get(cvsQuery);
    const snapshot2 = await get(jobsQuery);
    // Delete each CV
    snapshot1.forEach((cvSnapshot) => {
      remove(ref(db, "cv/" + cvSnapshot.key));
    });
    snapshot2.forEach((cvSnapshot) => {
      remove(ref(db, "jobs/" + cvSnapshot.key));
    });
    // Delete the user
    await remove(userRef);
    console.log("User and related CVs deleted successfully");
  } catch (error) {
    console.error("Error deleting user and CVs: ", error);
  }
};
