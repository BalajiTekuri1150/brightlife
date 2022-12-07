import Router from "next/router";
import React, { useEffect } from "react";
import style from '../../styles/register.module.css';
import My_Profile_Child from "./My_Profile_Child";
import Image from 'next/image';
import logo from "../../public/kid.jpeg"
import { useState } from "react";
import { useRouter } from 'next/router';
import { setLocalData } from "../../utils/storage_service";
import { getLocalData } from "../../utils/storage_service";
import { postData2 } from "../../utils/data_manage_service";
import Sponser_list from "./sponser_list";
// import Validate from "./validate";
import { postformdata } from "../../utils/data_manage_service";
import profile from '../../public/profile.png';
const My_Profile=()=>
{
    const router = useRouter()
    // const{name,email,pass,role}=router.query;
    let reg_name=new RegExp('^.{4,20}$');
    let reg_phone=new RegExp('^[+]91');
    let reg_email=new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    const [info,setInfo]=useState([]);
    const [uname,setUname]=useState("");
    const name=getLocalData("name");
    const email=getLocalData("email");
    const id=getLocalData("id");
    const role=getLocalData("role");
    const [message,setMessage]=useState("")
    const [message1,setMessage1]=useState("")
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState({profile});
    const [count,setCount]=useState(0);

    //Error validation After click Save button only
    const [one,setOne]=useState(true);
    const [err1,setErr1]=useState(true);
    const [two,setTwo]=useState(true);
    const [err2,setErr2]=useState(true);
    const [three,setThree]=useState(true);
    const [err3,setErr3]=useState(true);
    const [four,setFour]=useState(true);
    const [err4,setErr4]=useState(true);
    const [five,setFive]=useState(true);
    const [err5,setErr5]=useState(true);
    const [six,setSix]=useState(true);
    const [err6,setErr6]=useState(true);
    const [seven,setSeven]=useState(true);
    const [err7,setErr7]=useState(true);
    const [eight,setEight]=useState(true);
    const [err8,setErr8]=useState(true);
    const [nine,setNine]=useState(true);
    const [err9,setErr9]=useState(true);
    const [ten,setTen]=useState(true);
    const [err10,setErr10]=useState(true);
    const [eleven,setEleven]=useState(true);
    const [err11,setErr11]=useState(true);
    const [data,setData]=useState({
        fname:{value:"",isVal:false},
        sname:{value:"",isVal:false},
        organization:{value:"",isVal:false},
        gmail:{value:"",isVal:false},
        mobile:{value:"",isVal:false},
        source:{value:"",isVal:false},
        address:{value:"",isVal:false},
        city:{value:"",isVal:false},
        state:{value:"",isVal:false},
        country:{value:"",isVal:false},
        pin:{value:"",isVal:false},
    }); 
    useEffect(()=>{
        const getprofile=async()=>{
            const res2=await fetch(`https://test-api.brightlife.org/brightlife/get/sponsor/profile?user_id=${id}`,{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getpofiledata=await res2.json();
            // console.log(getpofiledata);
            setInfo(getpofiledata.response?.sponsor);
            setData({
                fname:{value:getpofiledata.response?.sponsor?.user?.name},
                sname:{value:""},
                gmail:{value:getpofiledata.response?.sponsor?.user?.email},
                organization:{value:getpofiledata.response?.sponsor?.organization},
                mobile:{value:getpofiledata.response?.sponsor?.mobile},
                source:{value:getpofiledata.response?.sponsor?.source},
                address:{value:getpofiledata.response?.sponsor?.address},
                city:{value:getpofiledata.response?.sponsor?.city},
                state:{value:getpofiledata.response?.sponsor?.state},
                country:{value:getpofiledata.response?.sponsor?.country},
                pin:{value:getpofiledata.response?.sponsor?.postal_code},
            })
            // console.log(getpofiledata.response?.sponsor?.profile)
            setSelectedFile(getpofiledata.response?.sponsor?.profile);
            setUname(getpofiledata.response?.sponsor?.user?.name);
            setLocalData("sponser_id",getpofiledata.response?.sponsor?.id);
        }
        getprofile();
    },[]);
    // console.log(data.fname.value);
    // console.log(data.organization.value);

    //ReVerification Of Details
    if(typeof data.fname.value==='undefined'){
        data.fname.isVal=false;
    }
    else if(reg_name.test(data.fname.value)){
        data.fname.isVal=true;
    }
    else
        data.fname.isVal=false;
    //Second Name
    if(typeof data.sname.value==="undefined"){
        data.sname.isVal=false;
    }
    else if(reg_name.test(data.sname.value)){
        data.sname.isVal=true;
    }
    else
        data.sname.isVal=false;
    //Organisation
    if(typeof data.organization.value==="undefined"){
        data.organization.isVal=false;
    }
    else if(reg_name.test(data.organization.value)){
        data.organization.isVal=true;
    }
    else 
        data.organization.isVal=false;
    //address
    if(typeof data.address.value==='undefined'){
        data.address.isVal=false;
    }
    else if(reg_name.test(data.address.value)){
        data.address.isVal=true;
    }
    else    
        data.address.isVal=false;
    //city
    if(typeof(data.city.value)==='undefined'){
        data.city.isVal=false;
    }
    else if(reg_name.test(data.city.value)){
        data.city.isVal=true;
    }
    else    
        data.city.isVal=false;
    //How
    if(typeof data.source.value==='undefined'){
        data.source.isVal=false;
    }
    else if(reg_name.test(data.source.value)){
        data.source.isVal=true;
    }
    else    
        data.source.isVal=false;
    //State
    if(typeof data.state.value==='undefined'){
        data.state.isVal=false;
    }
    else if(reg_name.test(data.state.value)){
        data.state.isVal=true;
    }
    else    
        data.state.isVal=false;
    //country
    if(typeof data.country.value==='undefined'){
        data.country.isVal=false;
    }
    else if(reg_name.test(data.country.value)){
        data.country.isVal=true;
    }
    else    
        data.country.isVal=false;
    //Postal
    if(typeof data.pin.value==='undefined'){
        data.pin.isVal=false;
    }
    else if(reg_name.test(data.pin.value)){
        data.pin.isVal=true;
    }
    else    
        data.pin.isVal=false;
    //gmail
    if(typeof data.gmail.value==='undefined'){
        data.gmail.isVal=false;
    }
    else if(reg_email.test(data.gmail.value)){
        data.gmail.isVal=true;
    }
    else
        data.gmail.isVal=false;
    //Mobile
    if(typeof data.mobile.value==='undefined'){
        data.mobile.isVal=false;
    }
    else if(reg_phone.test(data.mobile.value)){
        data.mobile.isVal=true;
    }
    else
        data.mobile.isVal=false;
    const handleData=(name,value,isVal,error)=>
    {
        setData({
            ...data,
            [name]:{
                ...value.name,
                value:value,
                isVal:isVal,
            }
        })
        // console.log(error);
        if(name==="fname" && error==false)
        {
            setOne(false);
        }
        if(name=="fname" && error==true)
        {
            setOne(true);
            setErr1(true);
        }
        if(name==="sname" && error==false)
        {
            setTwo(false);
        }
        if(name=="sname" && error==true)
        {
            setTwo(true);
            setErr2(true);
        }
        if(name==="organization" && error==false)
        {
            setThree(false);
        }
        if(name=="organization" && error==true)
        {
            setThree(true);
            setErr3(true);
        }
        if(name==="gmail" && error==false)
        {
            setFour(false);
        }
        if(name=="gmail" && error==true)
        {
            setFour(true);
            setErr4(true);
        }
        if(name==="mobile" && error==false)
        {
            setFive(false);
        }
        if(name=="mobile" && error==true)
        {
            setFive(true);
            setErr5(true);
        }
        if(name==="source" && error==false)
        {
            setSix(false);
        }
        if(name=="source" && error==true)
        {
            setSix(true);
            setErr6(true);
        }
        if(name==="address" && error==false)
        {
            setSeven(false);
        }
        if(name=="address" && error==true)
        {
            setSeven(true);
            setErr7(true);
        }
        if(name==="city" && error==false)
        {
            setEight(false);
        }
        if(name=="city" && error==true)
        {
            setEight(true);
            setErr8(true);
        }
        if(name==="state" && error==false)
        {
            setNine(false);
        }
        if(name=="state" && error==true)
        {
            setNine(true);
            setErr9(true);
        }
        if(name==="country" && error==false)
        {
            setTen(false);
        }
        if(name=="country" && error==true)
        {
            setTen(true);
            setErr10(true);
        }
        if(name==="pin" && error==false)
        {
            setEleven(false);
        }
        if(name=="pin" && error==true)
        {
            setEleven(true);
            setErr11(true);
        }
        setMessage1("");
        setMessage("");
    }
    const arr=new Array(data.fname.isVal,data.sname.isVal,data.organization.isVal,data.gmail.isVal,data.mobile.isVal,data.source.isVal,data.address.isVal,data.city.isVal,data.state.isVal,data.country.isVal,data.pin.isVal);
    console.log(arr)
    const check=(item)=>
    {
        return item===true;
    }
    // const form_data = new FormData();
    const updateProfile=async()=>
    {
        if(arr.every(check))
        {
            const formData=new FormData();
            // console.log(info.id);
            formData.append('id',info.id);
            formData.append('user',JSON.stringify({
                'id':id,
                'name': name,
                'email':email,
                'role': role,
            }))
            formData.append('mobile',data.mobile.value)
            formData.append('organization', data.organization.value)
            formData.append('profile',selectedFile);
            formData.append('source',"Turito")
            formData.append('address',data.address.value)
            formData.append('city',data.city.value)
            formData.append('state',data.state.value)
            formData.append('country',data.country.value)
            formData.append('postal_code',data.pin.value)
            // const JSONdata=JSON.stringify(formData);
            fetch("https://test-api.brightlife.org/brightlife/update/sponsor/profile",{
                method:'POST',
                headers:{
                    'Authorization':'token 2d21e847092508ace5f534ac492bf03cd742145a',
                },
                body:formData,
            })
            .then((response)=>{
                console.log(response)
                response.json()
                .then((response)=>{
                    console.log(response.status);
                    if(response.status==true){
                        setMessage1("Details Updated Successfully")
                    }
                    else
                        setMessage("Mobile Already Exists");
                })
            })
            // const res=await(postformdata("https://test-api.brightlife.org/brightlife/update/sponsor/profile",formData));
            // if(res?.data?.status==true){
            //     setMessage1("Details Updated Successfully");
            // }
            // if(res?.data?.status==false){
            //     setMessage(res?.data?.error?.message?.mobile);
            // }
            // const datafinal={
            //     id:info.id,
            //     user: {
            //         id:id,
            //         name: name,
            //         email:email,
            //         role: role
            //     },
            //     mobile:data.mobile.value,
            //     organization: data.organization.value,
            //     source: "Turito",
            //     address:data.address.value,
            //     city: data.city.value,
            //     state: data.state.value,
            //     country:data.country.value,
            //     postal_code:data.pin.value
            // }
            // const result=await(postData2("https://test-api.brightlife.org/brightlife/update/sponsor/profile",datafinal))
            // if(result?.data?.status==true)
            // {
            //     setMessage1("Details Updated Successfully");
            // }
            // if(result?.data?.status==false)
            // {
            //     console.log(result?.data?.error?.message)
            //     setMessage(result?.data?.error?.message?.mobile);
            // }
        }
        else
        {
            // console.log(one);
            if(data.fname.value==="" || data.sname.value==="" || data.organization.value==="" || data.mobile.value==="" || data.source.value==="" || data.address.value==="" || data.city.value==="" || data.state.value==="" || data.country.value==="" || data.pin.value===""
            || typeof data.fname.value==="undefinded"|| typeof data.sname.value==="undefined" || typeof data.organization.value==="undefined" || typeof data.mobile.value==="undefined" || typeof data.source.value==="undefined" || typeof data.address.value==="undefined" || typeof data.city.value==="undefined" || typeof data.state.value==="undefined" || typeof data.country.value==="undefined" || typeof data.pin.value==="undefined" 
            )
            {
                setSelectedFile(null);
                setMessage("Some Blanks Are empty,Please enter the datails again and choose the image again")
                setMessage1("");
            }
            else{
                setErr1(one);
                setErr2(two);
                setErr3(three);
                setErr4(four);
                setErr5(five);
                setErr6(six);
                setErr7(seven);
                setErr8(eight);
                setErr9(nine);
                setErr10(ten);
                setErr11(eleven);
            }
        }
    }
    const sponserChild=()=>
    {
        setCount(1);
    }
    const profileClick=()=>
    {
        setCount(0);
    }
    const fileChange=async(e)=>{
        setSelectedFile(e.target.files[0]);
    }
    return(
        <div>
            <div>
        <header>
          <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between solid">
            <div className="custom-container border_bottom">
              <div>
                <a className="navbar-toggler" type="button" onclick="toggleSidebar()">
                  <i className="fa fa-bars" aria-hidden="true" />
                </a>
                <a className="navbar-brand" href="index.html">
                  <img className="logo" src="/img/logo.png" alt="Brightlife" />
                </a>
              </div>
              <div className=" navbar-collapse " id="mobilesidemenu">
                <ul className="navbar-nav mr-auto ">
                  <li className="nav-item ">
                    <a className="nav-link" href="ourteam.html"> Our Team</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="howitworks.html"> How it works </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="sponsor.html">
                      <button className="btn signin-button" type="submit">
                        <span className="Donate"> Donate </span>
                      </button>
                    </a>
                  </li>
                  <li className="nav-item user-image dropdown">
                    <a className="nav-link " href>
                      <img className="user-image-header" src="/img/user.png" />Andrew <i className="fa fa-angle-down" aria-hidden="true" />
                    </a>
                    <ul className="dropdown-nav">
                      <div onClick={profileClick} style={{color:'black'}}>
                        <li>
                          <img src="/img/user.svg" />My profile
                        </li>
                      </div>
                      <div onClick={sponserChild} style={{color:'black'}}>
                        <li>
                          <img src="/img/sponsored.svg" />Sponsored children
                        </li>
                      </div>
                      <a href="#">
                        <li>
                          <img src="/img/signout.svg" />Sign out
                        </li>
                      </a>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div id="sidebaroverlay-id" onclick="outsideclick()" />     
        <div className="profile-content page_start_warpper">
          <div className="row nomar">
            <div className="col-lg-2 col-sm-12">
              <div className="left-profilemenu-block">
                <div className="left-profilemenu-block">
                  <div className="left-profileimage">
                    { !selectedFile && (
                    <img src="/img/childsays.png" alt="My Profile Icon" className="left-pro-icon" />
                    // <div className="image-upload">
                    //   <label htmlFor="file-input">
                    //     <img src="/img/camera.png" />
                    //   </label>
                    // </div>
                   )}
                      {selectedFile && (
                          <div>
                          <img alt="not fount" src={URL.createObjectURL(selectedFile)} className="left-pro-icon"/>
                          <br />
                          {/* <button onClick={()=>setSelectedFile(null)} style={{marginLeft:'50px',marginTop:'10px'}}>Remove</button> */}
                          </div>
                      )}
                      <input id="file-input" type="file" onChange={fileChange}/>
                    {/* </div> */}
                    <p>{data?.fname?.value}</p>
                  </div>
                  <div className="myaccount">
                    <ul>
                      <li><div onClick={profileClick}>MY PROFILE</div></li>
                      <li><div className="active" onClick={sponserChild}>SPONSORED CHILDREN</div></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-10 col-sm-12">
              <div className="myaccount-right-block">
                <h4 className="sponsor-headding">My Profile</h4>
                <div className="myaccount-content-block">
                  <div className="myaccount-content-inner">   
                    {count==0 &&
                        <form> 
                        <div className="row sponsor-block bg-white">
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>First Name</label>
                                <My_Profile_Child type="text"
                                                name="fname"
                                                placeholder="enter first name"
                                                value={data.fname.value}
                                                reg={reg_name}
                                                handleChange={handleData}
                                />
                                {err1 ? <div></div> : <div style={{color:'red'}}>First name should contain minimum 4 characters</div>}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Last Name</label>
                                {/* <input type="text" className="form-control" />             */}
                                <My_Profile_Child type="text"
                                                    name="sname"
                                                     value={data.sname.value}
                                                     reg={reg_name}
                                                     handleChange={handleData}
                                 />
                                 {err2 ? <div></div> : <div style={{color:'red'}}>Second name should contain minimum 4 characters</div>}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Organisation</label>
                                {/* <input type="text" className="form-control" />             */}
                                <My_Profile_Child type="text"
                                                name="organization"
                                                value={data.organization.value}
                                                reg={reg_name}
                                                handleChange={handleData}
                                />
                                {err3 ? <div></div> : <div style={{color:'red'}}>Organization should contain minimum 4 characters</div>}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Email Address</label>
                                {/* <input type="text" className="form-control" />             */}
                                <My_Profile_Child type="text"
                                                name="gmail"
                                                value={data.gmail.value}
                                                reg={reg_email}
                                                handleChange={handleData}
                                />
                                {err4 ? <div></div> : <div style={{color:'red'}}>gmail should be like ***@gmail.com</div>}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Mobile number</label>
                                {/* <input type="text" className="form-control" />             */}
                                <My_Profile_Child type="text"
                                                     name="mobile"
                                                     value={data.mobile.value}
                                                     reg={reg_phone}
                                                     handleChange={handleData}
                                 />
                                 {err5 ? <div></div> : <div style={{color:'red'}}>Mobile Number should start with +91 and contain 10 numbers only</div>}
                                
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>How did you hear about brightlife</label>
                                {/* <input type="text" className="form-control" />             */}
                                <My_Profile_Child type="text"
                                                     name="source"
                                                     value={data.source.value}
                                                     reg={reg_name}
                                                     handleChange={handleData}
                                 />
                                 {err6 ? <div></div> : <div style={{color:'red'}}>Source should contain minimum 4 characters</div>}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Address</label>
                                {/* <input type="text" className="form-control" />             */}
                                <My_Profile_Child type="text"
                                                     name="address"
                                                     value={data.address.value}
                                                     reg={reg_name}
                                                     handleChange={handleData}
                                 />
                                 {err7 ? <div></div> : <div style={{color:'red'}}>Address should contain minimum 4 characters</div>}
                                
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>City</label>
                                {/* <input type="text" className="form-control" />             */}
                                <My_Profile_Child type="text"
                                                    name="city"
                                                     value={data.city.value}
                                                     reg={reg_name}
                                                     handleChange={handleData}
                                 />
                                 {err8 ? <div></div> : <div style={{color:'red'}}>City should contain minimum 4 characters</div>}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>State</label>
                                {/* <input type="text" className="form-control" />             */}
                                <My_Profile_Child type="text"
                                                     name="state"
                                                     value={data.state.value}
                                                     reg={reg_name}
                                                     handleChange={handleData}
                                 />
                                 {err9 ? <div></div> : <div style={{color:'red'}}>State should contain minimum 4 characters</div>}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Country</label>
                                {/* <input type="text" className="form-control" />             */}
                                <My_Profile_Child type="text"
                                                     name="country"
                                                     value={data.country.value}
                                                     reg={reg_name}
                                                     handleChange={handleData}
                                 />
                                 {err10 ? <div></div> : <div style={{color:'red'}}>Country should contain minimum 4 characters</div>}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Postal Code</label>
                                {/* <input type="text" className="form-control" />             */}
                                <My_Profile_Child type="text"
                                                     name="pin"
                                                     value={data.pin.value}
                                                     reg={reg_name}
                                                     handleChange={handleData}
                                 />
                                 {err11 ? <div></div> : <div style={{color:'red'}}>Pin should contain minimum 4 characters</div>}
                            </div>
                            </div>
                            <div style={{color:'red',marginLeft:'150px'}}>{message}</div><br/>
                            <div style={{color:'green',marginLeft:'150px'}}>{message1}</div><br/>
                            <div className="col-lg-12">
                                <div className="sponsor-save-btn" onClick={updateProfile}>Save</div>
                            </div>
                        </div>
                        </form>
                    }
                    {count==1 && 
                        <Sponser_list/>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer id="footer">
          <div className="footer-top">
            <div className="custom-container">
              <div className="row">
                <div className="col-lg-3 col-md-6 footer-contact">
                  <a href="/"><img className="logo" src="/img/logo.png" alt="Brightlife" /></a>
                  <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>
                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>OUR SERVICES</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Services</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Terms of service</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Privacy policy</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>QUICK LINKS</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Web Design</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Web Development</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Product Management</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Marketing</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Graphic Design</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>GET IN TOUCH</h4>
                  <div>Lorem ipsum
                    Lorem ipsum Lorem ipsum 19801</div>            
                  <div>Email: Lorem ipsum@gmail.com</div>
                  <div>Phone: +00 000 000 1234</div>
                  <div className="social-links mt-3">
                    <a href="#" className>
                      <i className="fa fa-skype" aria-hidden="true" />
                    </a>
                    <a href="#" className>
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                    <a href="#" className>
                      <i className="fa fa-whatsapp" aria-hidden="true" />
                    </a>
                    <a href="#" className>
                      <i className="fa fa-vimeo" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="custom-container footer-bottom clearfix">
            <div className="copyright">© 2019  
              brightlife.com
            </div>
            <div className="credits"> <a href>FAQ’s</a> <a href>Deposit</a>
            </div>
          </div>
        </footer>
      </div>
        </div>
        // <div>
        //     <div className="container">
        //         <div className="row bg-black">
        //             <div className="col-sm text-light"></div>
        //             <div className="col-md-auto text-light">how it works</div>
        //             <div className="col-md-auto text-light">donate</div>
        //             <button className="col-md-auto btn btn-secondary">My Profile</button>
        //         </div>
        //     </div>
        //     <div style={{display:'flex'}}>
        //         <div className={style.side}>
        //             <div className={style.card}>
        //                 <div style={{width:'30px'}}>
        //                     <input type="file" onChange={fileChange}/>
        //                     {selectedFile && (
        //                         <div>
        //                         <img alt="not fount" src={URL.createObjectURL(selectedFile)} width="100px" height="70px" style={{borderRadius:'100px',marginLeft:'30px'}}/>
        //                         <br />
        //                         <button onClick={()=>setSelectedFile(null)} style={{marginLeft:'50px',marginTop:'10px'}}>Remove</button>
        //                         </div>
        //                     )}
        //                     {selectedImage && 
        //                         <img src={selectedImage}></img>
        //                     }
        //                     <br /> 
        //                 </div>
        //             </div><br/><br/> 
        //         <div style={{marginLeft:'120px',color:'blue'}}>
        //             <button className="btn btn-light" onClick={profileClick}>My Profile</button>
        //         </div><br/><br/>
        //             <div style={{marginLeft:'110px',color:'blue'}}>
        //                     <button className="btn btn-lg btn-light" onClick={sponserChild}>Sponsered Child</button>
        //             </div>
        //         </div>
        //         {count==0 &&
        //         <div style={{marginTop:"70px",width:'1000px',height:'100%',backgroundColor:'white',borderRadius:'10px',boxShadow:'0 8px 6px 3px rgba(0,0,0,0.5)',transition:'3s'}}>
        //             <form style={{border:'2px solid gray',marginTop:'20px',marginLeft:'20px',marginRight:'20px',height:'100%'}}>
        //                 <br/>
        //                 <div className="form-group row">
        //                     <div className="col-sm-5" style={{marginLeft:'30px',marginRight:'30px'}}>
        //                         <label>First Name</label><br/>
        //                         <My_Profile_Child type="text"
        //                                             name="fname"
        //                                             placeholder="enter first name"
        //                                             value={data.fname.value}
        //                                             reg={reg_name}
        //                                             handleChange={handleData}
        //                         />
        //                         {err1 ? <div></div> : <div style={{color:'red'}}>First name should contain minimum 4 characters</div>}
        //                     </div>
        //                     <div className="col-sm-5">
        //                         <label>Second Name</label><br/>
        //                         <My_Profile_Child type="text"
        //                                             name="sname"
        //                                             value={data.sname.value}
        //                                             reg={reg_name}
        //                                             handleChange={handleData}
        //                         />
        //                         {err2 ? <div></div> : <div style={{color:'red'}}>Second name should contain minimum 4 characters</div>}
        //                     </div>
        //                 </div><br/>
        //                 <div className="form-group row">
        //                     <div className="col-sm-5" style={{marginLeft:'30px',marginRight:'30px'}}>
        //                         <label>Organization</label><br/>
        //                         <My_Profile_Child type="text"
        //                                             name="organization"
        //                                             value={data.organization.value}
        //                                             reg={reg_name}
        //                                             handleChange={handleData}
        //                         />
        //                         {err3 ? <div></div> : <div style={{color:'red'}}>Organization should contain minimum 4 characters</div>}
        //                     </div>
        //                     <div className="col-sm-5">
        //                         <label>Email Address</label><br/>
        //                         <My_Profile_Child type="text"
        //                                             name="gmail"
        //                                             value={data.gmail.value}
        //                                             reg={reg_email}
        //                                             handleChange={handleData}
        //                         />
        //                         {err4 ? <div></div> : <div style={{color:'red'}}>gmail should be like ***@gmail.com</div>}
        //                     </div>
        //                 </div><br/>
        //                 <div className="form-group row">
        //                     <div className="col-sm-5" style={{marginLeft:'30px',marginRight:'30px'}}>
        //                         <label>Mobile Number</label><br/>
        //                         <My_Profile_Child type="text"
        //                                             name="mobile"
        //                                             value={data.mobile.value}
        //                                             reg={reg_phone}
        //                                             handleChange={handleData}
        //                         />
        //                         {err5 ? <div></div> : <div style={{color:'red'}}>Mobile Number should start with +91 and contain 10 numbers only</div>}
        //                     </div>
        //                     <div className="col-sm-5">
        //                         <label>How did you head about Us?</label><br/>
        //                         <My_Profile_Child type="text"
        //                                             name="source"
        //                                             value={data.source.value}
        //                                             reg={reg_name}
        //                                             handleChange={handleData}
        //                         />
        //                         {err6 ? <div></div> : <div style={{color:'red'}}>Source should contain minimum 4 characters</div>}
        //                     </div>
        //                 </div><br/>
        //                 <div className="form-group row">
        //                     <div className="col-sm-5" style={{marginLeft:'30px',marginRight:'30px'}}>
        //                         <label>Address</label><br/>
        //                         <My_Profile_Child type="text"
        //                                             name="address"
        //                                             value={data.address.value}
        //                                             reg={reg_name}
        //                                             handleChange={handleData}
        //                         />
        //                         {err7 ? <div></div> : <div style={{color:'red'}}>Address should contain minimum 4 characters</div>}
        //                     </div>
        //                     <div className="col-sm-5">
        //                         <label>city</label><br/>
        //                         <My_Profile_Child type="text"
        //                                             name="city"
        //                                             value={data.city.value}
        //                                             reg={reg_name}
        //                                             handleChange={handleData}
        //                         />
        //                         {err8 ? <div></div> : <div style={{color:'red'}}>City should contain minimum 4 characters</div>}
        //                     </div>
        //                 </div><br/>
        //                 <div className="form-group row">
        //                     <div className="col-sm-5" style={{marginLeft:'30px',marginRight:'30px'}}>
        //                         <label>state</label><br/>
        //                         <My_Profile_Child type="text"
        //                                             name="state"
        //                                             value={data.state.value}
        //                                             reg={reg_name}
        //                                             handleChange={handleData}
        //                         />
        //                         {err9 ? <div></div> : <div style={{color:'red'}}>State should contain minimum 4 characters</div>}
        //                     </div>
        //                     <div className="col-sm-5">
        //                         <label>Country</label><br/>
        //                         <My_Profile_Child type="text"
        //                                             name="country"
        //                                             value={data.country.value}
        //                                             reg={reg_name}
        //                                             handleChange={handleData}
        //                         />
        //                         {err10 ? <div></div> : <div style={{color:'red'}}>Country should contain minimum 4 characters</div>}
        //                     </div>
        //                 </div><br/>
        //                 <div className="form-group row">
        //                     <div className="col-sm-5" style={{marginLeft:'30px',marginRight:'30px'}}>
        //                         <label>Postal Code</label><br/>
        //                         <My_Profile_Child type="text"
        //                                             name="pin"
        //                                             value={data.pin.value}
        //                                             reg={reg_name}
        //                                             handleChange={handleData}
        //                         />
        //                         {err11 ? <div></div> : <div style={{color:'red'}}>Pin should contain minimum 4 characters</div>}
        //                     </div>
        //                 </div><br/>
        //                 <div style={{color:'red',marginLeft:'150px'}}>{message}</div><br/>
        //                 <div style={{color:'green',marginLeft:'150px'}}>{message1}</div><br/>
        //                 <div className="form-group row">
                            
        //                     <div className="col-sm-11" style={{marginLeft:'30px',marginRight:'30px'}}>
        //                         <input type="button" className="form-control btn btn-primary" value="save" onClick={updateProfile}/>
        //                     </div>
        //                 </div><br/>
        //             </form>
        //         </div>
        //     }
        //     {count==1 && 
        //         <Sponser_list/>
        //     }
        // </div>
        // </div>
    )
}

export default My_Profile;