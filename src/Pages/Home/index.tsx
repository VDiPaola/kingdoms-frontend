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






const HomePage = () => {
    const [page,setPage]: [PageEnum,any] = useState<PageEnum>(PageEnum.Home);

    const isMusicEnabled = useAppSelector(state => state.settings.musicEnabled);

    const authState = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();

    useEffect(()=>{
        //authentication
        firebase.auth().onAuthStateChanged(function(user) {
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
        setPage(PageEnum.Game);
    }

    const setMusic = (on:boolean) => {
        if(!player.sound.playing() && on){
            player.sound.loop(true);
            musicPlay();
        }else if(!on){
            player.pause();
        }
    }

    return(
        <div className="bg-slate-400 w-screen h-screen flex background overflow-hidden text-white">
            {authState.isAuthenticated && (<>
                {page === PageEnum.Game && <GameContainer setMusic={setMusic.bind(this)} setPage={setPage}/>}
                {page === PageEnum.Home && <HomeContainer onPlayClicked={handlePlayClicked}/>}
            </>)
            }

            {!authState.isAuthenticated && <LoginContainer />}
            
        </div>
    )
}

export default HomePage;