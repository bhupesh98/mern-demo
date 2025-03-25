export function response_200(res, data) {
  return res.status(200).json({
    status: 'OK',
    data,
  });
}

export function response_201(res, data) {
  return res.status(201).json({
    status: 'Inserted',
    data,
  });
}

export function response_400(res, message) {
  return res.status(400).json({
    status: 'error',
    error: message,
    message: 'Bad request',
  });
}

export function response_401(res, message) {
  return res.status(401).json({
    status: 'error',
    error: message,
    message: 'Unauthorized',
  });
}

export function response_403(res, message) {
  return res.status(403).json({
    status: 'error',
    error: message,
    message: 'Forbidden',
  });
}

export function response_404(res, message) {
  return res.status(404).json({
    status: 'error',
    error: message,
    message: 'Not found',
  });
}

export function response_500(res, log_message, err) {
  let message = err != null ? `${log_message}: ${err}` : log_message;

  console.debug(message);

  return res.status(500).json({
    status: 'error',
    error: `Something went wrong.\n${message}`,
    message: 'Internal server error',
  });
}
