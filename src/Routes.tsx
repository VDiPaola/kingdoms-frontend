
//ROUTES
import {
  BrowserRouter,
  Routes, 
  Route,
} from "react-router-dom";

import HomePage from './Pages/Home';

const Router = () => {

  return(
    <BrowserRouter>
        <Routes>
          <Route path="*" element={<HomePage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router;