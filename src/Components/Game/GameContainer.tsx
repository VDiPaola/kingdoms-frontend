import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../State/Hooks";
import { VariableChangeEnum, VariableEnum } from "../../Helpers/Enums/GameEnums";
import { variableChanges } from "../../State/Slices/GameSlice";
import { CardType } from "../../Helpers/Types/GameTypes";
import GameStats from "./GameStats";
import GameContent from "./GameContent";
import useSound from "use-sound";

import throwSfx from '../../sfx/card_swipe.mp3'

const GameContainer = () => {
    const [cardDeg, setCardDeg] = useState(0);
    const degMax = window.screen.availWidth / 90;
    const gameVars = useAppSelector(state => state.game.variables);
    const isProcessing = useRef<boolean>(false);
    const [isCardThrown, setIsCardThrown] = useState(false);

    const [throwSFXPlay] = useSound(throwSfx);

    const dispatch = useAppDispatch();

    const [cards,setCards]: [CardType[],any] = useState([{
        text:"Theres a fire on the wall",
        characterName:"Jon snow",
        characterTitle:"lord of the something",
        option1:{text:"Yes", variableChanges:[
            {variable:VariableEnum.Military,change:VariableChangeEnum.NEGATIVE_SMALL},
            {variable:VariableEnum.Economy,change:VariableChangeEnum.POSITIVE_MEDIUM},
        ]},
        option2:{text:"No", variableChanges:[
            {variable:VariableEnum.Military,change:VariableChangeEnum.POSITIVE_LARGE},
            {variable:VariableEnum.Economy,change:VariableChangeEnum.NEGATIVE_MEDIUM},
        ]},
        image:"https://res.cloudinary.com/devolver-digital/image/upload/v1704993339/mothership-payload/1704993339346_thumbnail-reigns-3k_duacd0.jpg"
    },
    {
        text:"Theres a flood in town",
        characterName:"Jon ice",
        characterTitle:"lord of the something else",
        option1:{text:"Kill", variableChanges:[]},
        option2:{text:"Save", variableChanges:[]},
        image:"https://res.cloudinary.com/devolver-digital/image/upload/v1704993339/mothership-payload/1704993339346_thumbnail-reigns-3k_duacd0.jpg"
    }]);

    const handleMouseMove = (distance:number) => {
        //card animation
        if(distance > degMax) distance = degMax;
        if(distance < -degMax) distance = -degMax;
        setCardDeg(-distance);
    }

    const handleGameControllerClick  = (side:"left" | "right") => {
        if(isProcessing.current) return;
        isProcessing.current = true;
        
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
        setIsCardThrown(false);
        setCards(cards.slice(1));

        isProcessing.current = false;
    }

    return (
        <div className="h-full flex-1 gamePrimary flex flex-col">
            <GameStats variables={gameVars}/>
            {cards.length > 0 && 
            <GameContent 
                GameControllerProps={{onClick:handleGameControllerClick,onMouseMove:handleMouseMove}} 
                cardDeg={cardDeg}
                card={cards[0]}
                isThrown={isCardThrown}
                turnNextCard={turnNextCard}/>}
            
            <div className="w-full flex-1">something</div>
        </div>
    )
}

export default GameContainer;