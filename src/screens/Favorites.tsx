import React from 'react'
import { View, Text } from 'react-native'
import { stylesGeneral } from '../styles/index'
import StatusBarCustom from '../components/StatusBarCustom'
import Search from '../components/Search'
import { colors } from '../styles/index'

export default function Favorites() {
    return (
        <>
            <StatusBarCustom backgroundColor={colors.bgDark} />
            <Search />
            <View style={stylesGeneral.container}>
                <Text style={{ textAlign: 'center' }}>Estamos en favoritos</Text>
            </View>
        </>
    )
}
