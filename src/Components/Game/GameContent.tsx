import { useEffect, useRef, useState } from "react"
import { CardType } from "../../Helpers/Types/GameTypes"
import GameController, { GameControllerPropsType } from "./GameController"
import { flushCss } from "../../Helpers/HelperFunctions"
import { useSpring, animated } from '@react-spring/web'
import useSound from "use-sound"
import cardFlipSfx from '../../sfx/card_flip.mp3'

type GameContentPropsType = {
    GameControllerProps:GameControllerPropsType,
    cardDeg:number,
    card:CardType,
    isThrown:boolean,
    turnNextCard:Function
}

const GameContent = (props:GameContentPropsType) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const characterRef = useRef<HTMLDivElement>(null);
    const cardTextRef = useRef<HTMLDivElement>(null);
    const animatedCardRef = useRef<HTMLDivElement>(null);

    const [cardImage,setCardImage] = useState(new Image());

    const [showCardBack, setShowCardBack] = useState(false);

    const [springs, api] = useSpring(()=>({
        from: { skewX: 0,rotateY:0,opacity:0}
    }))

    const [cardFlipSfxPlay] = useSound(cardFlipSfx, {volume:0.4});

    const getCardStyle = ():any => {
        const style:any = {
            backgroundImage:`url('${cardImage.src}')`
        }
        if(!props.isThrown && !showCardBack){
            style.transform = `rotate(${props.cardDeg}deg)`;
        }
        return style;
    }

    const getClasses = ():string => {
        let classBuilder = "";

        if(props.isThrown){
            if(props.cardDeg < 0){
                classBuilder += " cardThrowLeft";
            }else{
                classBuilder += " cardThrowRight";
            }
            
        }

        return classBuilder;
    }

    useEffect(()=>{

        //Load Images
        cardImage.src = props.card.image;

        const handleTransitionEnd = (event:any) => {
            //check for next card trigger
            if(event.propertyName === "opacity" && props.isThrown){
                //fade text away
                characterRef.current?.classList.add("cardTextThrow");
                cardTextRef.current?.classList.add("cardTextThrow");

                //reset card
                setShowCardBack(true);
                if(cardRef.current) {
                    cardRef.current.style.opacity = "0";
                    cardRef.current.style.transform = "none";
                    cardRef.current.style.transition = "none";
                }
            }
        }

        const handleTextTransitionEnd = (event:any) => {
            if(event.propertyName === "opacity" && props.isThrown){
                //next card
                props.turnNextCard();
 
                //fade text in
                characterRef.current?.classList.remove("cardTextThrow");
                cardTextRef.current?.classList.remove("cardTextThrow");

                //flip card
                cardFlipSfxPlay();
                if(animatedCardRef.current) animatedCardRef.current.style.backgroundImage = ``;
                api.set({opacity:1});
                api.start({
                    from: { skewX: 0,rotateY:0 },
                    to: { skewX: 4,rotateY:90 },
                    onRest: () => {
                        //half way
                        if(animatedCardRef.current) animatedCardRef.current.style.backgroundImage = `url('${cardImage.src}')`;
                        api.start({
                            from: { skewX: 4,rotateY:90 },
                            to: { skewX: 0,rotateY:0 },
                            onRest: () => {
                                //flipped
                                
                                if(cardRef.current){
                                    //flush css to make sure it doesnt animate
                                    cardRef.current.style.opacity = "";
                                    flushCss(cardRef.current);
                                    cardRef.current.style.transition = "";
                                    cardRef.current.style.transform = "";
                                }
                                api.set({opacity:0});

                                //enable controls
                                setShowCardBack(false);
                            }
                        });
                    }
                });

            }
        }

        const el = cardRef.current;
        const textEl = cardTextRef.current;
        if(el && textEl){
            el.addEventListener("transitionend", handleTransitionEnd);
            textEl.addEventListener("transitionend", handleTextTransitionEnd);
        }

        return () => {
            if(el && textEl){
                el.removeEventListener("transitionend", handleTransitionEnd);
                textEl.removeEventListener("transitionend", handleTextTransitionEnd);
            }
        }
    },[props, cardImage, api, cardFlipSfxPlay])

    return (
        <div className="w-full grow-[9] gameSecondary p-2 flex flex-col justify-around items-center space-x-2 font-bold relative">
            {/* CONTROLS */}
            {!props.isThrown && !showCardBack && <GameController 
                onClick={props.GameControllerProps.onClick} 
                onMouseMove={props.GameControllerProps.onMouseMove}
                />}
            

            <p ref={cardTextRef} className="cardText">{props.card.text}</p>

            <div className="w-full relative flex justify-center items-center">

                <div className="imageStack cardBack w-2/3 h-96 rounded-lg relative">

                    {/* ANIMATED CARD BACK */}
                    <animated.div ref={animatedCardRef} style={springs} className={`rounded-lg shadow-lg shadow-black w-full h-full overflow-hidden absolute z-10 cardBack`} ></animated.div>

                    {/* CARD */}
                    <div ref={cardRef} className={`rounded-lg shadow-lg shadow-black w-full gameCard h-full bg-cover overflow-hidden relative ${getClasses()}`} 
                        style={getCardStyle()}>
                            {/* CARD CONTENTS */}
                            {!showCardBack && <>
                                <div className="bg-neutral-900/30 gameCardOverlay top-0 w-full h-full absolute z-10" 
                                style={props.cardDeg !== 0 ? {transform:`rotate(${-props.cardDeg/2}deg) translateY(-75%) scaleX(10)`} : {}}></div>

                                {props.cardDeg !== 0 && 
                                <div className={`w-full py-4 text-white relative z-20 flex text-center ${props.cardDeg > 0 ? "justify-start" : "justify-end"}`}>
                                    <div className="w-1/4 flex justify-center items-center"><p>{props.cardDeg > 0 ? props.card.option1.text : props.card.option2.text}</p></div>
                                </div>}
                                
                            </>}

                    </div>

                </div>

            </div>
            
            
            <div ref={characterRef} className="flex flex-col text-center cardText">
                <p>{props.card.characterName}</p>
                <p>{props.card.characterTitle}</p>
            </div>

        </div>
    )
}

export default GameContent;