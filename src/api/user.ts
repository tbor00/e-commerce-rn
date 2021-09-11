import HttpFetch, { REACT_APP_CONTENT } from '../network/HttpFetch'
import { RegisterFormInterface, LoginFormInterface } from '../models/User'

export const registerUserApi = async (formData: RegisterFormInterface) => {
    return HttpFetch('POST', `${REACT_APP_CONTENT}/auth/local/register`, formData)
}

export const loginUserApi = async (formData: LoginFormInterface) => {
    return HttpFetch('POST', `${REACT_APP_CONTENT}/auth/local`, formData)
}

export const getMeAPi = async (token: string) => {
    return HttpFetch('GET', `${REACT_APP_CONTENT}/users/me`, undefined, token)
}

export const updateUserApi = (formData: any, user: any) => {
    return HttpFetch('PUT', `${REACT_APP_CONTENT}/users/${user.idUser}`, formData, user.token)
}
