import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { colors } from '../../styles/index'
import { getSearchHistoryApi } from '../../api/search'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { useFocusEffect } from '@react-navigation/native'

export default function SearchHistory({ showHistory, containerHeight }: { showHistory: boolean; containerHeight: number }) {
    const [history, setHistory] = useState<{ date: Date; search: string }[]>()

    const getSearch = useCallback(() => {
        if (showHistory) {
            ;(async () => {
                const result = await getSearchHistoryApi()
                setHistory(result)
            })()
        }
    }, [showHistory])

    useFocusEffect(getSearch)

    return (
        <View style={[showHistory ? styles.history : styles.hidden, { top: containerHeight, elevation: 3 }]}>
            {history &&
                history.map(({ search }, index) => (
                    <TouchableWithoutFeedback key={index} onPress={() => console.log('ASd')}>
                        <View style={styles.historyItem}>
                            <Text>{search}</Text>
                            <AwesomeIcon name="arrow-right" size={16} />
                        </View>
                    </TouchableWithoutFeedback>
                ))}
        </View>
    )
}

const styles = StyleSheet.create({
    hidden: {
        display: 'none'
    },
    history: {
        position: 'absolute',
        backgroundColor: colors.bgLight,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    historyItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 0.2,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        color: '#53005f',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
