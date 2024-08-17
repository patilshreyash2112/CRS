import axios from 'axios';
import config from '../../config';

const API_ENDPOINT = `${config.url}/api/police-officers`;

// Function to handle police officer login
export const loginPoliceOfficer = async (email, password) => {
    try {
        const response = await axios.post(`${API_ENDPOINT}/login`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in police officer:', error);
        throw error;
    }
};
