import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import style from '../styles/register.module.css';
import {AiOutlineMail,FaUserTie} from "react-icons/ai";
import { BsPersonFill,BsFileLock,BsGoogle,BsFacebook} from "react-icons/bs";
import logo from '../assets/images/logo.jpeg';
import {useState} from "react";
import Register_child from './Register_child';
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";

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
    const [passwordType, setPasswordType] = useState("password");
    const handleData=(name,value,error)=>
    {
        setData({
            ...data,
            [name]:{
                ...value.name,
                value:value,
                isValid:error,
            },
        });
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
            <Link href="#"></Link>
        }
        else
        {
            alert("Enter Correct Details");
            <Link href="/"></Link>
        }
    }
    // const togglePassword =()=>{
    //     if(passwordType==="password")
    //     {
    //      setPasswordType("text")
    //      return;
    //     }
    //     setPasswordType("password")
    //   }
    return(
        <div>
            {/* <Image src={logo} width="100px" height="40px" className={style.image1}/> */}
            <h1 style={{color:'purple',marginLeft:'600px',fontSize:'20px'}}>BRIGHT LIFE</h1>
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
                                {/* <span className="btn btn-outline-primary" onClick={togglePassword}>
                                { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> }
                                </span> */}
                    </div>
                    <button className='btn-success' 
                            style={{marginLeft:'110px',width:'180px',height:'40px',borderRadius:'5px',backgroundColor:'lightseagreen '}}
                            onClick={handleSubmit}>
                            CreateAccount
                    </button><br/>
                    <p className={style.condition}>By Click on the continue you are agree to the <b style={{color:'lightseagreen '}}>terms&conditions</b></p>
                    <label style={{marginLeft:'180px',color:'gray'}}>OR</label>
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
                    <label className={style.footertext}>Already a member?<b style={{color:'lightseagreen '}}><Link href="#">Sign in</Link></b></label>
                </form>
            </div>
            <div>

            </div>
        </div>
    )
}
export default Register_Page;