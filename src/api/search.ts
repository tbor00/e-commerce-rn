import AsyncStorage from '@react-native-async-storage/async-storage'
import { sortArrByDate } from '../utils/functions'

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
