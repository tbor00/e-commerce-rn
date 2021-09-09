import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { StyleSheet } from 'react-native'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../styles/index'
import Home from '../screens/Home'
import Favorites from '../screens/Favorites'
import Cart from '../screens/Cart'
import AccountStack from './AccountStack'

const AppNavigation = () => {
    const setIcon = (route: any, routerStatus: any) => {
        let iconName = ''

        switch (route.name) {
            case 'home':
                iconName = 'home'
                break
            case 'favorites':
                iconName = 'heart'
                break
            case 'cart':
                iconName = 'shopping-cart'
                break
            case 'account-stack':
                iconName = 'bars'
                break
            default:
                break
        }

        return <AwesomeIcon name={iconName} style={styles.icon} />
    }

    const Tab = createMaterialBottomTabNavigator()

    return (
        <NavigationContainer>
            <Tab.Navigator
                barStyle={styles.navigation}
                screenOptions={({ route }) => ({
                    tabBarIcon: (routerStatus) => {
                        return setIcon(route, routerStatus)
                    }
                })}
            >
                <Tab.Screen name="home" component={Home} options={{ title: 'Inicio' }} />
                <Tab.Screen name="favorites" component={Favorites} options={{ title: 'Favoritos' }} />
                <Tab.Screen name="cart" component={Cart} options={{ title: 'Carrito' }} />
                <Tab.Screen name="account-stack" component={AccountStack} options={{ title: 'Cuenta' }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: colors.bgDark
    },
    icon: {
        fontSize: 20,
        color: colors.fontLight
    }
})

export default AppNavigation
