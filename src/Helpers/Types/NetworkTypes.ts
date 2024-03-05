import { VariableEnum } from "../Enums/GameEnums";
import { WorldType } from "./GameTypes";

export type NewGameRequestType = {
    playerName: string;
    playerTitle: string;
    location: string;
    world: WorldType;
    year: string;
    slot: number;
}

export type CallableResponseType = {
    message:any,
    code:number
}

export type UseCardRequestType = {
    option: "option1" | "option2";
    slot: number;
    cardUID: string;
}

export type DeleteGameSaveRequestType = {
    slot: number;
}