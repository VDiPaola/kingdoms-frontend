import { Button } from "flowbite-react";
import { GameDataType } from "../../Helpers/Types/GameTypes";
import { LeftContainer, MiddleContainer, RightContainer } from "../ContainerComponents";
import TitleComponent from "../TitleComponent";
import { useAppSelector } from "../../State/Hooks";
import { useDispatch } from "react-redux";
import { setGameSlot } from "../../State/Slices/firestoreSlice";
import { PageEnum } from "../../Helpers/Enums/PageEnums";

type SaveContainerPropsType = {
    gameData:GameDataType;
    onClick:Function
}
const SaveContainer = (props:SaveContainerPropsType) => {
    const handleClick = () => {
        props.onClick(props.gameData.slot)
    }
    return (
        <div className="w-full flex justify-center items-center">
            <Button className="w-3/4" onClick={handleClick}>
                <div className="flex flex-col">
                    <p>{props.gameData.playerName}</p>
                    <p>Year: {props.gameData.year}</p>
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

    const handleClick = (slot: number) => {
        dispatch(setGameSlot(slot));
        props.setPage(PageEnum.Game);
    }

    return (
        <>
        <LeftContainer />
            <MiddleContainer>
                <TitleComponent />
                <div className="flex flex-col px-2 py-4 space-y-4 text-center">
                    <p>Select a Game Slot</p>
                    {gameSaves.map((data,i) => (
                        <SaveContainer key={i} gameData={data} onClick={handleClick}/>
                    ))}
                </div>
            </MiddleContainer>
            <RightContainer />
        </>
    )
}

export default GameSavesContainer;