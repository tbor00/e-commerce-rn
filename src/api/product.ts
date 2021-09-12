import HttpFetch, { REACT_APP_CONTENT } from '../network/HttpFetch'

export const getLastProductsApi = (limit: number = 20) => {
    return HttpFetch('GET', `${REACT_APP_CONTENT}/products?_limit=${limit}&_sort=createdAt:DESC`, undefined)
}

export const findOneProductApi = (idProduct: string) => {
    return HttpFetch('GET', `${REACT_APP_CONTENT}/products/${idProduct}`, undefined)
}
