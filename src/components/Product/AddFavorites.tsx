import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { colors, formStyles } from '../../styles/index'
import { ProductInterface } from '../../models/Product'

export default function AddFavorites({ product }: { product: ProductInterface }) {
    const addProductToFavorites = () => {}

    return (
        <Button mode="contained" icon="heart" style={[formStyles.btnSucces, styles.btnShop]}>
            Agregar a favoritos
        </Button>
    )
}

const styles = StyleSheet.create({
    btnShop: {
        marginBottom: 20,
        backgroundColor: colors.bgDark
    }
})
