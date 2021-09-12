import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { formStyles } from '../../styles/index'
import { ProductInterface } from '../../models/Product'

export default function Buy({ product }: { product: ProductInterface }) {
    const addProductToCart = () => {}

    return (
        <Button mode="contained" icon="shopping" style={[formStyles.btnSucces, styles.btnShop]}>
            Agregar al carrito
        </Button>
    )
}

const styles = StyleSheet.create({
    btnShop: {
        marginTop: 20,
        marginBottom: 20
    }
})
