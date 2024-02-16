import { useEffect, useRef, useState } from "react";

export type GameControllerPropsType = {
    onMouseMove:(distance:number, isTouchEnabled:boolean)=>void,
    onClick:(side:"left" | "right") => void,
}

const GameController = (props:GameControllerPropsType) => {
    const leftDiv = useRef<HTMLDivElement>(null);
    const rightDiv = useRef<HTMLDivElement>(null);

    const [distance, setDistance] = useState(0);

    const [isTouchEnabled, setIsTouchEnabled] = useState(false);

    const handleLeftClick  = () => {
        if(!isTouchEnabled) props.onClick("left");
    }

    const handleRightClick = () => {
        if(!isTouchEnabled) props.onClick("right");
    }

    const handleTouchEnd  = () => {
        //click if touch is far enough
        const direction = distance > 0 ? "left" : "right";
        if (Math.abs(distance) > window.screen.availWidth/4){
            props.onClick(direction);
        } else{
            //reset card to center
            setDistance(0);
            props.onMouseMove(0, isTouchEnabled);
        }
    }

    const handleMouseMove = (e:any) => {
        if(leftDiv.current){
            const rect = leftDiv.current.getBoundingClientRect();

            //controls for web / mobile
            if(e.type.includes(`touch`)) {
                setIsTouchEnabled(true);
                const { touches, changedTouches } = e.originalEvent ?? e;
                const touch = touches[0] ?? changedTouches[0];
                const x = touch.pageX;
                const distance = rect.right - x;
                setDistance(distance);
                props.onMouseMove(distance, isTouchEnabled);
            } else if (e.type.includes(`mouse`)) {
                setIsTouchEnabled(false);
                const x = e.clientX;
                const distance = rect.right - x;
                setDistance(distance);
                props.onMouseMove(distance, isTouchEnabled);
            }
            
        }
        
    }

    useEffect(()=>{
        document.addEventListener("mousemove",handleMouseMove);
        document.addEventListener("touchmove",handleMouseMove);

        return () => {
            document.removeEventListener("mousemove",handleMouseMove);
            document.removeEventListener("touchmove",handleMouseMove);
        }
    })

    return(
        <div className="fixed z-40 top-0 left-0 w-screen h-screen flex" onTouchEnd={handleTouchEnd}>
            <div className="flex-1" onClick={handleLeftClick} ref={leftDiv}></div>
            <div className="flex-1" onClick={handleRightClick} ref={rightDiv}></div>
        </div>
    )
}

export default GameController;