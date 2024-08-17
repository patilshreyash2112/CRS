import axios from 'axios';
import config from '../../config'; // Adjust the import path as needed

const API_ENDPOINT = `${config.url}/api/admin`;

export const saveAdmin = async (adminDTO) => {
    try {
        const response = await axios.post(`${API_ENDPOINT}/save`, adminDTO);
        return response.data;
    } catch (error) {
        console.error('Error saving admin:', error);
        throw error;
    }
};

export const loginAdmin = async (email, password) => {
    try {
        const response = await axios.post(`${API_ENDPOINT}/login`, null, {
            params: { email, password }
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in admin:', error);
        throw error;
    }
};
