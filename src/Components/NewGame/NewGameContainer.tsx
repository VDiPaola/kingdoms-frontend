import { TextInput } from "flowbite-react";
import { LeftContainer, MiddleContainer, RightContainer } from "../ContainerComponents";

type NewGameContainerPropsType = {
    setPage:Function;
}

const NewGameContainer = (props:NewGameContainerPropsType) => {

    return (
        <>
        <LeftContainer />
        <MiddleContainer>
            <div className="flex flex-col items-center w-full space-y-2">
                <p className="font-bold py-2">Create New Game</p>
                {/* Form with: playerName, world (predefined or custom and depends on sub), location, year */}

                <div className="flex flex-col space-y-4 w-3/4">
                    <div className="flex flex-col">
                        <p>Player Name</p>
                        <TextInput placeholder="Steve"/>
                    </div>
                    <div className="flex flex-col">
                        <p>World</p>
                        <TextInput />
                    </div>
                    <div className="flex flex-col">
                        <p>Location</p>
                        <TextInput placeholder="Dragonstone Citadel"/>
                    </div>
                    <div className="flex flex-col">
                        <p>Year</p>
                        <TextInput />
                    </div>
                </div>
            </div>
        </MiddleContainer>
        <RightContainer />
        </>
    )
}

export default NewGameContainer;