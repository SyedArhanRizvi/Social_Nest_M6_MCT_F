import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user, setUser] = useState({});
    const [userId, setUSerId] = useState('');

    return (
        <UserContext.Provider value={{user, setUser, userId, setUSerId}}> {children} </UserContext.Provider>
    );
};