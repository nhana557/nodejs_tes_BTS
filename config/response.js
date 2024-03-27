const headers = { Content_Type: 'application/json' };

// returning data success to response, it will be impolemented on express callback
export const successResponse = (
  data,
  message = 'success',
  statusCode = 200,
) => {
  const response = {
    headers,
    statusCode,
    body: { statusCode, message, data },
  };

  return response;
};

// // returning data error to response, it will be impolemented on express callback
// export const errorResponse = (validationErrors = {}) => {
//   const response = {
//     headers,
//     statusCode: 400,
//     body: { validationErrors },
//   };
//   return response;
// };

// export const errorValidation = (validationErrors = {}, message = 'failed') =>
//   errorResponse(400, message, validationErrors);
