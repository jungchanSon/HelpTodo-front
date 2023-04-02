import React, { useEffect } from 'react'
import styled from 'styled-components'
import userStore from '../../store/userStore'
import { Cookies, useCookies } from 'react-cookie'
import roomData from '../../store/roomData'
import Router from 'next/router'

const LoginedNav = () => {
    const { userName, removeUserName } = userStore()
    const { removeRoomData } = roomData()
    const [cookie, , removeCookie] = useCookies(['token'])

    const handleLogout = () => {
        removeUserName()
        removeCookie('token')
        removeRoomData()

        Router.push('/')
    }

    return (
        <>
            <button type="button" className="mx-2 btn btn-light">
                {userName} 님
            </button>
            <button type="button" className="btn btn-outline-success" onClick={handleLogout}>
                로그아웃
            </button>
        </>
    )
}

export default LoginedNav
