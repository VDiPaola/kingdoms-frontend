import { createSlice } from '@reduxjs/toolkit';
import { GameStateType, VariableChangeType } from '../../Helpers/Types/GameTypes';
import { VariableEnum } from '../../Helpers/Enums/GameEnums';
import { VariableChangeAmounts } from '../../Helpers/Constants';


const initialState: GameStateType = {
  name:"Steve",
  variables:[{
    percentage:50,
    variable:VariableEnum.Economy
  },
  {
    percentage:50,
    variable:VariableEnum.Piety
  },
  {
    percentage:50,
    variable:VariableEnum.Military
  }],
  year:540
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        variableChanges: (state, action) => {
            const vars = action.payload as VariableChangeType[];
           
            for(let vc of vars){
                const variable = state.variables.find(v => v.variable === vc.variable);
                if(variable && !isNaN(VariableChangeAmounts[vc.change])){
                    variable.percentage += VariableChangeAmounts[vc.change];
                    if(variable.percentage > 100) variable.percentage = 100;
                    if(variable.percentage < 0) variable.percentage = 0;
                }
            }

            return state;
        },
    }
})


export const {variableChanges} = gameSlice.actions;
export default gameSlice.reducer;