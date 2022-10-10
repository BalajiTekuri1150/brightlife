import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '/components/Navbar';
import UsersList from '../components/UsersList';
import Register_Page from '../components/Register_Page';

export default function Home({users}) {
  console.log(users);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="keywords" content="mypage,first next app,next app" />
        <meta name="description" content="I created my first next"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
      </Head>
      <Register_Page/>
      {/* <h1 className={styles.title}>Hello World</h1> */}
      {/* <UsersList users={users}/> */}
    </div>
  )
}


// export async function getStaticProps(){
//   const res=await fetch("https://jsonplaceholder.typicode.com/users");
//   const users=await res.json();
//   return{
//     props:{
//       users,
//     },
//   }
// }

