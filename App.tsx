import React, { useState, useMemo, useEffect } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import Auth from './src/screens/Auth'
import { RootSiblingParent } from 'react-native-root-siblings'
import AuthContext from './src/context/AuthContext'
import { setDateWithLocalStorage, getDateWithLocalStorage, removeItemLocalStorage } from './src/api/token'
import jwtDecode from 'jwt-decode'
import AppNavigation from './src/navigation/AppNavigation'
import { Auth as AuthInterface } from './src/models/Auth'

export default function App() {
    const [auth, setAuth] = useState<Partial<AuthInterface> | any>(undefined)

    const login = (user: any) => {
        setDateWithLocalStorage('token', user.jwt).then(() => {
            setAuth({
                token: user.jwt,
                idUser: user.user._id
            })
        })
    }

    const logout = () => {
        removeItemLocalStorage('token').then(() => {
            setAuth(null)
        })
    }

    const authData = useMemo(() => ({ auth, login, logout }), [auth])

    useEffect(() => {
        getDateWithLocalStorage('token').then((res) => {
            if (res) {
                setAuth({
                    token: res,
                    idUser: jwtDecode<{ id?: string }>(res as string).id
                })
            }
        })
    }, [])

    return (
        <>
            <AuthContext.Provider value={authData}>
                <PaperProvider>
                    <RootSiblingParent>{auth ? <AppNavigation /> : <Auth />}</RootSiblingParent>
                </PaperProvider>
            </AuthContext.Provider>
        </>
    )
}
