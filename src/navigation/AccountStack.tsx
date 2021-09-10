import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Account from '../screens/Account/Account'
import ChangeName from '../screens/Account/ChangeName'
import ChangeEmail from '../screens/Account/ChangeEmail'
import ChangeUsername from '../screens/Account/ChangeUsername'
import ChangePassword from '../screens/Account/ChangePassword'
import { colors } from '../styles/index'

const Stack = createStackNavigator()

export default function AccountStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.fontLight,
                headerStyle: { backgroundColor: colors.bgDark },
                cardStyle: {
                    backgroundColor: colors.bgLight
                }
            }}
        >
            <Stack.Screen name="account" component={Account} options={{ title: 'Cuenta', headerShown: false }} />
            <Stack.Screen name="change-name-account" component={ChangeName} options={{ title: 'Cambiar nombre y apellido' }} />
            <Stack.Screen name="change-email-account" component={ChangeEmail} options={{ title: 'Cambiar Email' }} />
            <Stack.Screen name="change-username-account" component={ChangeUsername} options={{ title: 'Cambiar Nombre de usuario' }} />
            <Stack.Screen name="change-password-account" component={ChangePassword} options={{ title: 'Cambiar Password' }} />
        </Stack.Navigator>
    )
}
