import HttpFetch, { REACT_APP_CONTENT } from '../network/HttpFetch'
import { ProductInterface } from '../models/Product'

export const isFavoriteApi = (auth: any, idProduct: ProductInterface['id']) => {
    return HttpFetch('GET', `${REACT_APP_CONTENT}/favorites?user=${auth.idUser}&product=${idProduct}`, undefined, auth.token)
}

export const addFavoriteApi = (auth: any, idProduct: ProductInterface['id']) => {
    return HttpFetch('POST', `${REACT_APP_CONTENT}/favorites`, { user: auth.idUser, product: idProduct }, auth.token)
}

export const deleteFavoriteApi = (auth: any, idFavorite: ProductInterface['id']) => {
    return HttpFetch('DELETE', `${REACT_APP_CONTENT}/favorites/${idFavorite}`, undefined, auth.token)
}
