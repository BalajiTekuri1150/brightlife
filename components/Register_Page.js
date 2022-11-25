import Link from 'next/link';
import style from '../styles/register.module.css';
import {AiOutlineMail,FaUserTie} from "react-icons/ai";
import { BsPersonFill,BsFileLock,BsGoogle,BsFacebook} from "react-icons/bs";
import {useState} from "react";
import Register_child from './Register_child';
import Router from 'next/router';
import { setLocalData } from '../utils/storage_service';
import Head from 'next/head';
import Script from 'next/script';
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
    const [message,setMessage]=useState("");
    // const [disable,setDisable]=useState(true);
    const handleData=(name,value,isval,error)=>
    {
        setData({
            ...data,
            [name]:{
                ...value.name,
                value:value,
                isValid:isval,
            },
        });
        setMessage("");
        // setDisable(false);
        // setErr1(true);
        // setErr2(true);
        // setErr3(true);
        if(name==="user" && error==false){
           setOne(false);
           setErr2(true);
           setErr3(true);
        }
        if(name==="user" && error==true){
            setOne(true);
            setErr1(true);
        }
        if(name==="gmail" && error==false){
            setTwo(false);
            setErr1(true);
            setErr3(true);
         }
        if(name==="gmail" && error==true){
            setTwo(true);
            setErr2(true);
        }
        if(name==="pass" && error==false){
            setThree(false) 
            setErr2(true);
           setErr1(true); 
        }
        if(name==="pass" && error==true){
            setThree(true);
            setErr3(true);
        }
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
            setLocalData("pass",data.pass.value);
            Router.push({
                pathname: '/register/role',
                query: {name:data.user.value,gmail:data.gmail.value,pass:data.pass.value},
            })

        }
        else
        {
            if(data.user.value=="" || data.gmail.value=="" || data.pass.value=="")
            {
                setMessage("Some fields are empty")
            }
            else{
                console.log(one);
                setErr1(one);
                setErr2(two);
                setErr3(three);
            }
        }
    }
    return(
        <>
        <Head>
            <title>Brightlife</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
        </Head>
        <div className="sign-bg">
            <img src="img/signin-bg.jpg" alt="" className="bg" />
            </div>
                <div className="sign-container">
                <a href="index.html"> <div className="sign-logo"> <img src="img/logo.png" alt="Bright Life" /></div></a>
                <div className="sign-in-block">
                <h3>Sign Up</h3>
                <p>To become a Bright life member</p>
                <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1"><img src="img/user-icon.svg" className="lab-icon" />Name</label>
                    <Register_child 
                            type="text" 
                            name="user"
                            placeholder='Enter name' 
                            value={data.user.value} 
                            reg={reg_name}
                            handleChange={handleData}
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp"
                    />
                    <div style={{color:'red',fontSize:'13px'}}>{err1 ? <div></div>:<div>Username should contain minimum 8 characters</div>}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1"><img src="img/email-icon.svg" className="lab-icon" />Email</label>
                    <Register_child 
                            type="email" 
                            value={data.gmail.value}
                            name="gmail"
                            reg={reg_email}
                            handleChange={handleData}
                            placeholder='Enter email'
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp"
                    />
                    <div style={{color:'red',fontSize:'13px'}}>{err2 ? <div></div>:<div>Gmail should be like ****@gmail.com</div>}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1"><img src="img/pass-lock-icon.svg" className="lab-icon" />Password</label>
                    {/* <input type="password" className="form-control" id="exampleInputPassword1" placeholder="enter your password" /> */}
                    <Register_child
                            type="password"
                            name="pass"
                            value={data.pass.value}
                            reg={reg_pass}
                            handleChange={handleData}
                            placeholder='Enter password'
                            id="exampleInputPassword1"
                    />
                </div>
                {/* <p><button type="submit" className="btn sign-btn">Create account</button></p> */}
                <div style={{color:'red',fontSize:'13px'}}>{err3 ? <div></div>:<div>Password must be 8 characters with one Special character,One Capital letter and one Number</div>}</div>
                <div style={{color:'red',fontSize:'13px'}}>{message}</div>
                <p><button className='btn sign-btn btn-success' 
                                onClick={handleSubmit}
                                // disabled={disable}
                                >
                                CreateAccount
                        </button><br/></p>
                <p>By click on the continue you are agree to the  <a href="#">Terms &amp; Conditions</a></p>
                {/* <div class="serperator-or"><span>OR</span></div>
                <div class="btn-block"><span class="fb_btn"><img src="img/fb-icon.svg" alt="fb"> <span class="btn-txt">In with Facebook</span></span><span class="g_btn"><img src="img/google-icon.jpg" alt="fb"><span class="btn-txt">Sign In with Google</span></span></div> */}
                <p>Already a member? <Link href="login/logins">Sign In</Link></p>
                </form>
            </div>
        </div>

        <Script src="js/jquery.slim.min.js"></Script>
        <Script src="js/bootstrap.bundle.min.js"></Script>
        <Script src="js/popper.min.js"></Script>
        <Script src="js/custom.js"></Script>
            {/* <br/><h1 style={{color:'white',marginLeft:'600px',marginTop:'10px',fontSize:'20px'}}>BRIGHT LIFE</h1>
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
                    <div style={{color:'red',fontSize:'13px'}}>{message}</div>
                    <button className='btn-success' 
                            style={{marginLeft:'110px',width:'180px',height:'40px',borderRadius:'5px',backgroundColor:'lightseagreen '}}
                            onClick={handleSubmit}
                            // disabled={disable}
                            >
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
            </div> */}
        </>
    )
}
    
export default Register_Page;