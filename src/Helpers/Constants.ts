import { VariableChangeEnum } from "./Enums/GameEnums";

export const VariableChangeAmounts: {[key in VariableChangeEnum]: number} = {
    [VariableChangeEnum.POSITIVE_SMALL]: 5,
    [VariableChangeEnum.POSITIVE_MEDIUM]: 15,
    [VariableChangeEnum.POSITIVE_LARGE]: 25,

    [VariableChangeEnum.NEGATIVE_SMALL]: -5,
    [VariableChangeEnum.NEGATIVE_MEDIUM]: -15,
    [VariableChangeEnum.NEGATIVE_LARGE]: -25,
};