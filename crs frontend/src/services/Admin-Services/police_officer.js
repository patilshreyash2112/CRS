import axios from 'axios';
import config from '../../config';
const API_ENDPOINT = `${config.url}/api/police-officers`;

// Function to register a police officer
export const registerPoliceOfficer = async (officerData) => {
    try {
        const response = await axios.post(`${API_ENDPOINT}/register-officer`, officerData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error registering police officer:', error);
        throw error;
    }
};

// Function to fetch the list of police officers
export const fetchPoliceOfficers = async () => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching police officers:', error);
        throw error;
    }
};

// Function to delete a police officer
export const deletePoliceOfficer = async (officerId) => {
    try {
        await axios.delete(`${API_ENDPOINT}/${officerId}`);
    } catch (error) {
        console.error('Error deleting police officer:', error);
        throw error;
    }
};

// Function to update a police officer
export const updatePoliceOfficer = async (officerId, officerData) => {
    try {
        const response = await axios.put(`${API_ENDPOINT}/${officerId}`, officerData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating police officer:', error);
        throw error;
    }
};
