import React, { useEffect, useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'
import { useCookies } from 'react-cookie'
import userStore from '../store/userStore'
import Router from 'next/router'
import BeforeLogin from '../components/mainPage/BeforeLogin'
import AfterLogin from '../components/mainPage/AfterLogin'

const Index = () => {
    const [cookie, setCookie, removeCookie] = useCookies(['token'])
    const { userName, setUserName, removeUserName } = userStore()
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        if (userName != null && cookie.token) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [userName, cookie])

    return <div>{isLogin ? <AfterLogin /> : <BeforeLogin />}</div>
}
export default Index
