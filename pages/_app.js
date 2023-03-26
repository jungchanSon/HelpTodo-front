import React from 'react';
import '../styles/globals.css'
import Footer from "../components/Footer";
import Header from "../components/Header";
import {ThemeProvider} from "styled-components";
import defaultTheme from "../styles/Themes/theme";
import {CookiesProvider} from "react-cookie";

import 'bootstrap/dist/css/bootstrap.css';
function MyApp({
  Component,
  pageProps:{session, ...pageProps},
}) {
  return (

        <ThemeProvider theme={defaultTheme}>
          <CookiesProvider>
            <Header />
            <Component {...pageProps} />
            <Footer></Footer>
          </CookiesProvider>
        </ThemeProvider>

  )
}

export default MyApp
