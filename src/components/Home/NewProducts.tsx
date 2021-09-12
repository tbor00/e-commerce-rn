import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { View, Text, StyleSheet } from 'react-native'
import { getLastProductsApi } from '../../api/product'
import ListProduct from './ListProduct'
import { useNavigation } from '@react-navigation/core'

export default function NewProducts() {
    const navigation = useNavigation()
    const [newProducts, setNewProducts] = useState()

    const redirectToProduct = (idProduct: string | number | undefined) => {
        navigation.navigate({ name: 'product', params: { idProduct } } as any)
    }

    const getNewProducts = useCallback(() => {
        ;(async () => {
            const result = await getLastProductsApi()
            setNewProducts(result)
        })()
    }, [])

    useFocusEffect(getNewProducts)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nuevos Productos</Text>
            {newProducts && <ListProduct products={newProducts} redirectToProduct={redirectToProduct} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    }
})
