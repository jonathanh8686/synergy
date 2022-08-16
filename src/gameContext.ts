import React from "react";

export interface IGameContextProp {
    isInRoom: boolean;
    setIsInRoom: (inRoom: boolean) => void;
};

const defaultState: IGameContextProp =  {
    isInRoom: false,
    setIsInRoom: () => {},
};

export default React.createContext(defaultState);