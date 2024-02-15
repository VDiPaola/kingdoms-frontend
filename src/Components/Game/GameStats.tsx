import { GameVariableType } from "../../Helpers/Types/GameTypes";
import LoadingIcon from "../Shared/LoadingIcon";
import VariableIcon from "./VariableIcon";

export type GameStatsPropsType = {
    variables:Array<GameVariableType>
}

const GameStats = (props:GameStatsPropsType) => {
    return(
        <div className="w-full flex-1">
            <div className="flex justify-around items-center p-2">
                {props.variables.map((gameVar,_) => (
                    <LoadingIcon key={gameVar.variable} percentage={gameVar.percentage}>
                        <VariableIcon variable={gameVar.variable}/>
                    </LoadingIcon>
                ))}
            </div>
            
        </div>
    )
}

export default GameStats;