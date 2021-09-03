import { createContext } from 'react'

const AuthContext = createContext({
    auth: undefined,
    login: (user: any) => {},
    logout: () => {}
})

export default AuthContext
