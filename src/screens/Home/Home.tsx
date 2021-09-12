import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { stylesGeneral } from '../../styles/index'
import StatusBarCustom from '../../components/StatusBarCustom'
import { colors } from '../../styles/index'
import Search from '../../components/Search'
import NewProducts from '../../components/Home/NewProducts'

export default function Home() {
    return (
        <>
            <StatusBarCustom backgroundColor={colors.bgDark} />
            <Search />
            <View>
                <NewProducts />
            </View>
        </>
    )
}
