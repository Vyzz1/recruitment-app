export const createApplicant = (body, length) => {
  let data = { ...body, id: length + 1 };
  return {
    type: "CreateApplicant",
    body: data,
    length: length,
  };
};
