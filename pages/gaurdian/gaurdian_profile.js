import { useState ,useEffect} from "react"
import Link from "next/link";
import { getLocalData } from "../../utils/storage_service";
import { getData,postData } from "../../utils/data_manage_service";
import My_Profile_Child from "../sponser/My_Profile_Child";
import Guardian_Child from "./guardian_child";
import Child_Card from "./gaurdian_dashboard";
import Application from "./application";
import Script from "next/script";
import { setLocalData } from "../../utils/storage_service";
import Input from "./input_compent";
import { useContext } from 'react';
import { store } from '../_app';
export default function Gaurdian_Profile(props){
    const user_id=getLocalData("user_id")
    const[id,setId]=useState()
    const[role,setRole]=useState("")
    const [status,setStatus]=useState(true)
    const [disable,setDisable]=useState(true)
    const [message,setMessage]=useState("")
    const [message1,setMessage1]=useState("")
    const {datas,setDatas}=useContext(store)
    const [data,setData]=useState({
        fname:{value:""},
        lname:{value:""},
        email:{value:""},
        organization:{value:""},
        mobile:{value:""},
        source:{value:""},
        address:{value:""},
        city:{value:""},
        state:{value:""},
        country:{value:""},
        postcode:{value:""},
    });
    useEffect(()=>{
        const getprofile=async()=>{
            const result=await getData(`https://test-api.brightlife.org/brightlife/get/guardian/profile?user_id=${user_id}`);
            setId(result?.data?.response?.guardian?.id)
            setRole(result?.data?.response?.guardian?.user?.role)
            setLocalData("guardian_id",result?.data?.response?.guardian?.id)
            setData({
                fname:{value:result?.data?.response?.guardian?.user?.name},
                lname:{value:""},
                email:{value:result?.data?.response?.guardian?.user?.email},
                organization:{value:result?.data?.response?.guardian?.organization},
                mobile:{value:result?.data?.response?.guardian?.mobile},
                source:{value:result?.data?.response?.guardian?.source},
                address:{value:result?.data?.response?.guardian?.address},
                city:{value:result?.data?.response?.guardian?.city},
                state:{value:result?.data?.response?.guardian?.state},
                country:{value:result?.data?.response?.guardian?.country},
                postcode:{value:result?.data?.response?.guardian?.postal_code},
            })
            setDatas(localStorage.setItem('profile',result.data?.response?.guardian?.profile))
        }
        getprofile();
    },[]);
    if(data.address.value==="undefined"){
        data.address.value="";
    }
    if(data.lname.value==="undefined"){
        data.lname.value="";
    }
    if(data.organization.value==="undefined"){
        data.organization.value="";
    }
    if(data.city.value==="undefined"){
        data.city.value="";
    }
    if(data.state.value==="undefined"){
        data.state.value="";
    }
    if(data.country.value==="undefined"){
        data.country.value="";
    }
    if(data.postcode.value==="undefined"){
        data.postcode.value="";
    }
    const handleData=(name,value)=>{
        setStatus(true)
        setMessage("")
        setMessage1("");
        setDisable(false)
        setData({
            ...data,
            [name]:{
                ...value.name,
                value:value,
            }
        })
    }
    const name=getLocalData("name");
    const email=getLocalData("email");
    const updateProfile=async(e)=>
    {
            if(props.selectedFile==null){
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
                // formData.append('profile',props.selectedFile);
                formData.append('source',"Turito")
                formData.append('address',data.address.value)
                formData.append('city',data.city.value)
                formData.append('state',data.state.value)
                formData.append('country',data.country.value)
                formData.append('postal_code',data.postcode.value)
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
                        setStatus(response.status)
                        console.log(response.status);
                        if(response.status==true){
                            setMessage1("Details Updated Successfully")
                        }
                        else{
                            // setMessage("Mobile Number Exists");
                            // console.log(response.error.message)
                            // if(response?.error?.message || []){
                            //     setMessage(response.error?.message || [])
                            // }
                            // console.log(response.error?.message?.mobile);
                            
                            if(response?.error?.message?.mobile || []){
                                setMessage(response.error?.message?.mobile || ["Please choose the profile Image again"])
                            }
                        }
                    })
                })   
            }
            else{
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
                formData.append('postal_code',data.postcode.value)
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
                        setStatus(response.status)
                        console.log(response.status);
                        if(response.status==true){
                            setMessage1("Details Updated Successfully")
                        }
                        else{
                            // setMessage("Mobile Number Exists");
                            // console.log(response.error.message)
                            // if(response?.error?.message || []){
                            //     setMessage(response.error?.message || [])
                            // }
                            // console.log(response.error?.message?.mobile);
                            
                            if(response?.error?.message?.mobile || []){
                                setMessage(response.error?.message?.mobile || ["Please choose the profile Image again"])
                            }
                        }
                    })
                })
            }
            
    }
    return(
        <>
            <div className="col-lg-10 col-sm-12">
              <div className="myaccount-right-block">
                <h4 className="sponsor-headding">My Profile</h4>
                <div className="myaccount-content-block">
                  <div className="myaccount-content-inner">   
                        <form> 
                        <div className="row sponsor-block bg-white">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <Input type="text"
                                                    name="fname"
                                                    placeholder="enter first name"
                                                    value={data.fname.value}
                                                    // reg={reg_name}
                                                    onChange={handleData}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Last Name</label>
                                <Input type="text"
                                                    name="lname"
                                                     value={data.lname.value}
                                                    //  reg={reg_name}
                                                     onChange={handleData}
                                 />
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Organisation</label>
                                <Input type="text"
                                                name="organization"
                                                value={data.organization.value}
                                                // reg={reg_name}
                                                onChange={handleData}
                                />
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Email Address</label>
                                <Input type="text"
                                                name="gmail"
                                                value={data.email.value}
                                                // reg={reg_email}
                                                onChange={handleData}
                                />
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Mobile number</label>
                                <Input type="text"
                                                     name="mobile"
                                                     value={data.mobile.value}
                                                    //  reg={reg_phone}
                                                    onChange={handleData}
                                 />
                                
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>How did you hear about brightlife</label>
                                <Input type="text"
                                                     name="source"
                                                     value={data.source.value}
                                                    //  reg={reg_name}
                                                     onChange={handleData}
                                 />
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Address</label>
                                <Input type="text"
                                                     name="address"
                                                     value={data.address.value}
                                                    //  reg={reg_name}
                                                     onChange={handleData}
                                 />
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>City</label>
                                <Input type="text"
                                                    name="city"
                                                     value={data.city.value}
                                                    //  reg={reg_name}
                                                     onChange={handleData}
                                 />
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>State</label>
                                <Input type="text"
                                                     name="state"
                                                     value={data.state.value}
                                                    //  reg={reg_name}
                                                     onChange={handleData}
                                 />
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Country</label>
                                <Input type="text"
                                                     name="country"
                                                     value={data.country.value}
                                                    //  reg={reg_name}
                                                     onChange={handleData}
                                 />
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Postal Code</label>
                                <Input type="text"
                                                     name="pin"
                                                     value={data.postcode.value}
                                                    //  reg={reg_name}
                                                     onChange={handleData}
                                 />
                            </div>
                            </div>
                            {/* <div style={{color:'red',marginLeft:'150px'}}>{message}</div><br/> */}
                            {/* <div style={{color:'green',marginLeft:'150px'}}>{message1}</div><br/> */}
                            {status?<p className="text-success">{message1}</p>:<p className="text-danger">{message}</p>}
                            <div className="col-lg-12 d-flex justify-content-end">
                                <div className="sponsor-save-btn" onClick={updateProfile}>Save</div>
                                {/* <Link href="/gaurdian/gaurdian_dashboard"><button className="btn btn-secondary mx-5 col-2" >Exit</button></Link> */}
                            </div>
                        </div>
                        </form>
                  </div>
                <Script type="module" src="js/jquery.slim.min.js"></Script>
                <Script type="module" src="js/popper.min.js"></Script>
                <Script type="module" src="js/bootstrap.bundle.min.js"></Script>
                <Script type="module" src="js/custom.js"></Script>
                </div>
              </div>
            </div>         
                {/* <div className="row h-100 mt-5">
                    <div className="border border-dark bg-white mt-5" style={{"width":"350px","height":"900px"}}>
                        <ul className=" col-2 sidebar-menu">
                            <Link href="/gaurdian/gaurdian_profile"><p className="text-dark m-5 pe-auto">Myprofile</p></Link>
                            <Link href="/gaurdian/gaurdian_dashboard"><p className="text-dark m-5">Applications</p></Link>
                        </ul>
                    </div>
                    <div className="bg-white mt-5" style={{"width":"900px","height":"900px",marginLeft:'30px'}}>
                        <form className="bg-light px-5 pt-5" onSubmit={updateProfile}>
                            <div className="row">
                                <div className="col-5 mx-4">
                                    <label>First Name</label>
                                    <My_Profile_Child type="text"  name="fname" className="form-control"  value={data.fname.value}  handleChange={handleData}/> 
                                </div>
                                <div className="col-5 mx-4">
                                    <label>LastName</label>
                                    <My_Profile_Child type="text" name="lname" className="form-control" value={data.lname.value}  handleChange={handleData}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5 m-4">
                                    <label>Organization</label>
                                    <My_Profile_Child type="text" name="organization" className="form-control" value={data.organization.value}  handleChange={handleData}/>
                                </div>
                                <div className="col-5 m-4">
                                    <label>Email Address</label>
                                    <My_Profile_Child type="email" name="email" className="form-control" value={data.email.value}  handleChange={handleData}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5 m-4">
                                    <label>Mobile Number</label>
                                    <My_Profile_Child type="tel" name="mobile" className="form-control" value={data.mobile.value}  handleChange={handleData}/>
                                </div>
                                <div className="col-5 m-4">
                                    <label>How did you hear about us</label>
                                    <My_Profile_Child type="tel" name="source" className="form-control" value={data.source.value}  handleChange={handleData}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5 m-4">
                                    <label>Address</label>
                                    <My_Profile_Child type="text" name="address" className="form-control" value={data.address.value}  handleChange={handleData}/>
                                </div>
                                <div className="col-5 m-4">
                                    <label>City</label>
                                    <My_Profile_Child type="text" name="city" className="form-control" value={data.city.value}  handleChange={handleData}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5 m-4">
                                    <label>State</label>
                                    <My_Profile_Child type="text" name="state" className="form-control" value={data.state.value}  handleChange={handleData}/>
                                </div>
                                <div className="col-5 m-4">
                                    <label>Country</label>
                                    <My_Profile_Child type="text" name="country" className="form-control" value={data.country.value}  handleChange={handleData}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5 m-4">
                                    <label>Postal code</label>
                                    <My_Profile_Child type="number" name="postcode" className="form-control" value={data.postcode.value}  handleChange={handleData}/>
                                </div>
                            </div>
                            {status?<p className="text-success">{message}</p>:<p className="text-danger">{message}</p>}
                            <div className="row">
                                <button type="submit" className="btn btn-primary mx-5 col-2" disabled={disable}>Update</button>
                                <Link href="/gaurdian/gaurdian_dashboard"><button className="btn btn-secondary mx-5 col-2" >Exit</button></Link>
                            </div>
                        </form>
                    </div>
                </div> */}
        </>
    )
}