import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import { getAdressesApi, deleteAdressApi } from '../../api/addresses'
import useAuth from '../../hooks/useAuth'
import Loading from '../../components/Loading'
import { useNavigation } from '@react-navigation/native'
import AddressList from '../../components/Address/AddressList'

export interface Address {
    title: string
    name_lastname: string
    address: string
    postal_code: string
    state: string
    country: string
    phone: string
    city: string
    id?: string | number
}

export default function Addresses() {
    const navigation = useNavigation()
    const [addresses, setAddresses] = useState<any>()
    const { auth } = useAuth()

    const deleteAdress = (idAddress: string | number | undefined, titleAdress: string) => {
        Alert.alert(
            'Eliminar Direccion',
            `Estas seguro que deseas eliminar la direccion ${titleAdress}?`,
            [
                {
                    text: 'Si',
                    onPress: async () => {
                        const result = await deleteAdressApi(auth, idAddress)
                        const newAddresses = (addresses as Address[]).reduce((acum: Address[], value: Address) => {
                            if (value?.id === result.id) {
                                return [...acum]
                            }
                            return [...acum, value]
                        }, [])

                        setAddresses(newAddresses)
                    }
                },
                {
                    text: 'No eliminar'
                }
            ],
            { cancelable: false }
        )
    }

    const getMyAddresses = useCallback(() => {
        ;(async () => {
            const result = await getAdressesApi(auth)
            setAddresses(result)
        })()
    }, [])

    useFocusEffect(getMyAddresses)

    const returnWithAddresses = (addresses: Array<Address>) => {
        if (addresses.length) {
            return <AddressList addresses={addresses} deleteAdress={deleteAdress} />
        } else {
            return <Text style={styles.titleNotAdresses}>No tienes ninguna direccion, Crea una!</Text>
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Mis direcciones</Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('add-address' as any)}>
                <View style={styles.adAddress}>
                    <Text style={styles.adAddressText}>Add address</Text>
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
