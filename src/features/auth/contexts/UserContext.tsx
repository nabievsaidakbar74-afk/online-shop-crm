import { useState, type ReactNode } from "react"
import { UserContext, type userType } from "../user"

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<userType | null>(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
