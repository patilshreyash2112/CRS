import axios from 'axios';
import config from '../../config';

const API_ENDPOINT = `${config.url}/api/police-stations`;

// Function to fetch the list of police stations
export const fetchPoliceStations = async () => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching police stations:', error);
        throw error;
    }
};

// Function to register a police station
export const registerPoliceStation = async (policeStationDTO) => {
    // const formData = new FormData();
    // formData.append("policeStationDTO", new Blob([JSON.stringify(policeStationDTO)], {
    //     type: "application/json"
    // }));

    try {
        const response = await axios.post(`${API_ENDPOINT}/register-station`, policeStationDTO
        );
        return response.data;
    } catch (error) {
        console.error('Error registering police station:', error);
        throw error;
    }
};

// Function to fetch a police station by ID
export const fetchPoliceStationById = async (id) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching police station:', error);
        throw error;
    }
};

// Function to update a police station
export const updatePoliceStation = async (stationId, policeStationDTO) => {
    
    try {
        const response = await axios.put(`${API_ENDPOINT}/${stationId}`, policeStationDTO
        );
        return response.data;
    } catch (error) {
        console.error('Error updating police station:', error);
        throw error;
    }
};

// Function to delete a police station
export const deletePoliceStation = async (stationId) => {
    try {
        await axios.delete(`${API_ENDPOINT}/${stationId}`);
    } catch (error) {
        console.error('Error deleting police station:', error);
        throw error;
    }
};
