import { Alert, Button, Dropdown, Spinner, TextInput } from "flowbite-react";
import { LeftContainer, MiddleContainer, RightContainer } from "../ContainerComponents";
import { useRef, useState } from "react";
import { GameDataType, WorldType } from "../../Helpers/Types/GameTypes";
import { VariableEnum, YearEnum } from "../../Helpers/Enums/GameEnums";
import { GameNetworkManager } from "../../Helpers/Networking/GameNetworkManager";
import { useAppDispatch, useAppSelector } from "../../State/Hooks";
import { PageEnum } from "../../Helpers/Enums/PageEnums";
import { updateGameSave } from "../../State/Slices/firestoreSlice";
import { HiInformationCircle } from 'react-icons/hi';
import { setVariables } from "../../State/Slices/GameSlice";

//TEMP - hard coded list of worlds
const variables = [VariableEnum.Economy, VariableEnum.Military, VariableEnum.Piety, VariableEnum.Population]
const worlds:Array<WorldType> = [
    {id:0, name:"Medieval England", description:"Rule over your kingdom in this classic era", prompt:"Medieval England", variables:variables},
    {id:1, name:"Fire & Ice", description:"Medieval Fantasy inspired by Game of Thrones", prompt:`
    Medieval Fantasy World inspired heavily by Game of Thrones, this world has many kingdoms, lots of deception, dragons, magic and harsh elements`, variables:variables},
    {id:2, name:"The Fellowship", description:"High Fantasy world inspired by Lord of The Rings", prompt:`High fantasy world heavily inspired by Lord of the Rings
    and the other works of Tolkien. Lots of races and factions, wars, magic and beasts are present in these lands.`, variables:variables},
    {id:3, name:"Wizards", description:"Modern Magical world inspired by Harry Potter", prompt:`Modern Magical world heavily inspired by Harry Potter, hiding from the non magic world lies
    a mystical magical world of creatures and spells, flying brooms and enchanted objects.`, variables:variables},
]


type NewGameContainerPropsType = {
    setPage:Function;
}

const NewGameContainer = (props:NewGameContainerPropsType) => {
    //form values
    const [playerName, setPlayerName] = useState("");
    const [playerTitle, setPlayerTitle] = useState("");
    const [selectedWorld, setSelectedWorld] = useState(worlds[0]);
    const [location, setLocation] = useState("");
    const [yearNum, setYearNum] = useState(1500);
    const [yearSuffix, setYearSuffix] = useState<YearEnum>(YearEnum.AD);

    const gameSlot = useAppSelector(state => state.firestore.selectedGameSaveSlot);

    const [spinnerEnabled,setSpinnerEnabled] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const dispatch = useAppDispatch();

    const handleWorldClick = (worldId:number) => {
        const world = worlds.find((w) => (w.id === worldId));
        if(world) setSelectedWorld(world);
    }

    const handleCreateGame = (event:any) => {
        event.preventDefault();
        //spinner
        setSpinnerEnabled(true);
        //create game
        GameNetworkManager.CreateGame({
            location,
            playerName,
            playerTitle,
            year:yearNum+yearSuffix,
            world:selectedWorld,
            slot:gameSlot
        })
        .then((gameData:GameDataType)=>{
            if(!gameData.playerName) return;
            //set game data then change to game page
            dispatch(updateGameSave(gameData));
            props.setPage(PageEnum.Game);
        })
        .catch(error => {
            console.log(error);
            let alertMessage = "Error creating game";
            if(error?.message) alertMessage += ` - ${error.message}`;
            setAlertMessage(alertMessage)
        })
        .finally(()=>{setSpinnerEnabled(false)})
    }

    const handlePlayerNameChange = (event:any) => {
        setPlayerName(event.target.value);
    }
    const handlePlayerTitleChange = (event:any) => {
        setPlayerTitle(event.target.value);
    }
    const handleLocationChange = (event:any) => {
        setLocation(event.target.value);
    }
    const handleYearChange = (event:any) => {
        setYearNum(event.target.value);
    }
    const handleYearSuffixChange = (suffix:YearEnum) => {
        setYearSuffix(suffix);
    }

    const handleAlertDismiss = () => {
        setAlertMessage("");
    }

    return (
        <>
        <LeftContainer />
        <MiddleContainer>
            <div className="flex flex-col items-center w-full space-y-2">
                <p className="font-bold py-2">Create New Game</p>
                
                {spinnerEnabled && <Spinner />}

                {alertMessage && <Alert color="failure" icon={HiInformationCircle} onDismiss={handleAlertDismiss} className="w-3/4 ">
                    <span className="font-medium">{alertMessage}</span>
                </Alert>}

                {!spinnerEnabled && <>
                    <form onSubmit={handleCreateGame} className="flex flex-col items-center w-full">
                    <div className="flex flex-col space-y-4 w-3/4">
                        <div className="flex flex-col">
                            <p>Player Name</p>
                            <TextInput placeholder="Steve" value={playerName} onChange={handlePlayerNameChange} required/>
                        </div>
                        <div className="flex flex-col">
                            <p>Player Title</p>
                            <TextInput placeholder="King" value={playerTitle} onChange={handlePlayerTitleChange} required/>
                        </div>
                        <div className="flex flex-col w-full relative">
                            <p>World</p>
                            <Dropdown label={selectedWorld.name} className="w-full" style={{width:"100%"}}>
                                {worlds.map((world,_) => (
                                    <Dropdown.Item key={world.id} onClick={()=>{handleWorldClick(world.id)}} className="px-1 py-2">
                                        <div className="flex flex-col hover:bg-gray-500 cursor-pointer w-full px-2">
                                            <p><b>{world.name}</b></p>
                                            <p>{world.description}</p>
                                        </div>
                                        
                                    </Dropdown.Item>
                                ))}
                            </Dropdown>
                        </div>
                        <div className="flex flex-col">
                            <p>Location</p>
                            <TextInput placeholder="Dragonstone Citadel" value={location} onChange={handleLocationChange} required/>
                        </div>
                        <div className="flex flex-col">
                            <p>Year</p>

                            <div className="flex">
                                <TextInput value={yearNum} onChange={handleYearChange} type="number" className="flex-1"/>
                                <Dropdown label={yearSuffix}>
                                    <Dropdown.Item onClick={()=>{handleYearSuffixChange(YearEnum.AD)}}>AD</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>{handleYearSuffixChange(YearEnum.BC)}}>BC</Dropdown.Item>
                                </Dropdown>
                            </div>
                        </div>

                        <Button type="submit">Create</Button>
                        
                    </div>
                    </form>
                </>}
            </div>
        </MiddleContainer>
        <RightContainer />
        </>
    )
}

export default NewGameContainer;