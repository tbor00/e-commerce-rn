import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { colors, formStyles } from '../../styles/index'
import { ProductInterface } from '../../models/Product'
import { isFavoriteApi, addFavoriteApi, deleteFavoriteApi } from '../../api/favorites'
import useAuth from '../../hooks/useAuth'

export default function AddFavorites({ product }: { product: ProductInterface }) {
    const [favorite, setFavorite] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [addOrDeleteFavorite, setAddOrDeleteFavorite] = useState<boolean>()

    const { auth } = useAuth()

    const deleteProductToFavorite = async (id: ProductInterface['id']) => {
        setLoading(true)
        const result = await deleteFavoriteApi(auth, id)
        if (!result.error) {
            setAddOrDeleteFavorite(!addOrDeleteFavorite)
        }
        setLoading(false)
    }

    const addProductToFavorites = async (id: ProductInterface['id']) => {
        setLoading(true)
        const result = await addFavoriteApi(auth, id)
        if (!result.error) {
            setAddOrDeleteFavorite(!addOrDeleteFavorite)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (product?.id) {
            ;(async () => {
                setLoading(true)
                const result = await isFavoriteApi(auth, product?.id)
                if (!result.error) {
                    setFavorite(result)
                }
                setLoading(false)
            })()
        }
    }, [addOrDeleteFavorite])

    const styles = StyleSheet.create({
        btnShop: {
            marginBottom: 20,
            backgroundColor: favorite?.length ? colors.danger : colors.bgDark
        }
    })

    return (
        <Button
            mode="contained"
            icon="heart"
            style={[formStyles.btnSucces, styles.btnShop]}
            onPress={() => (favorite?.length ? deleteProductToFavorite(favorite[0]?.id) : addProductToFavorites(product?.id ?? ''))}
            loading={loading}
        >
            {favorite?.length ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        </Button>
    )
}
