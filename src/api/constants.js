export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
  TIMEOUT: parseInt(import.meta.env.VITE_API_IMEOUT),
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY:1000
};

export const API_ENDPOINTS = {
  TODOS:'/todos',
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR:"Unable to connect to server. Please check your internet connection.",
  UNAUTHORIZED: "Your session has expired. Please sign in again.",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Server error. Please try again later.",
  RATE_LIMITED: "Too many requests. Please slow down.",
  VALIDATION_ERROR: "Invalid input. Please check your data.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
};