import { Button } from "flowbite-react";
import { MdDeleteForever } from "react-icons/md";
import { GameDataType } from "../../Helpers/Types/GameTypes";

type SaveContainerPropsType = {
    gameData?:GameDataType;
    onClick:(slot:number, isNewGame:boolean) => void;
    onDeleteClick:() => void;
    slot:number;
}
const SaveContainer = (props:SaveContainerPropsType) => {
    const handleClick = () => {
        props.onClick(props.slot, props.gameData === undefined);
    }

    const handleDeleteClick = () => {
        props.onDeleteClick();
    }
    return (
        <div className="w-full flex justify-center items-center">
            <Button className="w-3/4 relative" onClick={handleClick}>
                <div className="flex flex-col">
                    <p>{props.gameData ? props.gameData.playerName : "New Game"}</p>
                    {props.gameData && <p>Year: {props.gameData.year}</p>}
                </div>

                
            </Button>

            <MdDeleteForever className="hover:text-gray-500 cursor-pointer text-lg mx-2" onClick={handleDeleteClick} />
            
        </div>
        
    )
}

export default SaveContainer;