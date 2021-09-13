import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import StatusBarCustom from '../../components/StatusBarCustom'
import { colors } from '../../styles/index'
import Search from '../../components/Search'
import NewProducts from '../../components/Home/NewProducts'
import Banner from '../../components/Home/Banner'

export default function Home() {
    return (
        <>
            <StatusBarCustom backgroundColor={colors.bgDark} />
            <Search />
            <ScrollView>
                <Banner />
                <NewProducts />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative'
    }
})
