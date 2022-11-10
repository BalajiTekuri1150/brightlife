import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
// import Footer from "../pages/footers"
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return <Component {...pageProps} />
  {/* <Footer/></>; */}
}

export default MyApp;