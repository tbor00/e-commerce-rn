import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ProductInterface } from '../../models/Product'

export default function Price({ price, discount, quantity }: { price: ProductInterface['price']; discount?: ProductInterface['discount']; quantity: number }) {
    const calcPrice = (priceProd: ProductInterface['price'], discountProd: ProductInterface['discount']) => {
        if (!discountProd) return priceProd

        const discountAmount = (priceProd * discountProd) / 100
        return ((priceProd - discountAmount) * quantity).toFixed(2)
    }

    return (
        <>
            <View>
                {discount && (
                    <View style={styles.containerData}>
                        <Text style={styles.datatext}>Precio Recomendado</Text>
                        <Text style={[styles.dataValue, styles.oldPrice]}>${price}</Text>
                    </View>
                )}
            </View>

            <View style={styles.containerData}>
                <Text style={styles.datatext}>Precio Final:</Text>
                <Text style={[styles.dataValue, styles.currentPrice]}>{calcPrice(price, discount)}</Text>
            </View>

            {discount && (
                <View style={styles.containerData}>
                    <Text style={styles.datatext}>Ahorras: </Text>
                    <Text style={[styles.dataValue, styles.saving]}>
                        ${((price * discount * quantity) / 100).toFixed(2)} ({discount}%)
                    </Text>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    containerData: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    datatext: {
        width: '45%',
        fontSize: 17,
        color: '#747474',
        textAlign: 'right'
    },
    dataValue: {
        width: '55%',
        fontSize: 18,
        paddingLeft: 5
    },
    oldPrice: {
        textDecorationLine: 'line-through'
    },
    currentPrice: {
        fontSize: 23,
        color: '#bc0e0d'
    },
    saving: { color: '#bc0e0d' }
})
