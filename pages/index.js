import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Register_Page from './register/Register_Page';
import Home_page from '../components/home_page';

export default function Home() {
  
  return (
    
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          {/* <meta name="keywords" content="mypage,first next app,next app" />
          <meta name="description" content="I created my first next"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta> */}
          {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link> */}
        </Head>
        {/* <Register_Page/> */}
        
          <Home_page/>
        
      </div>
  )
}