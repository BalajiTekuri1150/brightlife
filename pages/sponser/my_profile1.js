import { useState ,useEffect} from "react"
import Link from "next/link";
import { getLocalData } from "../../utils/storage_service";
import { getData,postData } from "../../utils/data_manage_service";
import Sponser_list from "./sponser_list";
// import Application from "./application";
import Script from "next/script";
import { setLocalData } from "../../utils/storage_service";
// import Input from "./input_compent";
import { useContext } from 'react';
import Input from "../gaurdian/input_compent";
import { store } from '../_app';
import Router from "next/router";
import { postData2 } from "../../utils/data_manage_service";
import Sponsor_child_details from "./sponsor_child_details";
export default function MyProfile(props){
    const user_id=getLocalData("user_id")
    // const[id,setId]=useState()
    const[role,setRole]=useState("")
    const [status,setStatus]=useState(true)
    const [disable,setDisable]=useState(false)
    const [message,setMessage]=useState("")
    const [message1,setMessage1]=useState("")
    const [count,setCount]=useState(0);
    const {datas,setDatas}=useContext(store)
    const [selectedFile, setSelectedFile] = useState(null);
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
    const id=getLocalData("id");
    useEffect(()=>{
        const getprofile=async()=>{
            const result=await getData(`https://test-api.brightlife.org/brightlife/get/sponsor/profile?user_id=${id}`);
            // setId(result?.data?.response?.sponsor?.id)
            setRole(result?.data?.response?.sponsor?.user?.role)
            // setLocalData("guardian_id",result?.data?.response?.guardian?.id)
            setData({
                fname:{value:result?.data?.response?.sponsor?.user?.name},
                lname:{value:""},
                email:{value:result?.data?.response?.sponsor?.user?.email},
                organization:{value:result?.data?.response?.sponsor?.organization},
                mobile:{value:result?.data?.response?.sponsor?.mobile},
                source:{value:result?.data?.response?.sponsor?.source},
                address:{value:result?.data?.response?.sponsor?.address},
                city:{value:result?.data?.response?.sponsor?.city},
                state:{value:result?.data?.response?.sponsor?.state},
                country:{value:result?.data?.response?.sponsor?.country},
                postcode:{value:result?.data?.response?.sponsor?.postal_code},
            })
            setDatas(localStorage.setItem('profile',result.data?.response?.sponsor?.profile))
            console.log(result?.data?.response?.sponsor?.id)
            setLocalData("sponser_id",result.data?.response?.sponsor?.id);
            setMessage("");
            setMessage1("");
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
    const handleData=(name,value,error)=>{
        setStatus(true)
        setMessage("")
        setMessage1("");
        console.log(error)
        // if(error===false){
        //   setDisable(true);
        // }
        // if(error===true){
        //   setDisable(false);
        // }
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
    const sponsor_id=getLocalData("sponser_id")
    const updateProfile=async(e)=>
    {
            e.preventDefault();
            if(selectedFile==null){
                const formData=new FormData();
              // console.log(info.id);
              // console.log("guardian_id is",id);
              formData.append('id',sponsor_id);
              formData.append('user',JSON.stringify({
                  'id':id,
                  'name': name,
                  'email':email,
                  'role': role,
              }))
              formData.append('mobile',data.mobile.value)
              formData.append('organization', data.organization.value)
              // formData.append('profile',selectedFile);
              formData.append('source',"Turito")
              formData.append('address',data.address.value)
              formData.append('city',data.city.value)
              formData.append('state',data.state.value)
              formData.append('country',data.country.value)
              formData.append('postal_code',data.postcode.value)
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
                      setStatus(response.status)
                      console.log(response.status);
                      if(response.status==true){
                          setMessage1("Details Updated Successfully")
                      }
                      else{
                          // if(response.error?.message==="This QueryDict instance is immutable"){
                          //     setMessage("please select profile again")
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
              // console.log("guardian_id is",id);
              formData.append('id',sponsor_id);
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
              formData.append('postal_code',data.postcode.value)
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
                      setStatus(response.status)
                      console.log(response.status);
                      if(response.status==true){
                          setMessage1("Details Updated Successfully")
                      }
                      else{
                          // if(response.error?.message==="This QueryDict instance is immutable"){
                          //     setMessage("please select profile again")
                          // }
                          if(response?.error?.message?.mobile || []){
                            setMessage(response.error?.message?.mobile || ["Please choose the profile Image again"])
                        }
                      }
                          
                  })
              })
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
    const handleChildlist=()=>{
      setCount(2);
    }
    const handleLogout=()=>
    {
      console.log("Hello")
      localStorage.clear();
      // localStorage.removeItem("profile");
      Router.push({
        pathname:'/',
      })
    }
    return(
        <>
          <div>
            <div>
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
                    <Link className="nav-link" href="/home_files/our_team"> Our Team</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/home_files/how_works"> How it works </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " href="/home_files/donate">
                      <button className="btn signin-button Donate" style={{color:'white'}}>Donate
                        {/* <span className="Donate"> Donate </span> */}
                      </button>
                    </Link>
                  </li>
                  { datas!=="undefined" ? 
                    <>
                      <li className="nav-item user-image dropdown">
                        <a className="nav-link " href>
                          <img className="user-image-header" src={datas} />{data?.fname?.value}<i className="fa fa-angle-down" aria-hidden="true" />
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
                          <a onClick={handleLogout}>
                            <li style={{color:'black'}}>
                              <img src="/img/signout.svg" />Sign out
                            </li>
                          </a>
                        </ul>
                      </li>
                    </>:
                    <>
                      <li className="nav-item user-image dropdown">
                        <a className="nav-link " href>
                          <img className="user-image-header" src="/img/profile.png" />{data?.fname?.value}<i className="fa fa-angle-down" aria-hidden="true" />
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
                          <a onClick={handleLogout}>
                            <li style={{color:'black'}}>
                              <img src="/img/signout.svg" />Sign out
                            </li>
                          </a>
                        </ul>
                      </li>
                  </>
                  }
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
                    {datas!=="undefined" ?
                        <>
                          { !selectedFile && (
                            <div>
                              <label htmlFor="file-input">
                                <img src={datas} alt="My Profile Icon" className="left-pro-icon" />
                              </label>
                              <p>{data?.fname?.value}</p>
                            </div>
                          )}
                          {selectedFile && (
                                <div>
                                  <label htmlFor="file-input">
                                <img alt="not fount" src={URL.createObjectURL(selectedFile)} className="left-pro-icon"/>
                                </label>
                                <p>{data?.fname?.value}</p>
                                <br />
                                </div>
                          )}
                            <div className="image-upload">
                                <label htmlFor="file-input">
                                  <img src="/img/camera.png" />
                                </label>
                                <input id="file-input" type="file" onChange={fileChange}/>
                              </div>
                            {/* <input id="file-input" type="file" onChange={fileChange}/> */}
                        </>:
                        <>
                            { !selectedFile && (
                              <div>
                                <label htmlFor="file-input">
                                <img src="/img/profile.png" alt="Profile Icon" className="left-pro-icon" />
                                </label>
                                <p>{data?.fname?.value}</p>
                              </div>
                              
                            )}
                            {selectedFile && (
                                <div>
                                  <label htmlFor="file-input">
                                  <img alt="not fount" src={URL.createObjectURL(selectedFile)} className="left-pro-icon"/>
                                  </label>
                                  <p>{data?.fname?.value}</p>
                                </div>
                            )}
                            <div className="image-upload">
                                <label htmlFor="file-input">
                                  <img src="/img/camera.png" />
                                </label>
                                <input id="file-input" type="file" onChange={fileChange}/>
                              </div>
                            {/* <input id="file-input" type="file" onChange={fileChange}/> */}
                              </>
                    }
                  </div>
                  <div className="myaccount">
                    <ul>
                      <li><div onClick={profileClick}><img src="/img/user.svg" />MY PROFILE</div></li>
                      <li><div className="active" onClick={sponserChild}><img src="/img/sponsored.svg" />SPONSORED CHILDREN</div></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-10 col-sm-12">
              <div className="myaccount-right-block">
                {count==0 &&
                  <h4 className="sponsor-headding">My Profile</h4>
                }
                { count==1 &&
                  <div>SPONSORED CHILDREN LIST</div>
                }
                { count==2 &&
                  <>                         
                    <div class="sponsor-breadcums">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><div onClick={sponserChild}>Sponsored children</div></li>        
                        <li class="breadcrumb-item active">Child’s Profile</li>
                      </ol>
                  </div>
                  </>

                }
                <div className="myaccount-content-block">
                  <div className="myaccount-content-inner">   
                    {count==0 &&
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
                                <button className="sponsor-save-btn" onClick={updateProfile} disabled={disable}>Save</button>
                                {/* <Link href="/gaurdian/gaurdian_dashboard"><button className="btn btn-secondary mx-5 col-2" >Exit</button></Link> */}
                            </div>
                        </div>
                        </form> 
                    }
                    {count==1 && 
                        <Sponser_list handleView1={handleChildlist}/>
                    }
                    {count==2 && 
                      
                        <Sponsor_child_details handleSC1={sponserChild}/>

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

        <Script src="js/jquery.slim.min.js"></Script>
        <Script src="js/popper.min.js"></Script>
        <Script src="js/bootstrap.bundle.min.js"></Script>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.8/slick.min.js"></Script>
        <Script src="js/custom.js"></Script>
        {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></Script>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></Script> */}
{/* <div id="container"></div> */}
      </div>
        </div>      
        </>
    )
}



{/* <div className="col-lg-10 col-sm-12">
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
                            {/* {status?<p className="text-success">{message1}</p>:<p className="text-danger">{message}</p>}
                            <div className="col-lg-12 d-flex justify-content-end">
                                <div className="sponsor-save-btn" onClick={updateProfile}>Save</div>
                                {/* <Link href="/gaurdian/gaurdian_dashboard"><button className="btn btn-secondary mx-5 col-2" >Exit</button></Link> */}
                            {/* </div> */}
                        {/* </div> */}
                    // </form> 
                    // </div>
                //   <Script type="module" src="js/jquery.slim.min.js"></Script>
                //   <Script type="module" src="js/popper.min.js"></Script>
                //   <Script type="module" src="js/bootstrap.bundle.min.js"></Script>
                //   <Script type="module" src="js/custom.js"></Script>
                //   </div>
                // </div>
            //   </div>          */}