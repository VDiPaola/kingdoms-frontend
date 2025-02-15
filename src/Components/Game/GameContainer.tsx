import { useEffect, useMemo, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../State/Hooks";
import { addCard, addCards, removeCard, updateGameSave, variableChanges } from "../../State/Slices/firestoreSlice";
import { CardType, VariableChangeType } from "../../Helpers/Types/GameTypes";
import GameStats from "./GameStats";
import GameContent from "./GameContent";
import useSound from "use-sound";
import { ImVolumeMute2,ImVolumeMedium } from "react-icons/im";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

import throwSfx from '../../sfx/card_swipe.mp3'
import { LeftContainer, MiddleContainer, RightContainer } from "../ContainerComponents";
import { setMusicEnabled } from "../../State/Slices/SettingsSlice";
import { PageEnum } from "../../Helpers/Enums/PageEnums";
import { ref, set, getDatabase } from 'firebase/database';
import { GameNetworkManager } from "../../Helpers/Networking/GameNetworkManager";


type GameContainerPropsType = {
    setMusic:Function,
    setPage:(page:PageEnum) => any
}

const GameContainer = (props:GameContainerPropsType) => {
    //game datta
    const slot = useAppSelector(state => state.firestore.selectedGameSaveSlot);
    const gameSaves = useAppSelector(state => state.firestore.gameSaves);
    const gameSave = gameSaves.find(save => save.slot === slot);
    //const [cards, setCards]: [Array<CardType>,any] = useState(gameSave?.cardBuffer || []);
    const cards = useMemo(()=> {
        return gameSave?.cardBuffer ?? [];
    }, [gameSave]);

    const isMusicEnabled = useAppSelector(state => state.settings.musicEnabled);

    const [cardDeg, setCardDeg] = useState(0);

    const maxDegRef = useRef<number>(window.screen.availWidth / 90);

    const isProcessingRef = useRef<boolean>(false);
    const [isCardThrown, setIsCardThrown] = useState(false);

    const [selectedVariableChanges,setSelectedVariableChanges]: [VariableChangeType | undefined,any] = useState();

    //sfx
    const [throwSFXPlay] = useSound(throwSfx);

    const dispatch = useAppDispatch();

    useEffect(()=>{
        // const db = getDatabase();
        // set(ref(db, 'cards'), {
        //   username: name,
        // });

    }, [])

    const handleMouseMove = (distance:number) => {
        //card animation
        if(distance > maxDegRef.current) distance = maxDegRef.current;
        if(distance < -maxDegRef.current) distance = -maxDegRef.current;
        setCardDeg(-distance);

        //variable changes
        if(!isProcessingRef.current){
            if(distance < 0){
                if (selectedVariableChanges !== cards[0].option1.variableChanges) setSelectedVariableChanges(cards[0].option1.variableChanges);
            }else if(distance > 0){
                if (selectedVariableChanges !== cards[0].option2.variableChanges) setSelectedVariableChanges(cards[0].option2.variableChanges);
            }else{
                setSelectedVariableChanges(undefined);
            }
        }
        
    }

    const handleGameControllerClick  = (side:"left" | "right") => {
        if(isProcessingRef.current) return;
        isProcessingRef.current = true;
        setSelectedVariableChanges(undefined);
        
        //picks a decision
        switch(side){
            case "left":
                dispatch(variableChanges(cards[0].option2.variableChanges));
                break;
            case "right":
                dispatch(variableChanges(cards[0].option1.variableChanges));
                break;
        }

        // use card on back end
        GameNetworkManager.UseCard({cardUID:cards[0].uid, option:side === "left" ? "option1" : "option2", slot:gameSave!.slot})
        .then((gameSave) => {
            dispatch(updateGameSave(gameSave));
        })

        //throws current card
        setIsCardThrown(true);
        throwSFXPlay();
    }

    const turnNextCard = () => {
        setCardDeg(0);
        setIsCardThrown(false);

        dispatch(removeCard());

        isProcessingRef.current = false;
    }

    const handleMuteClick = () => {
        const isEnabled = !isMusicEnabled;
        props.setMusic(isEnabled);
        dispatch(setMusicEnabled(isEnabled));
    }
    

    const handleHomeClick = () => {
        //make sure its saved then go to home page
        props.setPage(PageEnum.Home);
    }

    const handleSettingsClick = () => {
        props.setPage(PageEnum.Settings);
    }

    return (
        <>
        <LeftContainer>
            <div className="h-full w-full flex flex-col justify-end">
                <div className="flex flex-col">
                    <p className="font-bold text-xl px-4 py-2">{gameSave?.playerName || ""}</p>
                    <p className="font-bold text-xl px-4 py-2">{gameSave?.playerTitle || ""}</p>
                </div>
                
            </div>
        </LeftContainer>

        <MiddleContainer hasTitle={false}>
            {gameSave && <>
                <GameStats variables={gameSave.variables} variableChanges={isProcessingRef.current ? undefined : selectedVariableChanges}/>
                {cards.length > 0 && 
                    <GameContent 
                        GameControllerProps={{onClick:handleGameControllerClick,onMouseMove:handleMouseMove}} 
                        cardDeg={cardDeg}
                        card={cards[0]}
                        isThrown={isCardThrown}
                        turnNextCard={turnNextCard}/>
                }
                    
                <div className="w-full flex-1">
                    <div className="w-full flex justify-center items-center p-2 relative space-x-2 text-lg">

                        <div className="hover:drop-shadow-md hover:scale-105 transition-all duration-100 ease-out cursor-pointer p-1 relative z-50" onClick={handleHomeClick}>
                            <FaHome />
                        </div>

                        <div className="hover:drop-shadow-md hover:scale-105 transition-all duration-100 ease-out cursor-pointer p-1 relative z-50" onClick={handleSettingsClick}>
                            <IoMdSettings />
                        </div>

                        <div className="hover:drop-shadow-md hover:scale-105 transition-all duration-100 ease-out cursor-pointer p-1 relative z-50" onClick={handleMuteClick}>
                            {isMusicEnabled ? <ImVolumeMedium /> : <ImVolumeMute2 /> }
                        </div>
                    </div>
                    
                </div>
            </>}
            
        </MiddleContainer>
            

        <RightContainer>
            <div className="flex flex-col">
                <p>{gameSave?.year ?? ""}</p>
                <p>{gameSave?.season ?? ""}</p>
            </div>
            
        </RightContainer>
        </>
    )
}

export default GameContainer;