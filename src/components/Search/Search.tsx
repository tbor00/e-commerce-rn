import React, { useState } from 'react'
import { View, StyleSheet, Keyboard, Animated } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { colors } from '../../styles/index'
import { AnimatedIcon, inputAnimationWidth, inputAnimation, animatedTransition, animatedTransitionReset, arrowAnimation } from './SearchAnimation'
import { useNavigation } from '@react-navigation/native'
import SearchHistory from './SearchHistory'
import { updateSearchHistoryApi } from '../../api/search'

export default function Search() {
    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('')
    const [showHistory, setShowHistory] = useState(false)
    const [containerHeight, setContainerHeight] = useState(0)

    const onChangeSearch = (query: string) => {
        setSearchQuery(query)
    }

    const openSearch = () => {
        animatedTransition.start()
        setShowHistory(!showHistory)
    }

    const closeSearch = () => {
        animatedTransitionReset.start()
        Keyboard.dismiss()
        setShowHistory(!showHistory)
    }

    const onSearch = async () => {
        await updateSearchHistoryApi(searchQuery)
        navigation.navigate({ name: 'search', params: { searchQuery } } as any)
        closeSearch()
    }

    return (
        <View style={styles.container} onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}>
            <View style={styles.containerInput}>
                <AnimatedIcon name="arrow-left" style={[styles.backArrow, arrowAnimation]} size={20} onPress={closeSearch} />
                <Animated.View style={[inputAnimation, { width: inputAnimationWidth }]}>
                    <Searchbar
                        placeholder="Busca tu producto"
                        value={searchQuery}
                        onFocus={openSearch}
                        onChangeText={onChangeSearch}
                        onSubmitEditing={onSearch}
                    />
                </Animated.View>
            </View>

            <SearchHistory showHistory={showHistory} containerHeight={containerHeight} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgDark,
        paddingVertical: 10,
        paddingHorizontal: 20,
        zIndex: 1
    },
    containerInput: {
        position: 'relative',
        alignItems: 'flex-end'
    },
    backArrow: {
        position: 'absolute',
        left: 0,
        top: 15,
        color: colors.fontLight
    }
})
