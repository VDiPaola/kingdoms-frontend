import { Dropdown, RangeSlider } from "flowbite-react";
import { LeftContainer, MiddleContainer, RightContainer } from "../ContainerComponents";
import { FaHome } from "react-icons/fa";
import { PageEnum } from "../../Helpers/Enums/PageEnums";

const musicList:any = {
    "Celtic": "celtic.mp3",
    "Medieval Life": "medieval_life.mp3",
    "Loopy": "music_loop.mp3",
    "MusicBox": "musicbox.mp3",
    "Village Theme": "village_theme.mp3",
    "Violin": "violin_music.mp3",
}

type SettingsContainerPropsType = {
    handleMusicChange:(songName:string) => void;
    setPage: (pageEnum:PageEnum) => void;
}

const SettingsContainer = (props:SettingsContainerPropsType) => {
    const handleMusicClick = (songKey:string) => {
        props.handleMusicChange(musicList[songKey]);
    }
    const handleHomeClick = () => {
        props.setPage(PageEnum.Home);
    }
    return (
        <>
        <LeftContainer />
        
        <MiddleContainer>
            <div className="flex flex-col py-2 space-y-2">
                <div className="flex justify-center items-center p-2">
                    <Dropdown label={"Set Music"}>
                        {Object.keys(musicList).map((item,_) => (
                            <Dropdown.Item key={item} onClick={()=>{handleMusicClick(item)}}>{item}</Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>

                {/* <RangeSlider sizing="sm" /> */}
            </div>

            {/* FOOTER */}
            <div className="w-full flex-1 flex justify-end items-end">
                <div className="w-full flex justify-center items-center p-2 relative space-x-2 text-lg">

                    <div className="hover:drop-shadow-md hover:scale-105 transition-all duration-100 ease-out cursor-pointer p-1 relative z-50" onClick={handleHomeClick}>
                        <FaHome />
                    </div>
                </div>  
            </div>
        </MiddleContainer>

        <RightContainer />
        </>
        
    )
}

export default SettingsContainer;