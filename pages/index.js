import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Register_Page from '../components/Register_Page';
export default function Home() {
  return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="keywords" content="mypage,first next app,next app" />
          <meta name="description" content="I created my first next"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        </Head>
        <Register_Page/>
      </div>
  )
}