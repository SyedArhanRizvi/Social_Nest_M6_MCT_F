import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [userVerified, setUserVerified] = useState(false);

    return (
        <UserContext.Provider value={{userVerified, setUserVerified}}> {children} </UserContext.Provider>
    );
};