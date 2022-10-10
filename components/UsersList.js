import React from 'react';
import homestyle from '../styles/Home.module.css';

const UsersList=({users})=>
{
    return(
        <main className={homestyle.main}>
            <div className={homestyle.grid}>
               {users.map((user)=>(
                    <div className={homestyle.card}>
                        <p>{user.id}</p>
                        <p>{user.name}</p>
                        <a href={`/user/${user.id}`}>Know More...</a>
                    </div>
                ))}
               
            </div>
        </main>
    )
}
export default UsersList