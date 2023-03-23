import React from 'react';
import '../styles/globals.css'
import Footer from "../components/Footer";
import Header from "../components/Header";
import {ThemeProvider} from "styled-components";
import defaultTheme from "../styles/Themes/theme";


import 'bootstrap/dist/css/bootstrap.css';
function MyApp({
  Component,
  pageProps:{session, ...pageProps},
}) {
  return (

        <ThemeProvider theme={defaultTheme}>
          <Header />
          <Component {...pageProps} />
          <Footer></Footer>
        </ThemeProvider>

  )
}

export default MyApp
