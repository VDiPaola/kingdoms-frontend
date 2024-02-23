import { Dropdown } from "flowbite-react";

const musicList = {
    "Celtic": "./music/celtic.mp3",
    "Medieval Life": "./music/medieval_life.mp3",
    "Loopy": "./music/music_loop.mp3",
    "MusicBox": "./music/musicbox.mp3",
    "Village Theme": "./music/village_theme.mp3",
    "Violin": "./music/violin_music.mp3",
}

const SettingsContainer = () => {

    return (
        <div className="flex flex-col">
            <div className="flex p-2">
                <Dropdown label={"Set Music"}>
                    {Object.keys(musicList).map((item,_) => (
                        <Dropdown.Item key={item}>{item}</Dropdown.Item>
                    ))}
                </Dropdown>
            </div>
        </div>
    )
}

export default SettingsContainer;