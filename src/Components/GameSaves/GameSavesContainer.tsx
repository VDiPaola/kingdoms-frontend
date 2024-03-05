
import { LeftContainer, MiddleContainer, RightContainer } from "../ContainerComponents";
import { useAppSelector } from "../../State/Hooks";
import { useDispatch } from "react-redux";
import { removeGameSave, setGameSlot } from "../../State/Slices/firestoreSlice";
import { PageEnum } from "../../Helpers/Enums/PageEnums";
import SaveContainer from "./SaveContainer";
import { useState } from "react";
import OverlayContainer from "../Shared/OverlayContainer";
import DeleteOverlay from "./DeleteOverlay";
import { GameNetworkManager } from "../../Helpers/Networking/GameNetworkManager";


type GameSavesContainerPropsType = {
    setPage:Function;
}

const GameSavesContainer = (props:GameSavesContainerPropsType) => {
    const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
    const [selectedGameSlot, setSelectedGameSlot] = useState(-1);

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

    const handleDeleteClick = ():Promise<void> => {
        const gameSlot = selectedGameSlot;
        return new Promise((resolve,reject)=>{
            // delete game save
            if(gameSlot >= 0){
                GameNetworkManager.DeleteGameSave(gameSlot)
                .then(() => {
                    // deleted - update state
                    deleteOverlayHide();
                    dispatch(removeGameSave(gameSlot));
                    resolve();
                })
                .catch((error)=>{
                    reject();
                })
            }else{
                reject();
            }
        })
        
    }

    const deleteOverlayHide = () => {
        setShowDeleteOverlay(false);
    }

    const handleDeleteIconClick = (slot:number) => {
        setSelectedGameSlot(slot);
        setShowDeleteOverlay(true);
    }

    return (
        <>
        <OverlayContainer enabled={showDeleteOverlay} close={deleteOverlayHide}>
            <DeleteOverlay onCancelClick={deleteOverlayHide} onDeleteClick={handleDeleteClick}/>
        </OverlayContainer>

        <LeftContainer />
            <MiddleContainer>
                <div className="flex flex-col px-2 py-4 space-y-4 text-center">
                    <p>Select a Game Slot</p>
                    {[0,1,2].map((_,i) => {
                        let data = gameSaves.find(save => save.slot === i);
                        return(<SaveContainer key={i} gameData={data} slot={i} onClick={handleClick} onDeleteClick={()=>{handleDeleteIconClick(i)}}/>)
                    })}
                </div>
            </MiddleContainer>
            <RightContainer />
        </>
    )
}

export default GameSavesContainer;