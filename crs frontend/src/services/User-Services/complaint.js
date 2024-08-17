import axios from 'axios'
import config from '../../config'

const API_URL = `${config.url}/api/complaints`;

// Get all complaints 
export const getAllComplaints = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching complaints:', error);
        throw error;
    }
};

// Get all complaints for particular police station 
export const getAllComplaintsOfPoliceStations = async (policeStationId) => {
    try {
        const response = await axios.get(`${API_URL}/policeStation/${policeStationId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching complaints:', error);
        throw error;
    }
};

// Get all pending complaints
export const getAllPendingComplaints = async () => {
    try {
        const response = await axios.get(`${API_URL}/Pending`);
        return response.data;
    } catch (error) {
        console.error('Error fetching complaints:', error);
        throw error;
    }
};

// Get all pending complaints of particular police station
export const getAllPendingComplaintsOfPoliceStation = async (policeStationId) => {
    try {
        const response = await axios.get(`${API_URL}/Pending/${policeStationId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching complaints:', error);
        throw error;
    }
};

// Get all assigned complaints 
export const getAllAssignedComplaints = async () => {
    try {
        const response = await axios.get(`${API_URL}/Assigned`);
        return response.data;
    } catch (error) {
        console.error('Error fetching complaints:', error);
        throw error;
    }
};
// Get all assigned complaints of particular police Station
export const getAllAssignedComplaintsofPoliceStation = async (policeStationId) => {
    try {
        const response = await axios.get(`${API_URL}/Assigned/${policeStationId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching complaints:', error);
        throw error;
    }
};
// Get complaint by ID
export const getComplaintById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching complaint details:', error);
        throw error;
    }
};

// Get all complaints of particular user
export const getComplaints = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response;
    } catch (error) {
        console.error('Error fetching complaints:', error);
        throw error;
    }
};

// Create a new complaint
export const registerComplaint = async (complaintDTO) => {
    try {
        const response = await axios.post(`${API_URL}/register`, complaintDTO, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error registering complaint:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

// Delete a complaint
export const deleteComplaint = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting complaint:', error);
        throw error;
    }
};


export const updateComplaint = async (id, complaintData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, complaintData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the updated complaint data
    } catch (error) {
        console.error('Error updating complaint:', error);
        throw error; // Re-throw the error to handle it in the component
    }
};
