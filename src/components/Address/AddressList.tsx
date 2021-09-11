import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Address } from '../../models/Adress'
import { List, Button } from 'react-native-paper'
import { colors } from '../../styles/index'

export default function AddressList({
    addresses,
    deleteAdress,
    updateAdress
}: {
    addresses: Address[]
    deleteAdress: (idAddress: string | number | undefined, titleAddres: string) => void
    updateAdress: (idAddress: string | number | undefined) => void
}) {
    return (
        <View style={styles.container}>
            {addresses.map(({ title, id, address }) => (
                <View style={styles.address}>
                    <List.Item key={id} title={title} description={address} left={(props) => <List.Icon {...props} icon="map-marker" />} />
                    <View style={styles.actions}>
                        <Button icon="pencil" color={colors.primary} onPress={() => updateAdress(id)}>
                            Editar
                        </Button>
                        <Button icon="delete" color={colors.danger} style={{ marginLeft: 5 }} onPress={() => deleteAdress(id, title)}>
                            Eliminar
                        </Button>
                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    address: {
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 15
    },
    actions: {
        flexDirection: 'row',
        marginTop: 10
    }
})
