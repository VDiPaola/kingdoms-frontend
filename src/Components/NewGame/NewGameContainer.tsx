import { Button, Dropdown, TextInput } from "flowbite-react";
import { LeftContainer, MiddleContainer, RightContainer } from "../ContainerComponents";
import { useRef, useState } from "react";

//TEMP - hard coded list of worlds
const worlds = [
    {id:0, name:"Medieval England", description:"Rule over your kingdom in this classic era", prompt:""},
    {id:1, name:"Fire & Ice", description:"Medieval Fantasy inspired by Game of Thrones", prompt:""},
    {id:2, name:"The Fellowship", description:"High Fantasy world inspired by Lord of The Rings", prompt:""},
    {id:3, name:"Wizards", description:"Modern Magical world inspired by Harry Potter", prompt:""},
]


type NewGameContainerPropsType = {
    setPage:Function;
}

const NewGameContainer = (props:NewGameContainerPropsType) => {
    
    
    //form values
    const [playerName, setPlayerName] = useState("");
    const [selectedWorld, setSelectedWorld] = useState(worlds[0]);
    const [location, setLocation] = useState("");
    const [year, setYear] = useState("1500AD");

    const handleWorldClick = (worldId:number) => {
        const world = worlds.find((w) => (w.id === worldId));
        if(world) setSelectedWorld(world);
    }

    const handleCreateGame = (event:any) => {
        event.preventDefault();
        console.log("test")
    }

    const handlePlayerNameChange = (event:any) => {
        setPlayerName(event.target.value);
    }
    const handleLocationChange = (event:any) => {
        setLocation(event.target.value);
    }
    const handleYearChange = (event:any) => {
        setYear(event.target.value);
    }

    return (
        <>
        <LeftContainer />
        <MiddleContainer>
            <div className="flex flex-col items-center w-full space-y-2">
                <p className="font-bold py-2">Create New Game</p>
                
                <form onSubmit={handleCreateGame} className="flex flex-col items-center w-full">
                <div className="flex flex-col space-y-4 w-3/4">
                    <div className="flex flex-col">
                        <p>Player Name</p>
                        <TextInput placeholder="Steve" value={playerName} onChange={handlePlayerNameChange} required/>
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
                        <TextInput value={year} onChange={handleYearChange}/>
                    </div>

                    <Button type="submit">Create</Button>
                    
                </div>
                </form>
            </div>
        </MiddleContainer>
        <RightContainer />
        </>
    )
}

export default NewGameContainer;