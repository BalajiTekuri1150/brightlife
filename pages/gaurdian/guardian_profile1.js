import React from "react";
import My_Profile_Child from "../sponser/My_Profile_Child";
import Router from "next/router";
import  { useEffect } from "react";
// import My_Profile_Child from "./My_Profile_Child";
import { useState } from "react";
import { useRouter } from 'next/router';
import { setLocalData } from "../../utils/storage_service";
import { getLocalData } from "../../utils/storage_service";
// import Sponser_list from "./sponser_list";
// import Sponsor_child_details from "./sponsor_child_details";
import profile from '../../public/profile.png';
import Script from "next/script";
import Link from 'next/link';
import { useContext } from 'react';
import { store } from '../_app';
const Gaurdian_Profile1=(props)=>{
    const {datas,setDatas}=useContext(store)
    const router = useRouter()
    let reg_name=new RegExp('^.{4,20}$');
    let reg_phone=new RegExp('^[+]91');
    let reg_email=new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    const name=getLocalData("name");
    const email=getLocalData("email");
    const user_id=getLocalData("user_id")
    // const gua_id=getLocalData("guardian_id");
    const role=getLocalData("role");
    const [message,setMessage]=useState("")
    const [message1,setMessage1]=useState("")
    const [count,setCount]=useState(0);
    const[id,setId]=useState();

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
            const res2=await fetch(`https://test-api.brightlife.org/brightlife/get/guardian/profile?user_id=${user_id}`,{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getpofiledata=await res2.json();
            // console.log(getpofiledata);
            console.log("id is",getpofiledata?.response?.guardian?.id)
            setLocalData("guardian_id",getpofiledata?.response?.guardian?.id)
            setId(getpofiledata?.response?.guardian?.id)
            // setInfo(getpofiledata.response?.sponsor);
            setData({
                fname:{value:getpofiledata.response?.guardian?.user?.name},
                sname:{value:""},
                gmail:{value:getpofiledata.response?.guardian?.user?.email},
                organization:{value:getpofiledata.response?.guardian?.organization},
                mobile:{value:getpofiledata.response?.guardian?.mobile},
                source:{value:getpofiledata.response?.guardian?.source},
                address:{value:getpofiledata.response?.guardian?.address},
                city:{value:getpofiledata.response?.guardian?.city},
                state:{value:getpofiledata.response?.guardian?.state},
                country:{value:getpofiledata.response?.guardian?.country},
                pin:{value:getpofiledata.response?.guardian?.postal_code},
            })
            // console.log(getpofiledata.response?.sponsor?.profile)
            // setSelectedFile(getpofiledata.response?.sponsor?.profile);
            // setLocalData("profile",getpofiledata.response?.sponsor?.profile)
            setDatas(localStorage.setItem('profile',getpofiledata.response?.guardian?.profile))
            // setUname(getpofiledata.response?.sponsor?.user?.name);
            // setDatas(localStorage.setItem('profile',result1.response?.sponsor?.profile))
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
            console.log("guardian_id is",id);
            formData.append('id',id);
            formData.append('user',JSON.stringify({
                'id':user_id,
                'name': name,
                'email':email,
                'role': role,
            }))
            formData.append('mobile',data.mobile.value)
            formData.append('organization', data.organization.value)
            formData.append('profile',props.selectedFile);
            formData.append('source',"Turito")
            formData.append('address',data.address.value)
            formData.append('city',data.city.value)
            formData.append('state',data.state.value)
            formData.append('country',data.country.value)
            formData.append('postal_code',data.pin.value)
            // const JSONdata=JSON.stringify(formData);
            fetch("https://test-api.brightlife.org/brightlife/update/guardian/profile",{
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
                        setMessage("Mobile Number Exists");
                })
            })
        }
        else
        {
            // console.log(one);
            if(data.fname.value==="" || data.sname.value==="" || data.organization.value==="" || data.mobile.value==="" || data.source.value==="" || data.address.value==="" || data.city.value==="" || data.state.value==="" || data.country.value==="" || data.pin.value===""
            || typeof data.fname.value==="undefinded"|| typeof data.sname.value==="undefined" || typeof data.organization.value==="undefined" || typeof data.mobile.value==="undefined" || typeof data.source.value==="undefined" || typeof data.address.value==="undefined" || typeof data.city.value==="undefined" || typeof data.state.value==="undefined" || typeof data.country.value==="undefined" || typeof data.pin.value==="undefined" 
            )
            {
                // setSelectedFile(null);
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
    const handleLogout=()=>
    {
      // console.log("Hello")
      localStorage.clear();
      localStorage.removeItem("profile");
      Router.push({
        pathname:'/',
      })
    }
    return(
        <>
            <div className="col-lg-10 col-sm-12">
              <div className="myaccount-right-block">
                <div className="myaccount-content-block">
                  <div className="myaccount-content-inner">   
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
                            <div className="col-lg-12 d-flex justify-content-end">
                                <div className="sponsor-save-btn" onClick={updateProfile}>Save</div>
                            </div>
                        </div>
                        </form>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}
export default Gaurdian_Profile1;