import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
// import Footer from "../pages/footers"
import { useEffect } from "react";
import { createContext, useContext } from 'react';
import { useState } from 'react';
export const store=createContext();
function MyApp({ Component, pageProps }) {
  const [datas,setDatas]=useState()
  useEffect(()=>{
    if(typeof window!=='undefined'){
      setDatas(localStorage.getItem('profile'))
     }
  },[datas])
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <store.Provider value={{datas,setDatas}}>
      <Component {...pageProps}/>
    </store.Provider>
  )
}

export default MyApp;