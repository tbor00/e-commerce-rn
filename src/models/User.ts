import { Auth } from './Auth'

export interface ContextInterface {
    auth: Auth
    login: (user: any) => void
    logout: () => void
}

export interface UserInterface {
    username: string
    email: string
    name: string
    lastname: string
}

export interface RegisterFormInterface {
    email: string
    username: string
    password: string
    repeatPassword: string
}

export interface LoginFormInterface {
    identifier: string
    password: string
}
