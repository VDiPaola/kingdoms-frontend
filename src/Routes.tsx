import React, { useEffect } from 'react';

//ROUTES
import {
  BrowserRouter,
  Routes, 
  Route,
} from "react-router-dom";

import { useAppSelector, useAppDispatch } from './State/Hooks';
import { NetworkManager } from './Helpers/NetworkManager';
import { auth,unauth } from './State/Slices/AuthSlice';
import { login,logout } from './State/Slices/UserSlice';
import HomePage from './Pages/Home';

const Router = () => {
  const authState = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch();

  const unAuth = () => {
    dispatch(logout());
    dispatch(unauth());
  }

  return(
    <BrowserRouter>
        <Routes>
          <Route path="*" element={<HomePage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router;