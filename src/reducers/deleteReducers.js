import { DeleteService } from "../services/DeleteService";
import { deleteAllByCompany } from "../services/deleteAllByCompany";
import { deleteJobAndCV } from "../services/deleteJobAndCV";
import { deleteUserAndCvs } from "../services/deleteUserAndCvs";
export const deleteReducers = (state = [], action) => {
  switch (action.type) {
    case "DELETE":
      if (action.path === "jobs") {
        deleteJobAndCV(action.id);
        return state;
      }
      DeleteService(action.path, action.id);
      return state;
    case "DELETE_USER_CV":
      // console.log(action);
      deleteUserAndCvs(action.idUser);
      return state;
    case "DELETE_COMPANY_ALL":
      deleteAllByCompany(action.id);
      return state;
    default:
      return state;
  }
};
