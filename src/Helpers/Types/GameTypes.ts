import { SeasonEnum, VariableChangeEnum, VariableEnum } from "../Enums/GameEnums"

export type CardType = {
    uid: string;
    text:string;
    characterName:string;
    characterTitle:string;
    option1:CardOptionType;
    option2:CardOptionType;
    image:string;
}

export type CardOptionType = {
    text:string;
    variableChanges:VariableChangeType;
}

export type VariableChangeType = {
    [variable in VariableEnum]?: VariableChangeEnum
}


export type GameStateType = {
    variables:GameVariableType;
    year:number;
    name:string;
}

export type GameVariableType = {
    [variable in VariableEnum]?: number
}

export type GameDataType = {
    slot: number;
    year: number;
    season: SeasonEnum;
    cardBuffer: Array<CardType>;
    playerName: string;
    playerTitle: string;
    location: string;
    world: string;
    variables: GameVariableType;
}

export type WorldType = {
    id:number;
    name:string;
    description:string;
    prompt:string;
    variables: Array<VariableEnum>;
}