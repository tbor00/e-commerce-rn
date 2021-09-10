import HttpFetch, { REACT_APP_CONTENT } from '../network/HttpFetch'
import { Address } from '../screens/Account/Addresses'

export const getAdressesApi = (auth: any) => {
    return HttpFetch('GET', `${REACT_APP_CONTENT}/addresses?user=${auth.idUser}`, undefined, auth.token)
}

export const addAddressApi = (auth: any, address: Address) => {
    return HttpFetch('POST', `${REACT_APP_CONTENT}/addresses`, { user: auth.idUser, ...address }, auth.token)
}
