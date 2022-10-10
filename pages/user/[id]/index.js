import React from 'react';
import homestyle from '../../../styles/Home.module.css';

const index=({users})=>
{
    return(
        <main className={homestyle.main}>
            <div className={homestyle.grid}>
           <div className={homestyle.card}>
                    <p>{users.id}</p>
                    <p>{users.name}</p>
                    <p>{users.email}</p>
                    <p>{users.company.name}</p>
                    <p>{users.website}</p>
             </div>
            </div>
        </main>
    );
}


export async function getServerSideProps(context){
const res=await fetch(`https://jsonplaceholder.typicode.com/users/${context.params.id}`);
const users=await res.json();

return{
    props:{
        users,
    },
}
}

// export async function getStaticPaths(){
//     const res=await fetch("https://jsonplaceholder.typicode.com/users");
//     const users=await res.json();
//     const paths=users.map(user=>({params:{id:user.is.toString()}}))
//     return{
//         paths:paths,
//         fallback:true,
//     }
// }
export default index;