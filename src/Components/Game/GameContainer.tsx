import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../State/Hooks";
import { VariableChangeEnum, VariableEnum } from "../../Helpers/Enums/GameEnums";
import { variableChanges } from "../../State/Slices/GameSlice";
import { CardType, GameDataType, VariableChangeType } from "../../Helpers/Types/GameTypes";
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


type GameContainerPropsType = {
    setMusic:Function,
    setPage:(page:PageEnum) => any
}

const GameContainer = (props:GameContainerPropsType) => {
    //game datta
    const slot = useAppSelector(state => state.firestore.selectedGameSaveSlot);
    const gameSave = useAppSelector(state => state.firestore.gameSaves[slot || 0]);
    const [cards, setCards]: [Array<CardType>,any] = useState(gameSave?.cardBuffer || []);

    const isMusicEnabled = useAppSelector(state => state.settings.musicEnabled);

    const [cardDeg, setCardDeg] = useState(0);

    const maxDegRef = useRef<number>(window.screen.availWidth / 90);


    const gameVars = useAppSelector(state => state.game.variables);
    const isProcessingRef = useRef<boolean>(false);
    const [isCardThrown, setIsCardThrown] = useState(false);

    const [selectedVariableChanges,setSelectedVariableChanges]: [VariableChangeType | undefined,any] = useState();

    //sfx
    const [throwSFXPlay] = useSound(throwSfx);

    const dispatch = useAppDispatch();

    //test data
    // const [cards,setCards]: [CardType[],any] = useState([{
    //     text:"A Civil uprising has started, shall we send our troops to stop them?",
    //     characterName:"James",
    //     characterTitle:"Military Captain",
    //     option1:{text:"Yes", variableChanges:[
    //         {variable:VariableEnum.Military,change:VariableChangeEnum.NEGATIVE_SMALL},
    //         {variable:VariableEnum.Economy,change:VariableChangeEnum.POSITIVE_MEDIUM},
    //     ]},
    //     option2:{text:"No", variableChanges:[
    //         {variable:VariableEnum.Military,change:VariableChangeEnum.POSITIVE_LARGE},
    //         {variable:VariableEnum.Economy,change:VariableChangeEnum.NEGATIVE_MEDIUM},
    //     ]},
    //     image:"https://res.cloudinary.com/devolver-digital/image/upload/v1704993339/mothership-payload/1704993339346_thumbnail-reigns-3k_duacd0.jpg"
    // },
    // {
    //     text:"Theres a flood in town",
    //     characterName:"Jon ice",
    //     characterTitle:"lord of the something else",
    //     option1:{text:"Let them Die", variableChanges:[]},
    //     option2:{text:"Save Them", variableChanges:[]},
    //     image:"https://res.cloudinary.com/devolver-digital/image/upload/v1704993339/mothership-payload/1704993339346_thumbnail-reigns-3k_duacd0.jpg"
    // }]);

    useEffect(()=>{
        // const db = getDatabase();
        // set(ref(db, 'cards'), {
        //   username: name,
        // });
        console.log(cards)
    }, [cards])

    const handleMouseMove = (distance:number, isTouchEnabled:boolean) => {
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

        //throws current card
        setIsCardThrown(true);
        throwSFXPlay();
    }

    const turnNextCard = () => {
        setCardDeg(0);
        setIsCardThrown(false);
        setCards(cards.slice(1));

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
                <p className="font-bold text-xl p-4">{gameSave?.playerName || ""}</p>
            </div>
        </LeftContainer>

        <MiddleContainer hasTitle={false}>
            {gameSave && <>
                <GameStats variables={gameVars} variableChanges={isProcessingRef.current ? undefined : selectedVariableChanges}/>
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
            <p>{gameSave?.year || ""}</p>
        </RightContainer>
        </>
    )
}

export default GameContainer;