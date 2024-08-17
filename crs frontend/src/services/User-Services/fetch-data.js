import axios from 'axios';
import config from '../../config';
const API_ENDPOINT = `${config.url}/api`;

export const fetchPoliceOfficers = async (id) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/police-officers/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching police officers:', error);
        throw error;
    }
};


export const fetchOfficersByStationId = async (stationId) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/police-officers/policeOfficersByStation/${stationId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching officers:', error);
        throw error;
    }
};

export const fetchPoliceStationById = async (id) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/police-stations/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching police station:', error);
        throw error;
    }
};

export const fetchUserById = async (userId) => {
    try {
        const response = await axios.get(`${config.url}/api/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};