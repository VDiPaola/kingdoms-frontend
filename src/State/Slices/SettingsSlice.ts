import { createSlice } from '@reduxjs/toolkit';
import { Language } from '../../Helpers/Enums/UserEnums';
import { SettingsType } from '../../Helpers/Types/SettingsTypes';



const initialState: SettingsType = {
  isDarkMode: true,
  language: Language.ENGLISH,
  musicEnabled: true,
  sfxEnabled: true
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload as boolean;
        },
        setLanguage: (state, action) => {
            state.language = action.payload as Language;
        },
        setMusicEnabled: (state, action) => {
            state.musicEnabled = action.payload as boolean;
        },
        setSfxEnabled: (state, action) => {
            state.sfxEnabled = action.payload as boolean;
        },
    }
})


export const {setDarkMode, setLanguage,setMusicEnabled,setSfxEnabled} = userSlice.actions;
export default userSlice.reducer;