import { VariableChangeEnum, VariableEnum } from "../Enums/GameEnums"

export type CardType = {
    text:string,
    characterName:string,
    characterTitle:string,
    option1:CardOptionType,
    option2:CardOptionType,
    image:string
}

export type CardOptionType = {
    text:string,
    variableChanges:Array<VariableChangeType>
}

export type VariableChangeType = {
    variable:VariableEnum
    change:VariableChangeEnum
}


export type GameStateType = {
    variables:Array<GameVariableType>,
    year:number,
    name:string
}

export type GameVariableType = {
    variable:VariableEnum,
    percentage:number
}