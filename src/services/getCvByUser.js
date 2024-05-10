import { Get } from "../utils/requestFirebase";

export const getCvByUser = async (id) => {
  const response = await Get("cv");
  const result = response.filter((cv) => parseInt(cv.idUser) === parseInt(id));
  if (result) {
    return result;
  }
};
