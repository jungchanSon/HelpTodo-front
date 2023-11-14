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

function MyApp({ Component }) {
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
