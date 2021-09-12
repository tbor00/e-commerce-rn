import React, { useState } from 'react'
import { Image, StyleSheet, Dimensions } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { REACT_APP_CONTENT } from '../../network/HttpFetch'

const widthPhone = Dimensions.get('window').width
const heightPhone = 300

export default function CarrouselImages({ images }: { images: any }) {
    const [imageActive, setImageActive] = useState<number>(0)

    const renderItem = ({ item }: any) => {
        return (
            <Image
                style={styles.carousel}
                source={{
                    uri: `${REACT_APP_CONTENT}${item.url}`
                }}
            />
        )
    }

    return (
        <>
            <Carousel
                layout="default"
                data={images}
                sliderWidth={widthPhone}
                itemWidth={300}
                renderItem={renderItem}
                onSnapToItem={(item) => setImageActive(item)}
            />
            <Pagination dotsLength={images?.length} activeDotIndex={imageActive} inactiveDotOpacity={0.4} inactiveDotScale={0.6} />
        </>
    )
}

const styles = StyleSheet.create({
    carousel: {
        height: heightPhone,
        resizeMode: 'contain'
    }
})
