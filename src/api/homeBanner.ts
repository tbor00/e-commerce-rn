import HttpFetch, { REACT_APP_CONTENT } from '../network/HttpFetch'

export const getHomeBannersApi = () => {
    return HttpFetch('GET', `${REACT_APP_CONTENT}/home-banners?_sort=position:DESC`, undefined)
}
