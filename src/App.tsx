import { BrowserRouter } from "react-router-dom"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import IndexRoute from "./routes/IndexRoute"
import UserProvider from "./features/auth/contexts/UserContext"

function App() {

  const Client = new QueryClient()
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={Client}>
          <UserProvider>
            <IndexRoute />
          </UserProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

export default App
