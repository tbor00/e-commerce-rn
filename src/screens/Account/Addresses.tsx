import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import { getAdressesApi } from '../../api/addresses'
import useAuth from '../../hooks/useAuth'
import Loading from '../../components/Loading'
import { useNavigation } from '@react-navigation/native'

export interface Address {
    title: string
    name_lastname: string
    address: string
    postal_code: string
    state: string
    country: string
    phone: string
    city: string
}

export default function Addresses() {
    const navigation = useNavigation()
    const [addresses, setAddresses] = useState<[]>()
    const { auth } = useAuth()

    const getMyAddresses = useCallback(() => {
        ;(async () => {
            const result = await getAdressesApi(auth)
            setAddresses(result)
        })()
    }, [])

    useFocusEffect(getMyAddresses)

    const returnWithAddresses = (addresses: Array<[]>) => {
        if (addresses.length) {
            return <Text>Listado de direcciones</Text>
        } else {
            return <Text style={styles.titleNotAdresses}>No tienes ninguna direccion, Crea una!</Text>
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Mis direcciones</Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('add-address' as any)}>
                <View style={styles.adAddress}>
                    <Text style={styles.adAddressText}>Add Direction</Text>
                    <IconButton icon="arrow-right" color="#000" />
                </View>
            </TouchableWithoutFeedback>
            {!addresses ? <Loading text="Buscando direcciones" sizeLoading="large" /> : returnWithAddresses(addresses)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontSize: 20
    },
    adAddress: {
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    adAddressText: {
        fontSize: 16
    },
    titleNotAdresses: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    }
})
