import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import { List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../../hooks/useAuth'

export default function Menu() {
    const navigation = useNavigation()
    const { logout } = useAuth()

    const logoutAccount = () => {
        Alert.alert('Cerrar Sesion', 'Estas seguro que quieres salir de tu cuenta?', [
            {
                text: 'Si',
                onPress: logout
            },
            {
                text: 'No'
            }
        ]),
            { cancelable: false }
    }

    return (
        <>
            <List.Section>
                <List.Subheader>Mi cuenta</List.Subheader>
                <List.Item title="Cambiar Nombre" description="Cambiar el nombre de tu cuenta" left={(props) => <List.Icon {...props} icon="face" />} />
                <List.Item title="Cambiar Email" description="Cambiar el email de tu cuenta" left={(props) => <List.Icon {...props} icon="at" />} />
                <List.Item
                    title="Cambiar Username"
                    description="Cambiar el nombre de usuario de tu cuenta"
                    left={(props) => <List.Icon {...props} icon="sim" />}
                />
                <List.Item title="Cambiar password" description="Cambiar la password de tu cuenta" left={(props) => <List.Icon {...props} icon="key" />} />
                <List.Item title="Mis direcciones" description="Administra tus direcciones de envio" left={(props) => <List.Icon {...props} icon="map" />} />
            </List.Section>
            <List.Section>
                <List.Subheader>App</List.Subheader>
                <List.Item title="Mis pedidos" description="Gestiona todos tus pedidos" left={(props) => <List.Icon {...props} icon="clipboard-list" />} />
                <List.Item
                    title="Lista de deseos"
                    description="Listado de productos que te quieres comprar"
                    left={(props) => <List.Icon {...props} icon="heart" />}
                    onPress={() => navigation.navigate('favorites' as any)}
                />
                <List.Item
                    title="Cerrar sesion"
                    description="Cierra esta sesion y inicia con otra"
                    left={(props) => <List.Icon {...props} icon="logout" />}
                    onPress={logoutAccount}
                />
            </List.Section>
        </>
    )
}

const styles = StyleSheet.create({})
