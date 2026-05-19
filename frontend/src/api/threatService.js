import axios from "axios";

// Create Axios instance with base URL
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Track connectivity status
let isConnected = true;

/**
 * Get prediction from backend
 * @returns {Promise} - { prediction, severity, timestamp }
 */
export const getPrediction = async () => {
  try {
    const response = await apiClient.get("/predict");
    isConnected = true;
    return {
      ...response.data,
      timestamp: new Date(),
      error: null,
    };
  } catch (error) {
    isConnected = false;
    console.error("Prediction API error:", error.message);
    return {
      prediction: null,
      severity: null,
      timestamp: new Date(),
      error: error.message,
    };
  }
};

/**
 * Check backend connectivity
 * @returns {Promise<boolean>}
 */
export const checkConnectivity = async () => {
  try {
    await apiClient.get("/");
    isConnected = true;
    return true;
  } catch (error) {
    isConnected = false;
    console.error("Backend unavailable:", error.message);
    return false;
  }
};

/**
 * Get current connectivity status
 * @returns {boolean}
 */
export const getConnectionStatus = () => isConnected;

/**
 * Set up polling for predictions
 * @param {number} interval - polling interval in ms
 * @param {Function} onUpdate - callback when new prediction received
 * @param {Function} onError - callback on error
 * @returns {Function} - cleanup function
 */
export const setupPredictionPolling = (interval = 6000, onUpdate, onError) => {
  const poll = async () => {
    const result = await getPrediction();
    if (result.error) {
      onError?.(result.error);
    } else {
      onUpdate?.(result);
    }
  };

  // Initial call
  poll();

  // Set up interval
  const intervalId = setInterval(poll, interval);

  // Return cleanup function
  return () => clearInterval(intervalId);
};

export default apiClient;
