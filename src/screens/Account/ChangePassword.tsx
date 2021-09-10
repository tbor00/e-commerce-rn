import React, { useState, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { formStyles } from '../../styles/index'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAuth from '../../hooks/useAuth'
import { updateUserApi } from '../../api/user'
import Toast from 'react-native-root-toast'
import { useNavigation } from '@react-navigation/native'

export default function ChangeUsername() {
    const { auth } = useAuth()
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)

    const initialValues: { password: string; repeatPassword: string } = {
        password: '',
        repeatPassword: ''
    }

    const validationSchema = {
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
            const result = await updateUserApi(formData, auth)
            if (result.error) {
                Toast.show('Error al cambiar el password. Intenta de nuevo', {
                    position: Toast.positions.CENTER
                })
            } else {
                Toast.show('Se cambio el password satisfactoriamente', {
                    position: Toast.positions.CENTER
                })
                navigation.goBack()
            }
            setLoading(false)
        }
    })

    return (
        <View style={styles.container}>
            <TextInput
                label="Nueva password"
                style={formStyles.input}
                value={formik.values.password}
                error={formik.errors.password}
                onChangeText={(text) => formik.setFieldValue('password', text)}
                secureTextEntry
            />
            <TextInput
                label="Repetir password"
                style={formStyles.input}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
                onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
                secureTextEntry
            />
            <Button mode="contained" style={formStyles.btnSucces} loading={loading} onPress={formik.handleSubmit}>
                Cambiar Password
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})
