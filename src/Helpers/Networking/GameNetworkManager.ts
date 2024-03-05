import { CallableResponseType, DeleteGameSaveRequestType, NewGameRequestType, UseCardRequestType } from './../Types/NetworkTypes';
import { CardType, GameDataType } from "../Types/GameTypes";
import { NetworkManager } from "./NetworkManager";
import { getFunctions, httpsCallable } from "firebase/functions";

export class GameNetworkManager extends NetworkManager{

    static CreateGame(newGameRequest:NewGameRequestType): Promise<GameDataType>{
        return this._callableFunction<NewGameRequestType, GameDataType>("createGame", newGameRequest);
    }

    static UseCard(useCardRequest:UseCardRequestType): Promise<GameDataType> {
        return this._callableFunction<UseCardRequestType, GameDataType>("useCard", useCardRequest);
    }

    static DeleteGameSave(slot:number): Promise<string> {
        return this._callableFunction<DeleteGameSaveRequestType, string>("deleteGameSave", {slot});
    }

    private static _callableFunction<T, R>(functionName:string, request:T): Promise<R> {
        return new Promise((resolve,reject) => {
            const functions = getFunctions();
            const useCard = httpsCallable<T, CallableResponseType>(functions, functionName);
            useCard(request)
            .then((result) => {
                if(result.data.code === 200){
                    resolve(result.data.message as R);
                }else{
                    reject(result.data);
                }
            })
            .catch((error) => {
                reject(error);
            })
        })
    }
}