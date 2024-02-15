import { MdOutlineAttachMoney } from "react-icons/md";
import { VariableEnum } from "../../Helpers/Enums/GameEnums";
import { GiBroadsword } from "react-icons/gi";
import { FaCross } from "react-icons/fa";
import { IoMan } from "react-icons/io5";

type VariableIconPropsType = {
    variable:VariableEnum
}

const size = "50px"
const color = '#FFB703';
const VariableIcon = (props:VariableIconPropsType) => {

    return (
        <>
        {props.variable === VariableEnum.Economy && <MdOutlineAttachMoney style={{ color, width: size, height: size }} />}
        {props.variable === VariableEnum.Military && <GiBroadsword style={{ color, width: size, height: size }} />}
        {props.variable === VariableEnum.Piety && <FaCross style={{ color, width: size, height: size }} />}
        {props.variable === VariableEnum.Population && <IoMan style={{ color, width: size, height: size }} />}
        {props.variable === VariableEnum.Respect && <IoMan style={{ color, width: size, height: size }} />}
        </>
    )
}

export default VariableIcon;