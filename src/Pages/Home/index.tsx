import useSound from "use-sound";
import GameContainer from "../../Components/Game/GameContainer";
import { useAppDispatch, useAppSelector } from "../../State/Hooks";
import { login, logout } from "../../State/Slices/UserSlice";
import { auth, unauth } from "../../State/Slices/AuthSlice";
import LoginContainer from "../../Components/LoginContainer";
import { useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import { UserType } from "../../Helpers/Types/UserTypes";
import { Role } from "../../Helpers/Enums/UserEnums";
import { PageEnum } from "../../Helpers/Enums/PageEnums";
import HomeContainer from "../../Components/Home/HomeContainer";
import GameSavesContainer from "../../Components/GameSaves/GameSavesContainer";
import { GameDataType } from "../../Helpers/Types/GameTypes";
import { setGameSaves } from "../../State/Slices/firestoreSlice";
import NewGameContainer from "../../Components/NewGame/NewGameContainer";
import SettingsContainer from "../../Components/Settings/SettingsContainer";



const HomePage = () => {
    const [page,setPage]: [PageEnum,any] = useState<PageEnum>(PageEnum.Home);

    const isMusicEnabled = useAppSelector(state => state.settings.musicEnabled);

    const authState = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        
        //authentication
        firebase.auth().onAuthStateChanged(async function(user) {
          if(user){
            //signed in
            const userObject: UserType = {
              author_name: user.displayName || "steve",
              email:user.email || "",
              last_login_unix: Date.now(),
              password:"",
              role:Role.USER
            }
    
            dispatch(login(userObject))
            dispatch(auth());

            //get game saves
            const userRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser?.uid)
            userRef.get().then((doc) => {
                if(doc.exists){
                    console.log(doc.data());
                    const userData = doc.data();
                    if(userData){
                        const saves = userData.gameSaves as Array<GameDataType>;
                        dispatch(setGameSaves(saves));
                    }
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });

          }else{
            //signed out
            dispatch(logout());
            dispatch(unauth());
          }
        })
      }, [dispatch])

    const [musicPlay, player] = useSound("./music/celtic.mp3", {
        volume:0.05,
    });

    const handlePlayClicked = () => {
        if(isMusicEnabled){
            setMusic(true);
        }
        setPage(PageEnum.GameSaves);
    }

    const setMusic = (on:boolean) => {
        if(!player.sound.playing() && on){
            player.sound.loop(true);
            musicPlay();
        }else if(!on){
            player.pause();
        }
    }

    const handleLogoutClick = () => {
        firebase.auth().signOut()
        .then(()=>{
            //signed out
            dispatch(logout());
            dispatch(unauth());
        })
        .catch((error) => {console.error("Failed to sign out: " + error)})
    }

    const handleSettingsClick = () => {
        setPage(PageEnum.Settings);
    }

    const handleMusicChange = (songName:string) => {
        player.sound.unload();
        player.sound._src = "./music/" + songName;
        player.sound.once('load', function() {
            setMusic(true);
          });
        player.sound.load();
    }

    return(
        <div className="bg-slate-400 w-screen h-screen flex background overflow-hidden text-white">
            {authState.isAuthenticated && (<>
                {page === PageEnum.Game && <GameContainer setMusic={setMusic.bind(this)} setPage={setPage}/>}
                {page === PageEnum.GameSaves && <GameSavesContainer setPage={setPage}/>}
                {page === PageEnum.NewGame && <NewGameContainer setPage={setPage}/>}
                {page === PageEnum.Settings && <SettingsContainer handleMusicChange={handleMusicChange} setPage={setPage}/>}
                {page === PageEnum.Home && <HomeContainer onSettingsClick={handleSettingsClick} onPlayClicked={handlePlayClicked} onLogoutClick={handleLogoutClick}/>}
            </>)
            }

            {!authState.isAuthenticated && <LoginContainer />}
            
        </div>
    )
}

export default HomePage;