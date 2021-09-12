import React from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { ProductInterface } from '../../models/Product'
import { REACT_APP_CONTENT } from '../../network/HttpFetch'

export default function ListProduct({
    products,
    redirectToProduct
}: {
    products: ProductInterface[]
    redirectToProduct: (id: string | number | undefined) => void
}) {
    return (
        <View style={styles.container}>
            {products?.map(({ title, price, main_image, id }: ProductInterface) => (
                <TouchableWithoutFeedback key={id} onPress={() => redirectToProduct(id)}>
                    <View style={styles.containerProduct}>
                        <View style={styles.product}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: `${REACT_APP_CONTENT}${main_image.url}`
                                }}
                            />
                            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                                {title}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: -3
    },
    containerProduct: {
        width: '50%',
        padding: 3
    },
    product: {
        backgroundColor: '#F0f0f0',
        padding: 10
    },
    image: {
        height: 150,
        resizeMode: 'contain'
    },
    name: {
        marginTop: 15,
        fontSize: 18
    }
})
