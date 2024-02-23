import { createSlice } from '@reduxjs/toolkit';
import { FirestoreSliceType } from '../../Helpers/Types/FirebaseTypes';
import { GameDataType, VariableChangeType } from '../../Helpers/Types/GameTypes';
import { VariableEnum } from '../../Helpers/Enums/GameEnums';


const initialState: FirestoreSliceType = {
    gameSaves:[],
    selectedGameSaveSlot: 0
};

const firestoreSlice = createSlice({
    name: 'firestore',
    initialState,
    reducers: {
        setGameSaves: (state, action:{payload:Array<GameDataType>}) => {
            //validate data then set state
            
            state.gameSaves = action.payload.map((value) => {
                for (let card of value.cardBuffer){
                    //convert keys to upper case
                    const keys = ["option1", "option2"];
                    for(let key of keys){
                        const newOption1:VariableChangeType = {};
                        for(let variableChangeKey of Object.keys(card[key as "option1" | "option2"].variableChanges)){
                            newOption1[(variableChangeKey.toUpperCase() as VariableEnum)] = card[key as "option1" | "option2"].variableChanges[variableChangeKey as VariableEnum];
                        }
                        card[key as "option1" | "option2"].variableChanges = newOption1;
                    }
                }
                return value;
            })
        },
        setGameSlot: (state, action:{payload:number}) => {
            //set game slot
            state.selectedGameSaveSlot = action.payload;
        },
    }
})


export const {setGameSaves, setGameSlot} = firestoreSlice.actions;
export default firestoreSlice.reducer;