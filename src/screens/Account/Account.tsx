import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { ScrollView, Text } from 'react-native'
import { colors } from '../../styles/index'
import Search from '../../components/Search'
import StatusBarCustom from '../../components/StatusBarCustom'
import { getMeAPi } from '../../api/user'
import useAuth from '../../hooks/useAuth'
import Loading from '../../components/Loading'

export default function Account() {
    const [user, setUser] = useState<any>()
    const { auth } = useAuth()
    const { token } = auth as any

    const findMeUser = useCallback(() => {
        getMeAPi(token).then((response) => {
            setUser(response.data)
        })
    }, [])

    useFocusEffect(() => {
        findMeUser()
    })

    return (
        <>
            <StatusBarCustom backgroundColor={colors.bgDark} barStyle="light-content" />
            <Search />
            {user ? (
                <>
                    <ScrollView>
                        <Text style={{ textAlign: 'center' }}>Estamos en Account</Text>
                    </ScrollView>
                </>
            ) : (
                <Loading text={'Cargando datos del usuario'} sizeLoading={'large'} colorLoading={colors.bgDark} />
            )}
        </>
    )
}
