import AsyncStorage from '@react-native-async-storage/async-storage'
import { sortArrByDate } from '../utils/functions'
import HttpFetch, { REACT_APP_CONTENT } from '../network/HttpFetch'

export async function getSearchHistoryApi() {
    const history = await AsyncStorage.getItem('search-history')
    if (!history) return []
    else return sortArrByDate(JSON.parse(history))
}

export async function updateSearchHistoryApi(search: string) {
    const history: any = await getSearchHistoryApi()
    if (history.length > 5) {
        history.pop()
    }

    history.push({
        search,
        date: new Date()
    })

    await AsyncStorage.setItem('search-history', JSON.stringify(history))
}

export const searchProductApi = (search: string) => {
    return HttpFetch('GET', `${REACT_APP_CONTENT}/products?_q=${search}&_limit=40`, undefined)
}
