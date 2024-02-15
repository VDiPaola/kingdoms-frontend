import { useEffect, useRef } from "react";

export type GameControllerPropsType = {
    onMouseMove:(distance:number)=>void,
    onClick:(side:"left" | "right") => void,
}

const GameController = (props:GameControllerPropsType) => {
    const leftDiv = useRef<HTMLDivElement>(null);
    const rightDiv = useRef<HTMLDivElement>(null);

    const handleLeftClick  = () => {
        props.onClick("left");
    }

    const handleRightClick = () => {
        props.onClick("right");
    }

    const handleMouseMove = (e:any) => {
        if(leftDiv.current){
            const rect = leftDiv.current.getBoundingClientRect();
        
            const distance = rect.right - e.clientX;
            props.onMouseMove(distance);
        }
        
    }

    useEffect(()=>{
        document.addEventListener("mousemove",handleMouseMove);

        return () => {
            document.removeEventListener("mousemove",handleMouseMove);
        }
    })

    return(
        <div className="fixed z-50 top-0 left-0 w-screen h-screen flex">
            <div className="flex-1" onClick={handleLeftClick} ref={leftDiv}></div>
            <div className="flex-1" onClick={handleRightClick} ref={rightDiv}></div>
        </div>
    )
}

export default GameController;