import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginService } from '../services/User-Services/user'; // Import your login service

// Initial state
const initialState = {
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  isLoggedIn: !!sessionStorage.getItem('user'),
  status: 'idle', // Add status for tracking the state of the async operation
  error: null
};

// Create an async thunk for login
export const login = createAsyncThunk('auth/login', async (loginDTO, { rejectWithValue }) => {
  try {
    const response = await loginService(loginDTO);
    return response; // Return the response data for use in reducers
  } catch (error) {
    return rejectWithValue(error.response.data); // Handle errors
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      sessionStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'; // Set loading status
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        sessionStorage.setItem('user', JSON.stringify(action.payload));
        sessionStorage.setItem('id', action.payload.id);
        sessionStorage.setItem('userName', action.payload.userName);
        state.status = 'succeeded'; // Set succeeded status
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'; // Set failed status
        state.error = action.payload; // Capture error message
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
