import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { Button } from 'react-native-paper'
import Logo from '../../assets/logo.png'
import { stylesGeneral } from '../styles/index'
import RegisterForm from '../components/Auth/RegisterForm'
import LoginForm from '../components/Auth/LoginForm'

const Auth = () => {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <View style={stylesGeneral.container}>
            <Image style={styles.logo} source={Logo} />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                {showLogin ? <LoginForm setShowLogin={setShowLogin} /> : <RegisterForm setShowLogin={setShowLogin} />}
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 50,
        resizeMode: 'contain',
        marginBottom: 20
    }
})

export default Auth
