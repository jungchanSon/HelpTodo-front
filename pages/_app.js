import React, { useEffect } from 'react'
import '../styles/globals.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { ThemeProvider } from 'styled-components'
import defaultTheme from '../styles/Themes/theme'
import { CookiesProvider, useCookies } from 'react-cookie'

import 'bootstrap/dist/css/bootstrap.css'
import Router from 'next/router'
import userStore from '../store/userStore'

function MyApp({ Component, pageProps: { ...pageProps } }) {
    let [cookie, setCookie, removeCookie] = useCookies(['token'])
    const { userName } = userStore()

    useEffect(() => {
        const currentPage = Component.name
        const NO_REQUIRED_LOGIN_PAGES = ['Index', 'signupPage', 'LoginPage']

        if (!NO_REQUIRED_LOGIN_PAGES.includes(currentPage)) {
            if (!cookie || !userName) {
                Router.push('/login')
            }
        }
    }, [Component])

    return (
        <ThemeProvider theme={defaultTheme}>
            <CookiesProvider>
                <Header />
                <Component />
                <Footer></Footer>
            </CookiesProvider>
        </ThemeProvider>
    )
}

export default MyApp
