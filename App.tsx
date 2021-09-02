import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import Auth from './src/screens/Auth'
import { RootSiblingParent } from 'react-native-root-siblings'

export default function App() {
    const [auth, setAuth] = useState(undefined)

    return (
        <PaperProvider>
            <RootSiblingParent>
                {auth ? <Text>Zona de usuarios</Text> : <Auth />}
                {/* <View style={styles.container}>
                <Auth />
            </View> */}
            </RootSiblingParent>
        </PaperProvider>
    )
}
