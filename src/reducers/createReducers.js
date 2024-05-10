import { CreateService } from "../services/CreateService";
export const createReducers = (state = [], action) => {
  switch (action.type) {
    case "CreateCV":
      CreateService("cv", action.body, action.length);
      return state;
    case "CreateJob":
      CreateService("jobs", action.body, action.length);
      return state;
    case "CreateCompany":
      CreateService("company", action.body, action.length);
      return state;
    case "CreateApplicant":
      CreateService("applicant", action.body, action.length);
      return state;
    default:
      return state;
  }
};
