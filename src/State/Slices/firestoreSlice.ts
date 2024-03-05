import { createSlice } from '@reduxjs/toolkit';
import { FirestoreSliceType } from '../../Helpers/Types/FirebaseTypes';
import { CardType, GameDataType, VariableChangeType } from '../../Helpers/Types/GameTypes';
import { VariableChangeEnum, VariableEnum } from '../../Helpers/Enums/GameEnums';
import { VariableChangeAmounts } from '../../Helpers/Constants';
import { UseCardRequestType } from '../../Helpers/Types/NetworkTypes';
import { GameNetworkManager } from '../../Helpers/Networking/GameNetworkManager';


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
        updateGameSave: (state,action:{payload:GameDataType}) => {
            const index = state.gameSaves.findIndex(save => save.slot === action.payload.slot);
            if(index >= 0){
                state.gameSaves[index] = action.payload;
            }else{
                state.gameSaves.push(action.payload);
            }
        },
        setGameSlot: (state, action:{payload:number}) => {
            //set game slot
            state.selectedGameSaveSlot = action.payload;
        },
        variableChanges: (state, action: {payload:VariableChangeType}) => {
            //process client side variable changes
            const gameSaveIndex = state.gameSaves.findIndex(save => save.slot === state.selectedGameSaveSlot);
            if(gameSaveIndex >= 0){
                const variableKeys = Object.keys(state.gameSaves[gameSaveIndex].variables);           
                for(let vck of Object.keys(action.payload)){
                    const variableChangeKey:VariableEnum = vck as VariableEnum;
                    const hasVariable = variableKeys.includes(variableChangeKey);
                    const changeEnum = action.payload[variableChangeKey as VariableEnum]
                    const variableChangeValue = VariableChangeAmounts[changeEnum as VariableChangeEnum];
                    if(hasVariable && !isNaN(variableChangeValue)){
                        (state.gameSaves[gameSaveIndex].variables[variableChangeKey] as number) += variableChangeValue;
                        if((state.gameSaves[gameSaveIndex].variables[variableChangeKey] as number) > 100) state.gameSaves[gameSaveIndex].variables[variableChangeKey] = 100;
                        if((state.gameSaves[gameSaveIndex].variables[variableChangeKey] as number) < 0) state.gameSaves[gameSaveIndex].variables[variableChangeKey] = 0;
                    }
                }
    
                return state;
            }
              
        },
        addCard: (state, action: {payload:CardType}) => {
            // adds card to buffer
            const gameSaveIndex = state.gameSaves.findIndex(save => save.slot === state.selectedGameSaveSlot);
            if(gameSaveIndex >= 0){
                state.gameSaves[gameSaveIndex].cardBuffer.push(action.payload);
            }
        
        },
        addCards: (state, action: {payload:CardType[]}) => {
            // adds cards to buffer
            const gameSaveIndex = state.gameSaves.findIndex(save => save.slot === state.selectedGameSaveSlot);
            if(gameSaveIndex >= 0){
                state.gameSaves[gameSaveIndex].cardBuffer.push(...action.payload);
            }
        },
        removeCard: (state) => {
            // removes card from buffer
            const gameSaveIndex = state.gameSaves.findIndex(save => save.slot === state.selectedGameSaveSlot);
            if(gameSaveIndex >= 0){
                state.gameSaves[gameSaveIndex].cardBuffer.splice(0,1);
            }
        
        },
        removeGameSave: (state, action: {payload:number}) => {
            // removes card from buffer
            const gameSaveIndex = state.gameSaves.findIndex(save => save.slot === action.payload);
            if(gameSaveIndex >= 0){
                state.gameSaves.splice(gameSaveIndex, 1);
            }
        
        },
    }
})


export const {setGameSaves, setGameSlot, updateGameSave, variableChanges, addCard, addCards, removeCard, removeGameSave} = firestoreSlice.actions;
export default firestoreSlice.reducer;