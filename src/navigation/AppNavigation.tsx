import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Home from '../screens/Home'
import Favorites from '../screens/Favorites'

const AppNavigation = () => {
    const Tab = createMaterialBottomTabNavigator()
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="home" component={Home} options={{ title: 'Inicio' }} />
                <Tab.Screen name="favorites" component={Favorites} options={{ title: 'Favoritos' }} />
                <Tab.Screen name="account" component={Home} options={{ title: 'Cuenta' }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation
