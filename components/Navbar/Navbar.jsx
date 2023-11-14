import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import userStore from '/store/userStore'
import Image from 'next/image'
import Logo from '/public/logo.jpg'
import Link from 'next/link'
import LoginedNav from './LoginedNav'
import UnLoginedNav from './UnLoginedNav'
import NavBarPageButtons from './NavBarPageButtons'
import { Cookies, useCookies } from 'react-cookie'
import SignUp from './SignUp'

const Navbar = () => {
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

    return (
        <div>
            <nav className="navbar sticky-top" style={{ backgroundColor: '#e3f2fd' }}>
                <div className="container-fluid">
                    <NavBarPageButtons />
                    {isLogin ? (
                        <div>
                            <LoginedNav />
                        </div>
                    ) : (
                        <div>
                            <UnLoginedNav />
                            <SignUp />
                        </div>
                    )}
                </div>
            </nav>
            <Nav>
                <Link href="/">
                    <Image src={Logo} alt={'로고'} />
                </Link>
                <h3 className={'my-auto'}>팀프로젝트 계획을 도와드립니다 !</h3>
                <Empty></Empty>
            </Nav>
        </div>
    )
}

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;

    padding: 0 5%;

    border-bottom: 2px solid darkslategray;
`
const Empty = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export default Navbar
