import { Get } from "../utils/requestFirebase";

export const getCVByCompany = async (id) => {
  const response = await Get("cv");
  const result = response.filter(
    (job) =>
      parseInt(job.companyId) === parseInt(id) && job.deletedAdmin === false
  );
  if (result) {
    return result;
  }
};
