import HttpClient, { REACT_APP_CONTENT } from './HttpClient'

export const registerUserApi = async (formData: any) => {
    return await HttpClient.post(`${REACT_APP_CONTENT}/auth/local/register`, formData)
}
