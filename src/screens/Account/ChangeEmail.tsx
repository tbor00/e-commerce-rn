import React, { useState, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { formStyles } from '../../styles/index'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAuth from '../../hooks/useAuth'
import { getMeAPi, updateUserApi } from '../../api/user'
import Toast from 'react-native-root-toast'
import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

export default function ChangeEmail() {
    const { auth } = useAuth()
    const { token } = auth as any
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)

    const initialValues: { email: string } = {
        email: ''
    }

    const validationSchema = {
        email: Yup.string().email().required()
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: async (formData) => {
            setLoading(true)
            const result = await updateUserApi(formData, auth)
            if (result.error) {
                Toast.show('Error al cambiar el email. Intenta de nuevo', {
                    position: Toast.positions.CENTER
                })
            } else {
                Toast.show('Se cambio el email satisfactoriamente', {
                    position: Toast.positions.CENTER
                })
                navigation.goBack()
            }
            setLoading(false)
        }
    })

    const getUserEmail = useCallback(() => {
        ;(async () => {
            const result = await getMeAPi(token)
            if (result.email) {
                formik.setFieldValue('email', result.email)
            }
        })()
    }, [])

    useFocusEffect(getUserEmail)

    return (
        <View style={styles.container}>
            <TextInput
                label="Email"
                style={formStyles.input}
                value={formik.values.email}
                error={formik.errors.email}
                onChangeText={(text) => formik.setFieldValue('email', text)}
            />
            <Button mode="contained" style={formStyles.btnSucces} loading={loading} onPress={formik.handleSubmit}>
                Cambiar Email
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})
