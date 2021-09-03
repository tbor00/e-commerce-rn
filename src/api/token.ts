import AsyncStorage from '@react-native-async-storage/async-storage'

export const setDateWithLocalStorage = (type: string, token: string) => {
    return AsyncStorage.setItem(type, token)
}

export const getDateWithLocalStorage = async (prop: string) => {
    return AsyncStorage.getItem(prop)
}

export const removeItemLocalStorage = async (item: string) => {
    return AsyncStorage.removeItem(item)
}
