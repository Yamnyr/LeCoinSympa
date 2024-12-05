import React from 'react';
// import PlayerManagement from './Components/PlayerManagement';
import Wrapper from './Components/Wrapper';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import User from "./Pages/User";
import AdvertisementDetail from "./Pages/AdvertisementDetail";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Wrapper>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/user" element={<User />} />
              <Route path="/advertisement/:id" element={<AdvertisementDetail />} /> {/* Route pour la page des détails */}
            </Routes>
          </Wrapper>
        </BrowserRouter>
      </div>
  );
}

export default App;