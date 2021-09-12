import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home/Home'
import Product from '../screens/Home/Product'
import { colors } from '../styles'

const Stack = createStackNavigator()

export default function ProductStack() {
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
            <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="product" component={Product} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
