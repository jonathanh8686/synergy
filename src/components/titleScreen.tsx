import React, { useState, useContext } from "react";
import styled from "styled-components";
import gameContext from "../gameContext";
import gameService from "../Services/gameService";
import socketService from "../Services/socketService";

interface ITitleScreenProps {}

const JoinRoomContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
`;

const RoomIdInput = styled.input`
  height: 30px;
  width: 20em;
  font-size: 17px;
  outline: none;
  border: 1px solid #8e44ad;
  border-radius: 3px;
  padding: 0 10px;
`;

const JoinButton = styled.button`
  outline: none;
  background-color: #8e44ad;
  color: #fff;
  font-size: 17px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 4px 18px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    border: 2px solid #8e44ad;
    color: #8e44ad;
  }
`;

export default function TitleScreen(props: ITitleScreenProps) {
  const [roomID, setRoomID] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const { isInRoom, setIsInRoom } = useContext(gameContext);

  const handleRoomIDChange = (e: React.ChangeEvent<any>) => {
    console.log(roomID);
    setRoomID(e.target.value);
  };

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsJoining(true);
    const socket = socketService.socket;
    if (!roomID || roomID.trim() == "") {
      console.warn("Failed to join room: Invalid room ID");
      setIsJoining(false);
      return;
    }

    if (!socket) {
      console.log("Failed to join room: Socket does not exist");
      setIsJoining(false);
      return;
    }

    const joined = await gameService
      .joinGameRoom(socket, roomID)
      .catch((err) => {
        console.warn("Failed to join room: ", err);
      });

    if (joined) {
      setIsInRoom(true);
    }
    setIsJoining(false);
  };

  return (
    <div>
      <form onSubmit={joinRoom}>
        <JoinRoomContainer>
          <RoomIdInput
            placeholder="Room ID"
            value={roomID}
            onChange={handleRoomIDChange}
          ></RoomIdInput>
          <JoinButton type='submit' disabled={isJoining}>{isJoining ? "Joining..." : "Join Room"}</JoinButton>
        </JoinRoomContainer>
      </form>
    </div>
  );
}
