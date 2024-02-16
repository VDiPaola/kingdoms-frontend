import { Button } from "flowbite-react";
import { LeftContainer, MiddleContainer, RightContainer } from "../ContainerComponents";
import TitleComponent from "../TitleComponent";

type HomeContainerPropsType = {
    onPlayClicked:Function
}

const HomeContainer = (props:HomeContainerPropsType) => {

    return(
        <>
            <LeftContainer />
            <MiddleContainer>
                <TitleComponent />
                <div className="h-full w-full flex justify-center items-center">
                    <div className="w-4/6 h-full flex flex-col space-y-8 p-2 justify-center">
                        <Button size="xl" color="success" onClick={props.onPlayClicked}>Play</Button>
                        <Button size="xl" onClick={()=>{}}>Stats</Button>
                        <Button size="xl" onClick={()=>{}}>Settings</Button>
                        <Button size="xl" color="failure" onClick={()=>{}}>Logout</Button>
                    </div>
                    
                </div>
            </MiddleContainer>
            <RightContainer />
        </>
    )
}

export default HomeContainer;