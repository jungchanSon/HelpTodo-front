import React, { useCallback, useEffect } from 'react'
import '../styles/globals.css'
import Header from '../components/header/Header'
import { ThemeProvider } from 'styled-components'
import defaultTheme from '../styles/Themes/theme'
import { CookiesProvider } from 'react-cookie'

import 'bootstrap/dist/css/bootstrap.css'
import GlobalBackground from '../styles/globalBackground'

function MyApp({ Component }) {


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
