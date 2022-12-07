import { useState ,useEffect} from "react"
import Link from "next/link";
import { getLocalData } from "../../utils/storage_service";
import { getData,postData } from "../../utils/data_manage_service";
import My_Profile_Child from "../sponser/My_Profile_Child";
import Guardian_Child from "./guardian_child";
export default function Gaurdian_Profile(){
    const user_id=getLocalData("user_id")
    const[id,setId]=useState()
    const[role,setRole]=useState("")
    const [status,setStatus]=useState(true)
    const [disable,setDisable]=useState(true)
    const [message,setMessage]=useState("")
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
        }
        getprofile();
    },[]);
    const handleData=(name,value)=>{
        setStatus(true)
        setMessage("")
        setDisable(false)
        setData({
            ...data,
            [name]:{
                ...value.name,
                value:value,
            }
        })
    }
    const updateProfile=async(e)=>
    {
        const user_data={
            user: {
                id:user_id,
                name: data.fname.value,
                email:data.email.value,
                role: role
            },
            id:id,
            mobile:data.mobile.value,
            organization: data.organization.value,
            source:data.source.value,
            address:data.address.value,
            city:data.city.value,
            state:data.state.value,
            country:data.country.value,
            postal_code:data.postcode.value
        }
        const result=await(postData("https://test-api.brightlife.org/brightlife/update/guardian/profile",user_data,1))
        setStatus(result?.data?.status)
        if(result?.data?.status==true)
        {
            setMessage("Details Updated Successfully");
        }
        else
        {
            setMessage(result?.data?.error)
        }
    }
    return(
        <>
            <div className="wrapper" >
            <header>
                <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between solid">
                    <div className="custom-container border_bottom">
                    <div>
                        <a className="navbar-toggler" type="button" onclick="toggleSidebar()">
                        <i className="fa fa-bars" aria-hidden="true" />
                        </a>
                        <a className="navbar-brand" href="/">
                        <img className="logo" src="/img/logo.png" alt="Brightlife" />
                        </a>
                    </div>
                    <div className=" navbar-collapse " id="mobilesidemenu">
                        <ul className="navbar-nav mr-auto ">
                        <li className="nav-item ">
                            <a className="nav-link" href="/home_files/our_team"> Our Team</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/home_files/how_works"> How it works </a>
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
                            <Link href="/sponser/My_Profile">
                                <li>
                                <img src="/img/user.svg" /><span style={{color:'black'}}>My profile</span>
                                </li>
                            </Link>
                            <Link href="/sponser/My_Profile">
                                <li>
                                <img src="/img/sponsored.svg" /><span style={{color:'black'}}>Sponsored</span>
                                </li>
                            </Link>
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
                    <img src="/img/childsays.png" alt="My Profile Icon" className="left-pro-icon" />
                    <div className="image-upload">
                      <label htmlFor="file-input">
                        <img src="/img/camera.png" />
                      </label>
                      <input id="file-input" type="file" />
                      {/* {selectedFile && (
                                <div>
                                 <img alt="not fount" src={URL.createObjectURL(selectedFile)} width="100px" height="70px" style={{borderRadius:'100px',marginLeft:'30px'}}/>
                                 <br />
                                 <button onClick={()=>setSelectedFile(null)} style={{marginLeft:'50px',marginTop:'10px'}}>Remove</button>
                                 </div>
                             )}
                             {selectedImage && 
                                 <img src={selectedImage}></img>
                             } */}
                    </div>
                    <p>{data?.fname?.value}</p>
                  </div>
                 
                  <ul className=" col-2 sidebar-menu">
                            <Link href="/gaurdian/gaurdian_profile"><p className="text-dark m-5 pe-auto">Myprofile</p></Link>
                            <Link href="/gaurdian/gaurdian_dashboard"><p className="text-dark m-5">Applications</p></Link>
                        </ul>
                </div>
              </div>
            </div>
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
                                <Guardian_Child type="text"
                                                name="fname"
                                                placeholder="enter first name"
                                                value={data.fname.value}
                                                // reg={reg_name}
                                                handleChange={handleData}
                                />
                                {/* {err1 ? <div></div> : <div style={{color:'red'}}>First name should contain minimum 4 characters</div>} */}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Last Name</label>
                                {/* <input type="text" className="form-control" />             */}
                                <Guardian_Child type="text"
                                                    name="lname"
                                                     value={data.lname.value}
                                                    //  reg={reg_name}
                                                     handleChange={handleData}
                                 />
                                 {/* {err2 ? <div></div> : <div style={{color:'red'}}>Second name should contain minimum 4 characters</div>} */}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Organisation</label>
                                {/* <input type="text" className="form-control" />             */}
                                <Guardian_Child type="text"
                                                name="organization"
                                                value={data.organization.value}
                                                // reg={reg_name}
                                                handleChange={handleData}
                                />
                                {/* {err3 ? <div></div> : <div style={{color:'red'}}>Organization should contain minimum 4 characters</div>} */}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Email Address</label>
                                {/* <input type="text" className="form-control" />             */}
                                <Guardian_Child type="text"
                                                name="gmail"
                                                value={data.email.value}
                                                // reg={reg_email}
                                                handleChange={handleData}
                                />
                                {/* {err4 ? <div></div> : <div style={{color:'red'}}>gmail should be like ***@gmail.com</div>} */}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Mobile number</label>
                                {/* <input type="text" className="form-control" />             */}
                                <Guardian_Child type="text"
                                                     name="mobile"
                                                     value={data.mobile.value}
                                                    //  reg={reg_phone}
                                                     handleChange={handleData}
                                 />
                                 {/* {err5 ? <div></div> : <div style={{color:'red'}}>Mobile Number should start with +91 and contain 10 numbers only</div>} */}
                                
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>How did you hear about brightlife</label>
                                {/* <input type="text" className="form-control" />             */}
                                <Guardian_Child type="text"
                                                     name="source"
                                                     value={data.source.value}
                                                    //  reg={reg_name}
                                                     handleChange={handleData}
                                 />
                                 {/* {err6 ? <div></div> : <div style={{color:'red'}}>Source should contain minimum 4 characters</div>} */}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Address</label>
                                {/* <input type="text" className="form-control" />             */}
                                <Guardian_Child type="text"
                                                     name="address"
                                                     value={data.address.value}
                                                    //  reg={reg_name}
                                                     handleChange={handleData}
                                 />
                                 {/* {err7 ? <div></div> : <div style={{color:'red'}}>Address should contain minimum 4 characters</div>} */}
                                
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>City</label>
                                {/* <input type="text" className="form-control" />             */}
                                <Guardian_Child type="text"
                                                    name="city"
                                                     value={data.city.value}
                                                    //  reg={reg_name}
                                                     handleChange={handleData}
                                 />
                                 {/* {err8 ? <div></div> : <div style={{color:'red'}}>City should contain minimum 4 characters</div>} */}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>State</label>
                                {/* <input type="text" className="form-control" />             */}
                                <Guardian_Child type="text"
                                                     name="state"
                                                     value={data.state.value}
                                                    //  reg={reg_name}
                                                     handleChange={handleData}
                                 />
                                 {/* {err9 ? <div></div> : <div style={{color:'red'}}>State should contain minimum 4 characters</div>} */}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Country</label>
                                {/* <input type="text" className="form-control" />             */}
                                <Guardian_Child type="text"
                                                     name="country"
                                                     value={data.country.value}
                                                    //  reg={reg_name}
                                                     handleChange={handleData}
                                 />
                                 {/* {err10 ? <div></div> : <div style={{color:'red'}}>Country should contain minimum 4 characters</div>} */}
                            </div>
                            </div>
                            <div className="col-lg-6">
                            <div className="form-group">
                                <label>Postal Code</label>
                                {/* <input type="text" className="form-control" />             */}
                                <Guardian_Child type="text"
                                                     name="pin"
                                                     value={data.postcode.value}
                                                    //  reg={reg_name}
                                                     handleChange={handleData}
                                 />
                                 {/* {err11 ? <div></div> : <div style={{color:'red'}}>Pin should contain minimum 4 characters</div>} */}
                            </div>
                            </div>
                            {/* <div style={{color:'red',marginLeft:'150px'}}>{message}</div><br/> */}
                            {/* <div style={{color:'green',marginLeft:'150px'}}>{message1}</div><br/> */}
                            {status?<p className="text-success">{message}</p>:<p className="text-danger">{message}</p>}
                            <div className="col-lg-12 ">
                                <div className="sponsor-save-btn" onClick={updateProfile}>Save</div>
                                {/* <Link href="/gaurdian/gaurdian_dashboard"><button className="btn btn-secondary mx-5 col-2" >Exit</button></Link> */}
                            </div>
                        </div>
                        </form>
                    {/* {count==1 && 
                        <Sponser_list/>
                    } */}
                  </div>
                </div>
              </div>
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
            </div>
        </>
    )
}