import React from 'react'
import { View, Text } from 'react-native'
import { stylesGeneral } from '../styles/index'

export default function Favorites() {
    return (
        <View style={stylesGeneral.container}>
            <Text style={{ textAlign: 'center' }}>Estamos en favoritos</Text>
        </View>
    )
}
