import '../styles/globals.css'
import { StoreProvider } from "../context/StoreProvider";
import App from "./index";

function MyApp({ Component, pageProps }) {
  return (
      <StoreProvider>
        <App/>
        <Component {...pageProps} />
      </StoreProvider>
      )
}

export default MyApp
