import React, { useEffect } from 'react'
import styled from 'styled-components'
import userStore from '../../store/userStore'
import { Cookies, useCookies } from 'react-cookie'

const LogoutNav = () => {
    const { userName, removeUserName, setUserName, userId, setUserId, removeUserId } = userStore()
    const [cookie, setCookie, removeCookie] = useCookies(['token'])

    const handleLogout = () => {
        removeUserName()
        removeCookie('token')
    }

    return (
        <>
            <button type="button" className="mx-2 btn btn-light">
                {'asd'} 님
            </button>
            <button type="button" className="btn btn-outline-success" onClick={handleLogout}>
                로그아웃
            </button>
        </>
    )
}

export default LogoutNav
