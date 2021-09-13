import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { searchProductApi } from '../../api/search'
import Loading from '../../components/Loading'
import ListProduct from '../../components/Home/ListProduct'
import { useNavigation } from '@react-navigation/native'
import StatusBarCustom from '../../components/StatusBarCustom'
import { colors } from '../../styles/index'
import Search from '../../components/Search'

export default function SearchScreen(props: any) {
    const {
        route: {
            params: { searchQuery }
        }
    } = props
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<[]>()

    const redirectToProduct = (idProduct: string | number | undefined) => {
        navigation.navigate({ name: 'product', params: { idProduct } } as any)
    }

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const response = await searchProductApi(searchQuery)
            if (!response.error) {
                setProducts(response)
            }
            setLoading(false)
        })()
    }, [searchQuery])

    return (
        <>
            <StatusBarCustom backgroundColor={colors.bgDark} />
            <Search currentSearch={searchQuery} />

            {loading ? (
                <Loading text={`Buscando productos coincidientes con: ${searchQuery}`} sizeLoading="large" />
            ) : products?.length ? (
                <>
                    <View style={styles.containerListProduct}>
                        <Text style={styles.textProducts}>Productos con coincidiencias</Text>
                        <ListProduct products={products} redirectToProduct={redirectToProduct} />
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.containerNotProduct}>
                        <Text style={styles.textNotProducts}>No hay productos que coincidan con {searchQuery}</Text>
                        <Text>Revisa la ortografia o usa terminos mas generales</Text>
                    </View>
                </>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    containerListProduct: {
        marginTop: 20,
        margin: 20
    },
    textProducts: {
        paddingBottom: 20,
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    containerNotProduct: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    textNotProducts: {
        paddingBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})
