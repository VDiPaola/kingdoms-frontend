import { createSlice } from '@reduxjs/toolkit';
import { AuthType } from '../../Helpers/Types/UserTypes';


const initialState: AuthType = {
  isAuthenticated: false,
  lastAuthenticatedUnix: 0,
  hasAuthenticated: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        auth: (state) => {
            state.isAuthenticated = true;
            state.lastAuthenticatedUnix = new Date().getTime();
            state.hasAuthenticated = true;
        },
        unauth: (state) => {
            state.isAuthenticated = false;
        }
    }
})


export const {auth, unauth} = authSlice.actions;
export default authSlice.reducer;