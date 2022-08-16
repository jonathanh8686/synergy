import React, {useEffect, useState} from 'react';
import './App.css';
import styled from 'styled-components';
import { io, Socket } from "socket.io-client";
import socketService from './Services/socketService';

import TitleScreen from './components/titleScreen';
import GameContext, { IGameContextProp } from './gameContext';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;

function App() {

  const [isInRoom, setIsInRoom] = useState(false);

  const gameContextValue: IGameContextProp = {
    isInRoom,
    setIsInRoom,
  };

  const connectSocket = async () => {
    if(!process.env.REACT_APP_SERVER_URL) {
      console.log("Error: Could not find server url in config");
      return;
    }

    const socket = await socketService.connect(process.env.REACT_APP_SERVER_URL).catch((err) => {
      console.log("Error: ", err);
    });
  };
  
  useEffect(() => {
    connectSocket();
  }, [])
  

  return (
    <GameContext.Provider value={gameContextValue}>
      <AppContainer>
        <TitleScreen></TitleScreen>
      </AppContainer>
    </GameContext.Provider>
  );
}

export default App;
