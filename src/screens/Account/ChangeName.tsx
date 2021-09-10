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

export default function ChangeName() {
    const { auth } = useAuth()
    const { token } = auth as any
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)

    const initialValues: { name: string; lastname: string } = {
        name: '',
        lastname: ''
    }

    const validationSchema = {
        name: Yup.string().required(),
        lastname: Yup.string().required()
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: async (formData) => {
            setLoading(true)
            const result = await updateUserApi(formData, auth)
            if (result.error) {
                Toast.show('Error al cambiar el nombre. Intenta de nuevo', {
                    position: Toast.positions.CENTER
                })
            } else {
                Toast.show('Guardado Satisfactoriamente', {
                    position: Toast.positions.CENTER
                })
                navigation.goBack()
            }
            setLoading(false)
        }
    })

    const getNameAndLastname = useCallback(() => {
        ;(async () => {
            const result = await getMeAPi(token)
            if (result.name && result.lastname) {
                formik.setFieldValue('name', result.name)
                formik.setFieldValue('lastname', result.lastname)
            }
        })()
    }, [])

    useFocusEffect(getNameAndLastname)

    return (
        <View style={styles.container}>
            <TextInput
                label="Nombre"
                style={formStyles.input}
                value={formik.values.name}
                error={formik.errors.name}
                onChangeText={(text) => formik.setFieldValue('name', text)}
            />
            <TextInput
                label="Apellido"
                style={formStyles.input}
                value={formik.values.lastname}
                error={formik.errors.lastname}
                onChangeText={(text) => formik.setFieldValue('lastname', text)}
            />
            <Button mode="contained" style={formStyles.btnSucces} loading={loading} onPress={formik.handleSubmit}>
                Cambiar nombre y apellido
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})
