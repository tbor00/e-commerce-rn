import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { formStyles } from '../../styles/index'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { loginUserApi } from '../../api/user'
import Toast from 'react-native-root-toast'
import useAuth from '../../hooks/useAuth'

const LoginForm = ({ setShowLogin }: { setShowLogin?: any }) => {
    const initialValues: { identifier: string; password: string } = {
        identifier: '',
        password: ''
    }
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)

    const validationSchema = {
        identifier: Yup.string().required(),
        password: Yup.string().required()
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: async (formData) => {
            setLoading(true)
            const result = await loginUserApi(formData)
            if (result.error) {
                Toast.show('Error al intentar loguear, intente nuevamente!', {
                    position: Toast.positions.CENTER
                })
            } else {
                login(result)
            }
            setLoading(false)
        }
    })

    return (
        <View>
            <TextInput
                label="Email o Nombre de usuario"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue('identifier', text)}
                value={formik.values.identifier}
                error={formik.errors.identifier}
            />
            <TextInput
                label="Password"
                style={formStyles.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue('password', text)}
                value={formik.values.password}
                error={formik.errors.password}
            />
            <Button mode="contained" onPress={formik.handleSubmit} loading={loading}>
                Sign In
            </Button>
            <Button
                mode="text"
                icon="account-plus"
                style={formStyles.btnText}
                labelStyle={formStyles.btnTextLabel}
                onPress={() => setShowLogin((prev: boolean) => !prev)}
            >
                Sign UP
            </Button>
        </View>
    )
}

export default LoginForm
