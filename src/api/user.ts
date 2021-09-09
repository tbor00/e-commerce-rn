import HttpClient, { REACT_APP_CONTENT } from '../network/HttpClient'

export const registerUserApi = async (formData: any) => {
    return await HttpClient.post(`${REACT_APP_CONTENT}/auth/local/register`, formData)
}

export const loginUserApi = async (formData: any) => {
    return await HttpClient.post(`${REACT_APP_CONTENT}/auth/local`, formData)
}

export const getMeAPi = async (token: string) => {
    return await HttpClient.get(`${REACT_APP_CONTENT}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
