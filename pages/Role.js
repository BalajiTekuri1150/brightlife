
import style from '../styles/register.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//import Otp from './Otp';
import Router from 'next/router';
const Role=()=>
{
    const router = useRouter()
    const{name,gmail,pass}=router.query;
    const [role,setRole]=useState(" ");
    const [disable,setDisable]=useState(true);
    const [post,setPosts]=useState([]);
    const handleRadio=(e)=>
    {
        setDisable(false);
        setRole(e.target.value);
    }
    
    useEffect(()=>{
        const getDetails=async()=>{
            const res1=await fetch("https://test-api.brightlife.org/brightlife/list/roles",{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getdet=await res1.json();
            console.log(getdet);
            console.log(getdet.response.data);
            setPosts(getdet.response.data);
            console.log(post[3]);
        }
        getDetails();
    },[]);

    const handleSubmit=(e)=>
    {
        e.preventDefault();
        setDisable(true);
        if(role==" ")
        {
            alert("You should select one role");
        }
        else
        {
            const data={
                email:gmail,
                context:"signup"
            }
            const JSONdata=JSON.stringify(data);
            fetch("https://test-api.brightlife.org/brightlife/v2/get/otp",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSONdata,
            })
            .then((response)=>{
                    response.json()
                    .then((response)=>{
                        console.log(response.status)
                        if(response.status==true){
                            Router.push({
                                pathname: '/Otp',
                                query: {name:name,email:gmail,pass:pass,role:role},
                            });
                        }
                        else{
                            alert(response.error.message);
                        }
                    })
            })
        }
    }
    return(
        <div>
            <form className={style.forming}>
                <br/><br/><h2 style={{marginLeft:'50px'}}>Select Category you belong to</h2> 
                <label style={{marginLeft:'60px',fontSize:'15px',color:'gray'}}>Please note that it is one time selection,you will</label><br/>
                <label style={{marginLeft:'90px',fontSize:'15px',color:'gray'}}>be able to change your category later</label><br/><br/>
                <div className="form-group">                    
                    <div className={style.inputbox}><input type="radio" value={post[1]?.role} name="role" onChange={handleRadio} checked={role===post[1]?.role}/><label style={{marginLeft:'20px'}}>Sponser</label></div>
                </div>
                <div>
                    <div className={style.inputbox}><input type="radio" value={post[2]?.role} name="role" onChange={handleRadio} checked={role==='guardian'}/><label style={{marginLeft:'20px'}}>Guardian,Volunteer applying for scholarship</label></div>
                </div>
                <div>
                    <div className={style.inputbox}><input type="radio" value={post[3]?.role} name="role" onChange={handleRadio} checked={role==='child'}/><label style={{marginLeft:'20px'}}>Kid Applying For Scholarship</label></div>
                </div>
                <button className='btn-success' 
                            style={{marginLeft:'140px',
                            width:'180px',
                            height:'40px',
                            borderRadius:'5px',
                            backgroundColor:'lightseagreen '}}
                            onClick={handleSubmit}
                            disabled={disable}
                            >
                            continue
                </button><br/><br/>
            </form>
        </div>
    );
}


// export async function getStaticProps(){
//     const res=await fetch("https://test-api.brightlife.org/brightlife/signup");
//     const users=await res.json();
//     return{
//       props:{
//         users,
//       },
//     }
//   }
  


// if(response.status==true)
// {
//     Router.push({
//         pathname: '/GetOtp',
//         query: {name:name,gmail:gmail,pass:pass,role:role},
//     });
// }
// else
// {
//     console.log("gmail Already Registered");
// }
export default Role;