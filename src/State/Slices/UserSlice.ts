import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../Helpers/Types/UserTypes';
import { Role } from '../../Helpers/Enums/UserEnums';



const initialState: UserType = {
    email: '',
    password: '',
    author_name: '',
    last_login_unix: 0,
    role: Role.USER,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const userData = action.payload as UserType;
            console.log(userData)
            return {
                ...state,
                ...userData,
                last_login_unix: new Date().getTime()
            };
        },
        logout: (state) => {
            let lastLogin = state.last_login_unix;
            return {
                ...initialState,
                last_login_unix: lastLogin,
            };
        },
        setAuthor: (state, action) => {
            state.author_name = action.payload;
            return state;
        }

    }
})


export const {login, logout, setAuthor} = userSlice.actions;
export default userSlice.reducer;