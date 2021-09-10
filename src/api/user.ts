import HttpFetch, { REACT_APP_CONTENT } from '../network/HttpFetch'

export const registerUserApi = async (formData: any) => {
    return HttpFetch('POST', `${REACT_APP_CONTENT}/auth/local/register`, formData)
}

export const loginUserApi = async (formData: any) => {
    return HttpFetch('POST', `${REACT_APP_CONTENT}/auth/local`, formData)
}

export const getMeAPi = async (token: string) => {
    return HttpFetch('GET', `${REACT_APP_CONTENT}/users/me`, undefined, token)
}

export const updateUserApi = (formData: any, user: any) => {
    return HttpFetch('PUT', `${REACT_APP_CONTENT}/users/${user.idUser}`, formData, user.token)
}
