import { PropsWithChildren } from "react"

export const LeftContainer = (state:PropsWithChildren) => {

    return (
        <div className="h-full flex-1 hidden lg:flex">
            {state.children}
        </div>
    )
}

export const MiddleContainer = (state:PropsWithChildren) => {

    return (
        <div className="h-full flex-1 gamePrimary flex flex-col">
            {state.children}
        </div>
    )
}

export const RightContainer = (state:PropsWithChildren) => {

    return (
        <div className="h-full flex-1 hidden lg:flex">
            {state.children}
        </div>
    )
}