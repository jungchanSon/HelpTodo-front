import React, { useCallback, useEffect } from 'react'
import '../styles/globals.css'
import Header from '../components/header/Header'
import { ThemeProvider } from 'styled-components'
import defaultTheme from '../styles/Themes/theme'
import { CookiesProvider, useCookies } from 'react-cookie'

import 'bootstrap/dist/css/bootstrap.css'
import GlobalBackground from '../styles/globalBackground'
import axios from 'axios'

function MyApp({ Component }) {
    const [cookie] = useCookies(['token'])

    // useEffect(() => {
    //     if (cookie.token) {
    //         axios.defaults.headers.common['Authorization'] = `Bearer ${cookie.token}`
    //     }
    // ), []}
    if (cookie.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie.token}`
        console.log(axios.defaults.headers.common['Authorization'])
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <CookiesProvider>
                <GlobalBackground />
                <Header />
                <Component />
                {/*<Footer></Footer>*/}
            </CookiesProvider>
        </ThemeProvider>
    )
}

export default MyApp
