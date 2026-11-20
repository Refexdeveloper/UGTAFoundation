exports.responseStatus = (res, statusCode, message, data = null) => {
  const payload = {
    success: statusCode >= 200 && statusCode < 300,
    message,
  };
  if (data !== null && data !== undefined) {
    if (typeof data === 'object' && !Array.isArray(data) && data.error) {
      payload.error = data.error;
    } else {
      payload.data = data;
    }
  }
  return res.status(statusCode).json(payload);
};
