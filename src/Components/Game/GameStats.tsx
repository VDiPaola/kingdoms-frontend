import { useMemo } from "react";
import { GameVariableType, VariableChangeType } from "../../Helpers/Types/GameTypes";
import LoadingIcon from "../Shared/LoadingIcon";
import VariableIcon from "./VariableIcon";
import { IoIosArrowUp } from "react-icons/io";
import { VariableEnum } from "../../Helpers/Enums/GameEnums";

export type GameStatsPropsType = {
    variables:GameVariableType,
    variableChanges?:VariableChangeType
}

const GameStats = (props:GameStatsPropsType) => {
    const variableChangesKeys = useMemo(()=>(Object.keys(props.variableChanges || {})),[props.variableChanges])
    const variableKeys = useMemo(()=>(Object.keys(props.variables || {})),[props.variables])
    return(
        <div className="w-full flex-1">
            <div className="flex justify-around items-center p-2">
                {variableKeys.sort().map((variableKey,_) => {
                    const variablePercent = props.variables[variableKey as VariableEnum];
                    let classBuilder = "opacity-0";
                    //get variable changes for variable
                    
                    if(props.variableChanges){
                        //check if variable has a variable change
                        const hasVariableChange = variableChangesKeys.includes(variableKey);
                        const variableChangeValue = props.variableChanges[variableKey as VariableEnum];
                        let isNegative = true;
                        if(hasVariableChange && variableChangeValue){
                            isNegative = variableChangeValue.toLowerCase().includes("negative");
                        }
                        //set icon classes
                        if(hasVariableChange){
                            classBuilder = `${isNegative ? "text-red-500 rotate-180" : "text-green-500"}`;
                        }
                    }
                    
                
                    return(
                        <div key={variableKey} className="flex flex-col justify-center items-center">
                            <IoIosArrowUp className={classBuilder}/>
                            <LoadingIcon percentage={variablePercent ?? 0}>
                                <VariableIcon variable={variableKey as VariableEnum}/>
                            </LoadingIcon>
                        </div>
                    
                )})}
            </div>
            
        </div>
    )
}

export default GameStats;