import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { formStyles } from '../../styles/index'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Address } from './Addresses'
import { addAddressApi } from '../../api/addresses'
import useAuth from '../../hooks/useAuth'
import Toast from 'react-native-root-toast'
import { useNavigation } from '@react-navigation/native'

export default function AddAddress() {
    const { auth } = useAuth()
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)

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

    return (
        <KeyboardAwareScrollView extraScrollHeight={25}>
            <View style={styles.container}>
                <Text style={styles.title}>Nueva direccion</Text>
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
                    Cargar Direccion
                </Button>
            </View>
        </KeyboardAwareScrollView>
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
