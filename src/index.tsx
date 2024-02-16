import React from 'react';
import ReactDOM from 'react-dom/client';
import './StyleSheets/index.css';
import './StyleSheets/animations.css';
import reportWebVitals from './reportWebVitals';
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

import Router from './Routes';


//redux
import { Provider } from 'react-redux';
import store from './State/Store';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor } from './State/Store';


//firebase
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqv63H20jOzKsJyUB9gdFe1SiNuulhU58",
  authDomain: "kingdoms-84a59.firebaseapp.com",
  projectId: "kingdoms-84a59",
  storageBucket: "kingdoms-84a59.appspot.com",
  messagingSenderId: "70709251243",
  appId: "1:70709251243:web:766fdc7143f5d4868cbbee",
  measurementId: "G-VW1DSFXFNE"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
// FirebaseUI config.
const uiConfig: firebaseui.auth.Config = {
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      clientId: '70709251243-lmoclemlqq9j3eqe5hjch8v7nk8l4nju.apps.googleusercontent.com'
    },
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '/tos',
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign('/privacy-policy');
  },
  
  popupMode:true,

  signInFlow:"popup",

  // callbacks:{
  //   signInSuccessWithAuthResult: (authResult, redirectUrl?: string | undefined):boolean => {
  //     return true;
  // }}
};

firebase.auth().onAuthStateChanged((user)=>{
  if(!user){
    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(app.auth());

    if (!ui.isPendingRedirect()) {
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  }
})


const App = () => {
  return(
    <React.StrictMode>
      <Provider store={store} children={
        <PersistGate persistor={persistor}>
        <Router />
        </PersistGate>
      } />
    </React.StrictMode>
  )
}



const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);

reportWebVitals(null);
