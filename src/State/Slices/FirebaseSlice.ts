import { createSlice } from '@reduxjs/toolkit';
import { FirebaseSliceType } from '../../Helpers/Types/FirebaseTypes';
import firebase from 'firebase/compat/app';


const initialState: FirebaseSliceType = {

};

const firebaseSlice = createSlice({
    name: 'firebase',
    initialState,
    reducers: {
        setDatabase: (state, action:{payload:firebase.database.Database}) => {
            state.database = action.payload
        },
    }
})


export const {setDatabase} = firebaseSlice.actions;
export default firebaseSlice.reducer;