import { PropsWithChildren } from "react"
import TitleComponent from "./TitleComponent"

export const LeftContainer = (props:PropsWithChildren) => {

    return (
        <div className="h-full flex-1 hidden lg:flex">
            {props.children}
        </div>
    )
}

type MiddleContainerPropsType = PropsWithChildren & {
    hasTitle?:boolean
}
export const MiddleContainer = (props:MiddleContainerPropsType) => {

    return (
        <div className="h-full flex-1 gamePrimary flex flex-col">
            {(props.hasTitle || props.hasTitle === undefined) && <TitleComponent />}
            {props.children}
        </div>
    )
}

export const RightContainer = (props:PropsWithChildren) => {

    return (
        <div className="h-full flex-1 hidden lg:flex">
            {props.children}
        </div>
    )
}