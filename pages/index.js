import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Register_Page from '../components/Register_Page';
export default function Home({users}) {
  console.log(users);
  return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="keywords" content="mypage,first next app,next app" />
          <meta name="description" content="I created my first next"/>
          {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link> */}
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        </Head>
        <Register_Page/>
      </div>
  )
}