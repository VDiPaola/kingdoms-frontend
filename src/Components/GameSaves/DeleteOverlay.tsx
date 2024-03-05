import { Button, Card, Spinner } from "flowbite-react";
import '../../StyleSheets/GameSaves/DeleteOverlayStyles.css'
import { useState } from "react";

type DeleteOverlayPropsType = {
    onCancelClick: () => void;
    onDeleteClick: () => Promise<void>;
}

const DeleteOverlay = (props:DeleteOverlayPropsType) => {
    const [showSpinner, setShowSpinner] = useState(false);

    const handleCancelClick = () => {props.onCancelClick()}
    const handleDeleteClick = () => {
        setShowSpinner(true);
        props.onDeleteClick()
        .finally(()=>{setShowSpinner(false)});
    }

    return(
        <Card className="deleteOverlay w-1/4 flex flex-col justify-center items-center">
            <p className="text-black font-bold">Are you sure you want to delete this game?</p>
            <div className="flex w-full items-center justify-center space-x-2">
                {showSpinner && <Spinner color="failure"/>}
                {!showSpinner && <>
                    <Button color="failure" onClick={handleDeleteClick}>Delete</Button>
                    <Button color="light" onClick={handleCancelClick}>Cancel</Button>
                </>}
            </div>
        </Card>
    )
}

export default DeleteOverlay;