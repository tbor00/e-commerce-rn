import { StyleSheet } from 'react-native'

// Colors general
export const colors = {
    primary: '#0098d3',
    danger: '#B61919',
    dark: '#000',
    fontLight: '#fff',
    bgLight: '#fff',
    bgDark: '#16222b'
}

export const formStyles = StyleSheet.create({
    input: {
        marginBottom: 20
    },
    btnSucces: {
        padding: 5,
        backgroundColor: colors.primary
    },
    btnText: {
        marginTop: 10
    },
    btnTextLabel: {
        color: colors.dark
    }
})

export const stylesGeneral = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin: 10
    }
})
