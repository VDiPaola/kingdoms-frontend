import useSound from "use-sound";
import GameContainer from "../../Components/Game/GameContainer";
import { useAppDispatch, useAppSelector } from "../../State/Hooks";
import { login, logout } from "../../State/Slices/UserSlice";
import { auth, unauth } from "../../State/Slices/AuthSlice";
import LoginContainer from "../../Components/LoginContainer";
import { useEffect } from "react";
import firebase from 'firebase/compat/app';
import { UserType } from "../../Helpers/Types/UserTypes";
import { Role } from "../../Helpers/Enums/UserEnums";


const HomePage = () => {
    const name = useAppSelector(state => state.game.name);
    const year = useAppSelector(state => state.game.year);

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

    const [musicPlay] = useSound("./music/celtic.mp3", {
        volume:0.05
    });

    return(
        <div className="bg-slate-400 w-screen h-screen flex background overflow-hidden text-white">
            {authState.isAuthenticated && <>
                <div className="h-full flex-1 flex flex-col justify-end">
                    <p className="font-bold text-xl p-4">{name}</p>
                </div>
                <GameContainer />
                <div className="h-full flex-1">{year}</div>
            </>}

            {!authState.isAuthenticated && <>
                {/* LOGIN PAGE */}
                <LoginContainer />
            </>}
            
        </div>
    )
}

export default HomePage;