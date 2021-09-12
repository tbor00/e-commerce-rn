import React from 'react'
import { View, Text } from 'react-native'

export default function Search(props: any) {
    const {
        route: {
            params: { searchQuery }
        }
    } = props

    return (
        <View>
            <Text>Search...</Text>
        </View>
    )
}
