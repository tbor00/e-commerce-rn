import React, { useState } from 'react'
import { View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { formStyles } from '../../styles/index'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { registerUserApi } from '../../api/user'
import Toast from 'react-native-root-toast'

export default function RegisterForm({ setShowLogin }: { setShowLogin?: any }) {
    const initialValues: { email: string; username: string; password: string; repeatPassword: string } = {
        email: '',
        username: '',
        password: '',
        repeatPassword: ''
    }
    const [loading, setLoading] = useState(false)

    const validationSchema = {
        email: Yup.string().email().required(),
        username: Yup.string().required(),
        password: Yup.string().required(),
        repeatPassword: Yup.string()
            .required()
            .oneOf([Yup.ref('password')])
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: async (formData) => {
            setLoading(true)
            const result = await registerUserApi(formData)
            if (result.error) {
                Toast.show('Error, Intentalo Nuevamente', {
                    position: Toast.positions.CENTER
                })
            } else {
                setShowLogin((prev: boolean) => !prev)
            }
            setLoading(false)
        }
    })

    return (
        <View>
            <TextInput
                label="Email"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue('email', text)}
                value={formik.values.email}
                error={formik.errors.email}
            />
            <TextInput
                label="Nombre de usuario"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue('username', text)}
                value={formik.values.username}
                error={formik.errors.username}
            />
            <TextInput
                label="Password"
                style={formStyles.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue('password', text)}
                value={formik.values.password}
                error={formik.errors.password}
            />
            <TextInput
                label="Repeat Password"
                style={formStyles.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
            />
            <Button mode="contained" onPress={formik.handleSubmit} loading={loading}>
                Register
            </Button>
            <Button mode="text" style={formStyles.btnText} labelStyle={formStyles.btnTextLabel} onPress={() => setShowLogin((prev: boolean) => !prev)}>
                Login
            </Button>
        </View>
    )
}
