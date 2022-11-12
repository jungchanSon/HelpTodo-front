import '../styles/globals.css'
import Footer from "../components/Footer";
import Header from "../components/Header";
import {ThemeProvider} from "styled-components";
import defaultTheme from "../styles/Themes/theme";

function MyApp({ Component, pageProps }) {
  return (
      <ThemeProvider theme={defaultTheme}>
        <Header></Header>
        <Component {...pageProps} />
        <Footer></Footer>
      </ThemeProvider>
  )
}

export default MyApp
