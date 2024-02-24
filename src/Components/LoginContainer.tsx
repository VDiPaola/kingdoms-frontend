import { LeftContainer, MiddleContainer, RightContainer } from "./ContainerComponents";

const LoginContainer = () => {
    return(
        <>
            <LeftContainer />
            <MiddleContainer>
            <div className="flex flex-col w-full p-2 h-full">
                <div className="flex-1 flex items-center" id='firebaseui-auth-container'></div>
            </div>
            </MiddleContainer>
            <RightContainer />
        </>
    )
}

export default LoginContainer;