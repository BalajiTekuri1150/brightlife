
import UsersList from "../components/UsersList";

const About=({users})=>
{
    // console.log(users);
    return(
        <div>
            <h1>About The Page</h1>
            <UsersList users={users}/>
        </div>
    );
}


export async function getStaticProps(){
    const res=await fetch("https://jsonplaceholder.typicode.com/users");
    const users=await res.json();
    return{
      props:{
        users,
      },
    }
}
export default About;
