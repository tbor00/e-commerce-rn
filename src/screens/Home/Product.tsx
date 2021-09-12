import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { findOneProductApi } from '../../api/product'
import { ProductInterface } from '../../models/Product'
import StatusBarCustomComponent from '../../components/StatusBarCustom'
import { colors } from '../../styles/index'
import Search from '../../components/Search'
import Loading from '../../components/Loading'
import CarrouselImages from '../../components/Product/CarrouselImages'
import Price from '../../components/Product/Price'
import Quantity from '../../components/Product/Quantity'
import Buy from '../../components/Product/Buy'
import AddFavorites from '../../components/Product/AddFavorites'

export default function Product(props: any) {
    // Triple destructuring
    const {
        route: {
            params: { idProduct }
        }
    } = props
    const [product, setProduct] = useState<ProductInterface>()
    const [imageCarousel, setImageCarousel] = useState<any>()
    const [quantity, setQuantity] = useState<number>(1)
    const [priceFinal, setPriceFinal] = useState<string | number>()

    const getPriceDiscount = () => {
        if (product?.discount) {
            const discountAmount = (product.price * product?.discount) / 100
            let discount = ((product.price - discountAmount) * quantity).toFixed(2)
            setPriceFinal(discount)
        } else {
            setPriceFinal(product?.price)
        }
    }

    useEffect(() => {
        ;(async () => {
            const response = await findOneProductApi(idProduct)
            setProduct(response)
            const arr = [response?.main_image]
            arr.push(...response.images)
            setImageCarousel(arr)
        })()
    }, [idProduct])

    return (
        <>
            <StatusBarCustomComponent background={colors.bgDark} />
            <Search />
            {product ? (
                product.error ? (
                    <View>
                        <Text>Hubo un error con este producto</Text>
                    </View>
                ) : (
                    <ScrollView style={styles.container}>
                        <Text style={styles.title}>{product.title}</Text>
                        {imageCarousel && <CarrouselImages images={imageCarousel} />}
                        <View style={styles.containerView}>
                            <Price price={product.price} discount={product.discount} quantity={quantity} />
                            <Quantity quantity={quantity} setQuantity={setQuantity} />
                            <View style={{ zIndex: 1 }}>
                                <Buy product={product} />
                                <AddFavorites product={product} />
                            </View>
                        </View>
                    </ScrollView>
                )
            ) : (
                <Loading text="Recuperando datos del producto" sizeLoading="large" />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 50
    },
    title: {
        padding: 10,
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20
    },
    containerView: {
        padding: 10,
        marginBottom: 20
    }
})
