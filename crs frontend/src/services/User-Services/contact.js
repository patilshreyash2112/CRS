import axios from 'axios';
import config from '../../config'; 

const API_URL = `${config.url}/api/contactinfo`; 

// Get all contact information
export const getAllContactInformation = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching contact information:', error);
        throw error;
    }
};

// Post contact information
export const postContactInformation = async (contactInfo) => {
    try {
        const response = await axios.post(API_URL, contactInfo);
        return response.data;
    } catch (error) {
        console.error('Error posting contact information:', error);
        throw error;
    }
};
