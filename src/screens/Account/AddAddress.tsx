import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { formStyles } from '../../styles/index'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Address } from '../../models/Adress'
import { addAddressApi, findOneAddressApi } from '../../api/addresses'
import useAuth from '../../hooks/useAuth'
import Toast from 'react-native-root-toast'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Loading from '../../components/Loading'

export default function AddAddress(props: any) {
    const { route } = props

    const { auth } = useAuth()

    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)

    const [edit, setEdit] = useState(false)

    const initialValues: Address = {
        title: '',
        name_lastname: '',
        address: '',
        postal_code: '',
        city: '',
        state: '',
        country: '',
        phone: ''
    }

    const validationSchema = {
        title: Yup.string().required(),
        name_lastname: Yup.string().required(),
        address: Yup.string().required(),
        postal_code: Yup.string().required(),
        city: Yup.string().required(),
        state: Yup.string().required(),
        country: Yup.string().required(),
        phone: Yup.string().required()
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: async (formData) => {
            setLoading(true)
            const result = await addAddressApi(auth, formData)
            if (result.error) {
                Toast.show('Error al Cargar la direccion, intente nuevamente!', {
                    position: Toast.positions.CENTER
                })
            } else {
                Toast.show('Se agrego la direccion satisfactoriamente', {
                    position: Toast.positions.CENTER
                })
                navigation.goBack()
            }
            setLoading(false)
        }
    })

    const getAdress = useCallback(() => {
        if (route?.params?.idAddress) {
            setEdit(true)
            navigation.setOptions({ title: 'Editar direccion' })
            ;(async () => {
                const result = await findOneAddressApi(auth, route?.params.idAddress)
                if (!result.error) {
                    formik.setFieldValue('title', result.title)
                    formik.setFieldValue('name_lastname', result.name_lastname)
                    formik.setFieldValue('address', result.address)
                    formik.setFieldValue('postal_code', result.postal_code)
                    formik.setFieldValue('city', result.city)
                    formik.setFieldValue('country', result.country)
                    formik.setFieldValue('state', result.state)
                    formik.setFieldValue('phone', result.phone)
                }
                setEdit(false)
            })()
        }
    }, [])

    useFocusEffect(getAdress)

    return (
        <>
            {edit ? (
                <Loading text="Recuperando datos" sizeLoading="large" />
            ) : (
                <KeyboardAwareScrollView extraScrollHeight={25}>
                    <View style={styles.container}>
                        <Text style={styles.title}>{route?.params?.idAddress ? 'Editar Direccion' : 'Nueva Direccion'}</Text>
                        <TextInput
                            label="Titulo"
                            style={formStyles.input}
                            value={formik.values.title}
                            error={formik.errors.title}
                            onChangeText={(text) => formik.setFieldValue('title', text)}
                        />
                        <TextInput
                            label="Nombre y apellidos"
                            style={formStyles.input}
                            value={formik.values.name_lastname}
                            error={formik.errors.name_lastname}
                            onChangeText={(text) => formik.setFieldValue('name_lastname', text)}
                        />
                        <TextInput
                            label="Direccion"
                            style={formStyles.input}
                            value={formik.values.address}
                            error={formik.errors.address}
                            onChangeText={(text) => formik.setFieldValue('address', text)}
                        />
                        <TextInput
                            label="Codigo postal"
                            style={formStyles.input}
                            value={formik.values.postal_code}
                            error={formik.errors.postal_code}
                            onChangeText={(text) => formik.setFieldValue('postal_code', text)}
                        />
                        <TextInput
                            label="Provincia"
                            style={formStyles.input}
                            value={formik.values.state}
                            error={formik.errors.state}
                            onChangeText={(text) => formik.setFieldValue('state', text)}
                        />
                        <TextInput
                            label="Ciudad"
                            style={formStyles.input}
                            value={formik.values.city}
                            error={formik.errors.city}
                            onChangeText={(text) => formik.setFieldValue('city', text)}
                        />
                        <TextInput
                            label="Pais"
                            style={formStyles.input}
                            value={formik.values.country}
                            error={formik.errors.country}
                            onChangeText={(text) => formik.setFieldValue('country', text)}
                        />
                        <TextInput
                            label="Telefono"
                            style={formStyles.input}
                            value={formik.values.phone}
                            error={formik.errors.phone}
                            onChangeText={(text) => formik.setFieldValue('phone', text)}
                        />
                        <Button loading={loading} mode="contained" style={[formStyles.btnSucces, styles.btnSucces]} onPress={formik.handleSubmit}>
                            {route?.params?.idAddress ? 'Editar Direccion' : 'Cargar Direccion'}
                        </Button>
                    </View>
                </KeyboardAwareScrollView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    title: {
        fontSize: 20,
        paddingVertical: 20
    },
    btnSucces: {
        marginBottom: 20
    }
})
