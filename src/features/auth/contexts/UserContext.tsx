import { createContext, useContext, useState, type ReactNode } from "react";

const UserContext = createContext()


export interface userType {
    "id": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "phone": string,
    "avatar": string,
    "role": string,
    "isActive": boolean,
}


const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userType | null>(null)
    return (
        <>
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>
        </>
    )
}


export const useUser = () => useContext(UserContext)

export default UserProvider