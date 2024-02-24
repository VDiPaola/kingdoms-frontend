import { Button } from "flowbite-react";
import { GameDataType } from "../../Helpers/Types/GameTypes";
import { LeftContainer, MiddleContainer, RightContainer } from "../ContainerComponents";
import TitleComponent from "../TitleComponent";
import { useAppDispatch, useAppSelector } from "../../State/Hooks";
import { useDispatch } from "react-redux";
import { setGameSlot } from "../../State/Slices/firestoreSlice";
import { PageEnum } from "../../Helpers/Enums/PageEnums";

type SaveContainerPropsType = {
    gameData?:GameDataType;
    onClick:(slot:number, isNewGame:boolean) => void;
    slot:number;
}
const SaveContainer = (props:SaveContainerPropsType) => {
    const handleClick = () => {
        props.onClick(props.slot, props.gameData === undefined);
    }
    return (
        <div className="w-full flex justify-center items-center">
            <Button className="w-3/4" onClick={handleClick}>
                <div className="flex flex-col">
                    <p>{props.gameData ? props.gameData.playerName : "New Game"}</p>
                    {props.gameData && <p>Year: {props.gameData.year}</p>}
                </div>
            </Button>
        </div>
        
    )
}


type GameSavesContainerPropsType = {
    setPage:Function;
}

const GameSavesContainer = (props:GameSavesContainerPropsType) => {

    const gameSaves = useAppSelector(state => state.firestore.gameSaves);

    const dispatch = useDispatch();

    const handleClick = (slot: number, isNewGame:boolean) => {
        dispatch(setGameSlot(slot));
        if(isNewGame){
            props.setPage(PageEnum.NewGame);
        }else{
            props.setPage(PageEnum.Game);
        }
        
    }

    return (
        <>
        <LeftContainer />
            <MiddleContainer>
                <div className="flex flex-col px-2 py-4 space-y-4 text-center">
                    <p>Select a Game Slot</p>
                    {[0,1,2].map((_,i) => {
                        let data = gameSaves.find(save => save.slot === i);
                        return(<SaveContainer key={i} gameData={data} slot={i} onClick={handleClick}/>)
                    })}
                </div>
            </MiddleContainer>
            <RightContainer />
        </>
    )
}

export default GameSavesContainer;