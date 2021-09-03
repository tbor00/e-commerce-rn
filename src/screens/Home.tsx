import React from 'react'
import { View, Text } from 'react-native'
import { stylesGeneral } from '../styles/index'
import { Button } from 'react-native-paper'
import useAuth from '../hooks/useAuth'

export default function Home() {
    const { logout } = useAuth()

    return (
        <View style={stylesGeneral.container}>
            <Text style={{ textAlign: 'center' }}>Estamos en la Home</Text>
            <Button onPress={logout}>Desloguear</Button>
        </View>
    )
}
