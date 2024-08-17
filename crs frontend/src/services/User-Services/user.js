import axios from 'axios'
import config from '../../config'

const API_ENDPOINT = `${config.url}/api/user`;

/**
 * Registers a new user.
 * 
 * @param {Object} userDTO - The user data to be sent to the server.
 * @returns {Promise<Object>} - The response from the server.
 */
export const register = async (userDTO) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/register`, userDTO, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

/**
 * Logs in a user.
 * 
 * @param {Object} loginDTO - The login data to be sent to the server.
 * @returns {Promise<Object>} - The response from the server.
 */
export const login = async (loginDTO) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/login`, loginDTO, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};