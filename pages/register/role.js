import style from '../../styles/register.module.css';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import getData from '../../utils/data_manage_service';
import { setLocalData } from '../../utils/storage_service';
import { postData1 } from '../../utils/data_manage_service';
const Role=()=>
{
    const router = useRouter()
    const{name,gmail,pass}=router.query;
    const [role,setRole]=useState("");
    const [post,setPost]=useState([])
    const [message,setMessage]=useState("");
    const [disable,setDisable]=useState(true);
    useEffect(()=>{
        const getRole=async()=>{
            const res=await fetch("https://test-api.brightlife.org/brightlife/list/roles",{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getcon=await res.json();
            console.log(getcon);
            console.log(getcon.response.data);
            setPost(getcon.response.data);
        }
        getRole();
    },[]);
    const handleRadio=(e)=>
    {
        setDisable(false);
        setRole(e.target.value);
    }
    const handleSubmit=async(e)=>
    {
        e.preventDefault();
        if(role==" ")
        {
            alert("You should select one role");
        }
        else
        {
            setDisable(true);
            const data={
                email:gmail,
                context:"signup"
            }
            const result=await(postData1("https://test-api.brightlife.org/brightlife/v2/get/otp",data));
            if(result?.data?.status==true)
            {
                setLocalData("reference_id",result?.data?.response?.referrence_id)
                Router.push({
                    pathname: '/register/otp',
                    query: {name:name,email:gmail,pass:pass,role:role},
                });
            }
            else{
                setMessage(result?.message);
            }
            // const JSONdata=JSON.stringify(data);
            // fetch("https://test-api.brightlife.org/brightlife/v2/get/otp",{
            //     method:'POST',
            //     headers:{
            //         'Content-Type':'application/json',
            //     },
            //     body:JSONdata,
            // })
            // .then((response)=>{
            //         response.json()
            //         .then((response)=>{
            //             console.log(response.status)
            //             if(response.status==true){
            //                 setLocalData("reference_id",response?.response?.referrence_id)
            //                 Router.push({
            //                     pathname: '/register/otp',
            //                     query: {name:name,email:gmail,pass:pass,role:role},
            //                 });
            //             }
            //             else{
            //                 alert("Gmail Registered Already");
            //             }
            //         })
            // })
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
                    <div className={style.inputbox}><input type="radio" value={post[2]?.role} name="role" onChange={handleRadio} checked={role===post[2]?.role}/><label style={{marginLeft:'20px'}}>Guardian,Volunteer applying for scholarship</label></div>
                </div>
                <div>
                    <div className={style.inputbox}><input type="radio" value={post[3]?.role} name="role" onChange={handleRadio} checked={role===post[3]?.role}/><label style={{marginLeft:'20px'}}>Kid Applying For Scholarship</label></div>
                </div>
                <div style={{color:'red'}}>{message}</div>
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
export default Role;