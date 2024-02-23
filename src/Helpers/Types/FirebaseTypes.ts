import { GameDataType } from './GameTypes';

export type FirestoreSliceType = {
    gameSaves:Array<GameDataType>;
    selectedGameSaveSlot: number;
}