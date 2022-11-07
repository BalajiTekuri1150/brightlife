import Link from 'next/link';
import style from '../styles/register.module.css';
import {AiOutlineMail,FaUserTie} from "react-icons/ai";
import { BsPersonFill,BsFileLock,BsGoogle,BsFacebook} from "react-icons/bs";
import {useState} from "react";
import Register_child from './Register_child';
import Router from 'next/router';
const Register_Page=()=>
{
    let reg_name=new RegExp('^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$');
    let reg_email=new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    let reg_pass=new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    const [data,setData]=useState({
        user:{value:"",isValid:false},
        pass:{value:"",isValid:false},
        gmail:{value:"",isValid:false},
    });
    // const [finalerr,setFinalerr]=useState(false);
    const [one,setOne]=useState(true);
    const [err1,setErr1]=useState(true);
    const [two,setTwo]=useState(true);
    const [err2,setErr2]=useState(true);
    const [three,setThree]=useState(true);
    const [err3,setErr3]=useState(true);
    const [disable,setDisable]=useState(true);
    const handleData=(name,value,isval,error)=>
    {
        // console.log(error);
        setData({
            ...data,
            [name]:{
                ...value.name,
                value:value,
                isValid:isval,
            },
        });
        setErr1(true);
        setErr2(true);
        setErr3(true);
        setDisable(false);
        if(name==="user" && error==false){
           setOne(false);
        }
        if(name==="user" && error==true){
            setOne(true);
        }
        if(name==="gmail" && error==false){
            setTwo(false);
         }
        if(name==="gmail" && error==true){
            setTwo(true);
        }
        if(name==="pass" && error==false){
            setThree(false)  
        }
        if(name==="pass" && error==true){
            setThree(true);
        }
        // if(name==="gmail" && error==false)
        // {
        //     console.log("Invalid gmail");
        //     setUserErr("Invalid gmail");
        // }
    }

    const arr=new Array(data.user.isValid,data.pass.isValid,data.gmail.isValid);
    const check=(item)=>
    {
        return item===true;
    }
    const handleSubmit=(e)=>
    {
        e.preventDefault(); 
        if(arr.every(check))
        { 
            Router.push({
                pathname: '/register/role',
                query: {name:data.user.value,gmail:data.gmail.value,pass:data.pass.value},
            })

        }
        else
        {
            console.log(one);
            setErr1(one);
            setErr2(two);
            setErr3(three);
        }
    }
    return(
        <div>
            <br/><h1 style={{color:'white',marginLeft:'600px',marginTop:'10px',fontSize:'20px'}}>BRIGHT LIFE</h1>
            <div className={style.register}>
                <label style={{marginLeft:'150px',fontSize:'20px'}}>Sign Up</label>
                <label style={{marginLeft:'80px',fontSize:'15px',color:'gray'}}>To Become A Bright Life Member</label>
                <form>
                    <div className="form-group">
                        <BsPersonFill/>
                        <label>Name</label>
                        <Register_child 
                                type="text" 
                                name="user"
                                placeholder='enter name' 
                                value={data.user.value} 
                                reg={reg_name}
                                handleChange={handleData}
                        />
                    </div>
                    <div style={{color:'red',fontSize:'13px'}}>{err1 ? <div></div>:<div>Username should contain minimum 8 characters</div>}</div>
                    <div className="form-group">
                        <AiOutlineMail/>
                        <label>E-mail</label>
                        <Register_child 
                                type="email" 
                                value={data.gmail.value}
                                name="gmail"
                                reg={reg_email}
                                handleChange={handleData}
                                placeholder='enter email'
                        />
                    </div>
                    <div style={{color:'red',fontSize:'13px'}}>{err2 ? <div></div>:<div>Gmail should be like ****@gmail.com</div>}</div>
                    <div className="form-group">
                        <BsFileLock/>
                        <label>Password</label>
                        <Register_child
                                type="password"
                                name="pass"
                                value={data.pass.value}
                                reg={reg_pass}
                                handleChange={handleData}
                                placeholder='enter password'/>
                    </div>
                    <div style={{color:'red',fontSize:'13px'}}>{err3 ? <div></div>:<div>Password must be 8 characters with one Special character,One Capital letter and one Number</div>}</div>
                    <button className='btn-success' 
                            style={{marginLeft:'110px',width:'180px',height:'40px',borderRadius:'5px',backgroundColor:'lightseagreen '}}
                            onClick={handleSubmit}
                            disabled={disable}>
                            CreateAccount
                    </button><br/>
                    <p className={style.condition}>By Click on the continue you are agree to the <b style={{color:'lightseagreen '}}>terms&conditions</b></p>
                    <label style={{marginLeft:'110px',color:'gray'}}>----------------OR-----------------</label>
                    <div>
                        <button className='btn-success' 
                                style={{marginRight:'10px',
                                marginLeft:'20px',backgroundColor:'#4267B2',borderRadius:'3px',height:'40px',width:'180px'}}>
                                <BsFacebook/>
                                &nbsp;Sign UP Facebook
                        </button>
                        <button className='btn-success' 
                                style={{height:'40px',width:'180px',borderRadius:'3px',backgroundColor:'DodgerBlue'}}>
                                <BsGoogle/> 
                                &nbsp;Sign Up with Google
                        </button>
                    </div><p></p>
                    <label className={style.footertext}>Already a member?<b style={{color:'lightseagreen '}}><Link href="login/logins">Sign in</Link></b></label>
                </form>
            </div>
        </div>
    )
}
    
export default Register_Page;