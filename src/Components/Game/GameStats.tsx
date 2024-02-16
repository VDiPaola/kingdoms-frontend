import { GameVariableType, VariableChangeType } from "../../Helpers/Types/GameTypes";
import LoadingIcon from "../Shared/LoadingIcon";
import VariableIcon from "./VariableIcon";
import { IoIosArrowUp } from "react-icons/io";

export type GameStatsPropsType = {
    variables:Array<GameVariableType>,
    variableChanges?:Array<VariableChangeType>
}

const GameStats = (props:GameStatsPropsType) => {
    return(
        <div className="w-full flex-1">
            <div className="flex justify-around items-center p-2">
                {props.variables.map((gameVar,_) => {
                    //get variable changes for variable
                    const variableChange = props.variableChanges?.find(vc => vc.variable === gameVar.variable);
                    let isNegative = true;
                    if(variableChange){
                        isNegative = variableChange.change.toLowerCase().includes("negative");
                    }
                    //set icon classes
                    let classBuilder = "opacity-0";
                    if(variableChange !== undefined){
                        classBuilder = `${isNegative ? "text-red-500 rotate-180" : "text-green-500"}`;
                    }
                
                    return(
                        <div key={gameVar.variable} className="flex flex-col justify-center items-center">
                            <IoIosArrowUp className={classBuilder}/>
                            <LoadingIcon percentage={gameVar.percentage}>
                                <VariableIcon variable={gameVar.variable}/>
                            </LoadingIcon>
                        </div>
                    
                )})}
            </div>
            
        </div>
    )
}

export default GameStats;