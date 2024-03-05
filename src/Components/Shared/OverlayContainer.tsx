import { useEffect, useState } from "react";


export type OverlayContainerPropsType = {
    enabled?:boolean,
    disableBgClose?:boolean,
    close?:Function,
    children?:any,
    full?:boolean,
}

const OverlayContainer = (props: OverlayContainerPropsType) => {
    const [enabled, setEnabled] = useState(props.enabled ?? true);

    const bgClickHandler = (e:any) => {
        e.stopPropagation();
        if(props.disableBgClose){return;}
        if(e.target.id === "overlayContainer"){
            if(props.close) props.close();
            else setEnabled(false); 
        }
    }

    useEffect(()=>{
        setEnabled(props.enabled ?? true);
    },[props.enabled])

    return(
        <>
        {enabled &&
        <div id="overlayContainer"
        className={`${props.full ? "w-full h-full" : "w-screen h-screen"} fixed z-50 flex justify-center items-center top-0 left-0`} 
        onClick={bgClickHandler} onTouchStart={bgClickHandler}>
            {props.children}
        </div>}
        </>
    )
}

export default OverlayContainer;

