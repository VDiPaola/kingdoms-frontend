import { createSlice } from '@reduxjs/toolkit';
import { GameStateType, VariableChangeType } from '../../Helpers/Types/GameTypes';
import { VariableChangeEnum, VariableEnum } from '../../Helpers/Enums/GameEnums';
import { VariableChangeAmounts } from '../../Helpers/Constants';


const initialState: GameStateType = {
  name:"Steve",
  variables:{
    [VariableEnum.Economy]:50,
    [VariableEnum.Piety]:50,
    [VariableEnum.Military]:50,
  },
  year:540
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        variableChanges: (state, action: {payload:VariableChangeType}) => {
          //process client side variable changes
            const variableKeys = Object.keys(state.variables);           
            for(let vck of Object.keys(action.payload)){
                const variableChangeKey:VariableEnum = vck as VariableEnum;
                const hasVariable = variableKeys.includes(variableChangeKey);
                const changeEnum = action.payload[variableChangeKey as VariableEnum]
                const variableChangeValue = VariableChangeAmounts[changeEnum as VariableChangeEnum];
                if(hasVariable && !isNaN(variableChangeValue)){
                    (state.variables[variableChangeKey] as number) += variableChangeValue;
                    if((state.variables[variableChangeKey] as number) > 100) state.variables[variableChangeKey] = 100;
                    if((state.variables[variableChangeKey] as number) < 0) state.variables[variableChangeKey] = 0;
                }
            }

            return state;
        },
    }
})


export const {variableChanges} = gameSlice.actions;
export default gameSlice.reducer;