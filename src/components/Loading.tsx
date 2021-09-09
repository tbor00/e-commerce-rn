import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'

export default function Loading({ text, sizeLoading, colorLoading }: { text?: string; sizeLoading: number | 'small' | 'large'; colorLoading?: string }) {
    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator size={sizeLoading} color={colorLoading ?? '#000'} style={styles.loading} />
            <Text>{text ?? 'Cargando...'}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loading: {
        marginBottom: 10
    },
    title: {
        fontSize: 18
    }
})
