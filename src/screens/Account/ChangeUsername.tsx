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

export default function ChangeUsername() {
    const { auth } = useAuth()
    const { token } = auth as any
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)

    const initialValues: { username: string } = {
        username: ''
    }

    const validationSchema = {
        username: Yup.string().required()
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: async (formData) => {
            setLoading(true)
            const result = await updateUserApi(formData, auth)
            if (result.error) {
                Toast.show('Error al cambiar el username. Intenta de nuevo', {
                    position: Toast.positions.CENTER
                })
            } else {
                Toast.show('Se cambio el username satisfactoriamente', {
                    position: Toast.positions.CENTER
                })
                navigation.goBack()
            }
            setLoading(false)
        }
    })

    const getUsername = useCallback(() => {
        ;(async () => {
            const result = await getMeAPi(token)
            if (result.username) {
                formik.setFieldValue('username', result.username)
            }
        })()
    }, [])

    useFocusEffect(getUsername)

    return (
        <View style={styles.container}>
            <TextInput
                label="Nombre de usuario"
                style={formStyles.input}
                value={formik.values.username}
                error={formik.errors.username}
                onChangeText={(text) => formik.setFieldValue('username', text)}
            />
            <Button mode="contained" style={formStyles.btnSucces} loading={loading} onPress={formik.handleSubmit}>
                Cambiar Nombre de usuario
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})
