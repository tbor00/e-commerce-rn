import React, { useState, useCallback } from 'react'
import { ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { colors } from '../../styles/index'
import Search from '../../components/Search'
import StatusBarCustom from '../../components/StatusBarCustom'
import { getMeAPi } from '../../api/user'
import useAuth from '../../hooks/useAuth'
import Loading from '../../components/Loading'
import UserInfo from '../../components/Account/UserInfo'
import Menu from '../../components/Account/Menu'

export default function Account() {
    const [user, setUser] = useState<any>()
    const { auth } = useAuth()
    const { token } = auth as any

    const findMeUser = useCallback(() => {
        ;(async () => {
            const result = await getMeAPi(token)
            setUser(result)
        })()
    }, [])

    useFocusEffect(findMeUser)

    return (
        <>
            <StatusBarCustom backgroundColor={colors.bgDark} barStyle="light-content" />
            <Search />
            {user ? (
                <>
                    <ScrollView>
                        <UserInfo user={user} />
                        <Menu />
                    </ScrollView>
                </>
            ) : (
                <Loading text={'Cargando datos del usuario'} sizeLoading={'large'} colorLoading={colors.bgDark} />
            )}
        </>
    )
}
