import { Get } from "../utils/requestFirebase";

export const getCvByJobs = async (id) => {
  const response = await Get("cv");
  const result = response.filter(
    (job) => parseInt(job.jobId) === parseInt(id) && job.deletedAdmin === false
  );
  if (result) {
    return result;
  }
};
