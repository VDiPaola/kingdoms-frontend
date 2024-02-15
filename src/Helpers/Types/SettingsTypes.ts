import { Language } from "../Enums/UserEnums";

export type SettingsType = {
    isDarkMode: boolean;
    language: Language;
    musicEnabled:boolean;
    sfxEnabled:boolean;
};