import React from 'react';
// import PlayerManagement from './Components/PlayerManagement';
import Wrapper from './Components/Wrapper';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Wrapper>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              {/*<Route path="/players" element={<PlayerManagement />} />*/}
            </Routes>
          </Wrapper>
        </BrowserRouter>
      </div>
  );
}

export default App;