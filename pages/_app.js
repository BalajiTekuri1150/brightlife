import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
// import Footer from "../pages/footers"
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <Component {...pageProps} />
}

export default MyApp;