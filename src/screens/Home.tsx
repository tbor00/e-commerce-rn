import React from 'react'
import { View, Text } from 'react-native'
import { stylesGeneral } from '../styles/index'

export default function Home() {
    return (
        <View style={stylesGeneral.container}>
            <Text style={{ textAlign: 'center' }}>Estamos en la Home</Text>
        </View>
    )
}
