import { createContext, useContext, type Dispatch, type SetStateAction } from "react"

export interface userType {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
  role: string
  isActive: boolean
}

export type UserState = {
  user: userType | null
  setUser: Dispatch<SetStateAction<userType | null>>
}

export const UserContext = createContext<UserState>({
  user: null,
  setUser: () => {},
})

export const useUser = () => useContext(UserContext)
