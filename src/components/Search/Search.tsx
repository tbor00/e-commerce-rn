import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { colors } from '../../styles/index'

export default function Search() {
    return (
        <View style={styles.container}>
            <Searchbar placeholder="Search..." value="" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgDark,
        paddingVertical: 10,
        paddingHorizontal: 20
    }
})
