import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { getHomeBannersApi } from '../../api/homeBanner'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { REACT_APP_CONTENT } from '../../network/HttpFetch'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('window').width
const height = 160

export default function Banner() {
    const navigation = useNavigation()
    const [banner, setBanner] = useState([])
    const [bannerActive, setBannerActive] = useState<number>(0)

    const redirectToProduct = (idProduct?: string | number) => {
        navigation.navigate({ name: 'product', params: { idProduct } } as any)
    }

    const renderItem = ({ item }: any) => {
        return (
            <TouchableWithoutFeedback onPress={() => redirectToProduct(item.product.id)}>
                <Image
                    style={styles.carousel}
                    source={{
                        uri: `${REACT_APP_CONTENT}${item.banner.url}`
                    }}
                />
            </TouchableWithoutFeedback>
        )
    }

    useEffect(() => {
        ;(async () => {
            const result = await getHomeBannersApi()
            setBanner(result)
        })()
    }, [])

    return (
        <View style={styles.container}>
            <Carousel
                layout="default"
                data={banner}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
                onSnapToItem={(item) => setBannerActive(item)}
            />
            <Pagination
                dotsLength={banner?.length}
                activeDotIndex={bannerActive}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                containerStyle={styles.dotContainerStyle}
                dotStyle={styles.dot}
                inactiveDotStyle={styles.dot}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 1
    },
    carousel: {
        width: width,
        height: height
    },
    dotContainerStyle: {
        position: 'absolute',
        bottom: -20,
        width: '100%'
    },
    dot: {
        backgroundColor: '#fff'
    }
})
