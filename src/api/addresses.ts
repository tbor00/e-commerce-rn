import HttpFetch, { REACT_APP_CONTENT } from '../network/HttpFetch'
import { Address } from '../models/Adress'
import { Auth } from '../models/Auth'

export const getAdressesApi = (auth: any) => {
    return HttpFetch('GET', `${REACT_APP_CONTENT}/addresses?user=${auth.idUser}`, undefined, auth.token)
}

export const findOneAddressApi = (auth: any, idAddress: string) => {
    return HttpFetch('GET', `${REACT_APP_CONTENT}/addresses/${idAddress}`, undefined, auth.token)
}

export const addAddressApi = (auth: any, address: Address) => {
    return HttpFetch('POST', `${REACT_APP_CONTENT}/addresses`, { user: auth.idUser, ...address }, auth.token)
}

export const deleteAdressApi = (auth: any, idAddress: string | number | undefined) => {
    return HttpFetch('DELETE', `${REACT_APP_CONTENT}/addresses/${idAddress}`, undefined, auth.token)
}
