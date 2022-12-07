import React from "react";
import homestyle from '../../styles/Home.module.css';
import { useState,useEffect } from "react";
import profile from "../../public/logo.jpeg"
import Image from "next/image";
import Link from "next/link";
import { getData } from "../../utils/data_manage_service";
import { getLocalData ,setLocalData} from "../../utils/storage_service";
export default function Child_Card(){
    const [posts,setPosts]=useState([]);
    const guardian_id=getLocalData("guardian_id")
    useEffect(()=>{
        const getDetails=async()=>{
            const result1=await getData(`https://test-api.brightlife.org/brightlife/get/application/details?page=1&page_size=36&guardian_id=${guardian_id}`);
            setPosts(result1?.data?.response?.data);
        }
        getDetails();
    },[]);
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
                                    <img src="/img/sponsored.svg" /><span style={{color:'black'}}>Sponsored Children</span>
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
                    <p>prathapp</p>
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
                        <Link href="/gaurdian/application"><button className="btn btn-primary m-3">New Application</button></Link>
                        <form> 
                        <main className={homestyle.main}>
                         <div className={homestyle.grid}>
                             {posts.length>0 && posts.map((item)=>(
                                 <div className={homestyle.card}>
                                     <Image src={profile} style={{width:'100%',height:'200px'}}/>
                                     <p style={{marginLeft:'30px'}} className="text-primary">{item.status.name}</p><br/>
                                     <p style={{marginLeft:'30px'}}>{item.name}</p><br/>
                                     <p>{item.id}</p>
                                     <div className="row">
                                         < div className="col-sm">
                                             {item.gender.name}
                                         </div>  
                                         <div className="col-sm"> 
                                         </div>
                                         < div className="col-sm">
                                             <label>Age</label>
                                         </div>
                                     </div>
                                     <div className="row">
                                         < div className="col-sm">
                                             {item.birthday}
                                         </div>  
                                         < div className="col-sm" style={{marginLeft:'60px'}}>
                                             <label>Telugu</label> 
                                         </div>
                                     </div><br/>
                                     <p style={{fontSize:'16px'}}>Vishwa Prasad is from India lives with parents,Enjoys playing with dolls ,playing with friends,Running</p><br/>
                                     <div style={{display:'flex'}}>
                                         {item.status.id!=1? <Link href={{pathname:"/gaurdian/application",query:{application_id:`${item.id}`}}}><button onClick={()=>{setLocalData("application_id",item.id)}}>Edit Application</button></Link>:<Link href={`/children/${item.id}`}><button>View Application</button></Link>}
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </main>
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
        </div> 
        </>
    )
}