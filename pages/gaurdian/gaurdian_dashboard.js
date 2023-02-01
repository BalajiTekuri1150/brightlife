import React from "react";
import homestyle from '../../styles/Home.module.css';
import { useState,useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import { getData, getData1 } from "../../utils/data_manage_service";
import { getLocalData ,setLocalData} from "../../utils/storage_service";
// import Gaurdian_Profile1 from "./guardian_profile1";
import Gaurdian_Profile from "./gaurdian_profile";
import Application from "./application";
import Script from "next/script";
import { useContext } from 'react';
import { store } from '../_app';
export default function Child_Card(props){
    const {datas,setDatas}=useContext(store)
    const [posts,setPosts]=useState([]);
    const [selectedFile,setSelectedFile]=useState(null);
    const guardian_id=getLocalData("guardian_id")
    const name=getLocalData("name");
    const [count,setCount]=useState(0);
    useEffect(()=>{
        const getDetails=async()=>{
            const result1=await getData(`https://test-api.brightlife.org/brightlife/get/application/details?page=1&page_size=36&guardian_id=${guardian_id}`);
            setPosts(result1?.data?.response?.data);
        }
        getDetails();
    },[]);
    const fileChange=async(e)=>{
        setSelectedFile(e.target.files[0]);
    }
    const handleProfile=async()=>{
        // const result2=await(getData1(`https://test-api.brightlife.org/brightlife/get/application/details?page=1&page_size=36&guardian_id=${guardian_id}`))
        // if(result2.data?.status){
        //     setPosts(result2?.data?.response?.data);
        // }
        setCount(0);
    }
    const handleApplication=()=>{
        setCount(1);
    }
    const handleNewApplication=()=>
    {
        // localStorage.removeItem("application_id")
        localStorage.setItem("application_id",null)
        setCount(2);
    }
    const handleLogout=()=>
    {
      console.log("Hello")
      localStorage.clear();
      localStorage.removeItem("profile");
      Router.push({
        pathname:'/',
      })
    }
    // localStorage.removeItem("application_id");
    // let item_id=localStorage.getItem("application_id");
    // console.log(selectedFile)
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
                            <Link className="nav-link" href="/home_files/our_team"> Our Team</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/home_files/how_works"> How it works </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " href="/home_files/donate">
                            <button className="btn signin-button" type="submit">
                                <span className="Donate"> Donate </span>
                            </button>
                            </Link>
                        </li>
                        { datas!=="undefined"? <>
                            <li className="nav-item user-image dropdown">
                                <a className="nav-link " href>
                                <img className="user-image-header" src={datas} />{name}<i className="fa fa-angle-down" aria-hidden="true" />
                                </a>
                                <ul className="dropdown-nav">
                                <div onClick={handleProfile}>
                                    <li>
                                    <img src="/img/user.svg" /><span style={{color:'black'}}>My profile</span>
                                    </li>
                                </div>
                                <div onClick={handleProfile}>
                                    <li>
                                        <img src="/img/sponsored.svg" /><span style={{color:'black'}}>Sponsored Children</span>
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
                                <img className="user-image-header" src="/img/profile.png" />{name}<i className="fa fa-angle-down" aria-hidden="true" />
                                </a>
                                <ul className="dropdown-nav">
                                <div onClick={handleProfile}>
                                    <li>
                                    <img src="/img/user.svg" /><span style={{color:'black'}}>My profile</span>
                                    </li>
                                </div>
                                <div onClick={handleProfile}>
                                    <li>
                                        <img src="/img/sponsored.svg" /><span style={{color:'black'}}>Sponsored Children</span>
                                    </li>
                                </div>
                                <a onClick={handleLogout}>
                                    <li style={{color:'black'}}>
                                    <img src="/img/signout.svg"/>Sign out
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
                              <p>{name}</p>
                            </div>
                          )}
                          {selectedFile && (
                                <div>
                                  <label htmlFor="file-input">
                                <img alt="not fount" src={URL.createObjectURL(selectedFile)} className="left-pro-icon"/>
                                </label>
                                <p>{name}</p>
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
                                <p>{name}</p>
                              </div>
                              
                            )}
                            {selectedFile && (
                                <div>
                                  <label htmlFor="file-input">
                                  <img alt="not fount" src={URL.createObjectURL(selectedFile)} className="left-pro-icon"/>
                                  </label>
                                  <p>{name}</p>
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
                 
                  <ul className=" col-2 sidebar-menu">
                            <p className="text-dark m-5 pe-auto" onClick={handleProfile}>MyProfile</p>
                            <p className="text-dark m-5 pe-auto" onClick={handleApplication}>Applications</p>
                        </ul>
                </div>
              </div>
            </div>
        {count==1 &&
            <div className="col-lg-10 col-sm-12">
              <div className="myaccount-right-block">
              <h4 className="sponsor-headding">Child List</h4>
                <div className="myaccount-content-block">
                  <div className="row sponsor-block card-marign"> 
                    {/* <div class="filter_head" style={{marginTop:'20px',marginBottom:'20px'}}>
                        <div class="sort-filter">Sort by/ Filters</div>
                        <div><a href="" class="new-appli-btn"><i class="fa fa-plus" aria-hidden="true"></i> New Application</a></div>
                    </div> */}
                        <div class="filter_head" style={{marginTop:'20px',marginBottom:'20px'}}>
                            <div className=""></div>
                            <button className="new-appli-btn" onClick={handleNewApplication}>New Application</button>
                        </div>
                        {posts.length>0 && posts.map((item)=>(
                            <div className="col-lg-4  col-sm-12 col-md-6">
                                <div className="block-shadow">
                                <div><img src="/img/sponsor-child3.jpg" className="img-fluid" /></div>
                                <div className="sponsor-block-content">
                                    <div className="status-sec">
                                    <span className="pending-status">{item.status.name}</span>
                                    </div>
                                    <h4>{item.name}</h4>
                                    <p>{item.id}</p>
                                    <div>
                                    <div className="sponsor-justify"><span><img src="/img/fem-clock.png" />{item.gender.name}</span><span><img src="/img/time.png" />12 Years Old</span></div>
                                    <div className="sponsor-justify"><span><img src="/img/date-icon.png" />{item.birthday}</span> <span><img src="/img/lang.png" />Telugu</span></div>
                                    </div>
                                    <p>Vishwa Prasad is from India lives with parents, Enjoys Playing with dolls, Playing with friends, Running</p>
                                </div>
                                {/* <div className="view-prof-btn">View Profile</div> */}
                                {/* {item.status.id!=1? <Link href={{pathname:"/gaurdian/application",query:{application_id:`${item.id}`}}}><button onClick={()=>{setLocalData("application_id",item.id)}} className="view-prof-btn" style={{width:'100%'}}>Edit Application</button></Link>:<Link href={`/children/${item.id}`}><button>View Application</button></Link>} */}
                                { item.status.id!=1 ? 
                                    <button onClick={()=>{setLocalData("application_id",item.id),setCount(2)}} className="view-prof-btn" style={{width:'100%'}}>Edit Application</button>:<></>
                                }
                                </div>
                            </div>
                        ))}
                  </div>
                </div>
              </div>
            </div>
        }
        { count==0 &&
            <Gaurdian_Profile selectedFile={selectedFile}/>
        }
        {count==2 &&
            <Application handleExit1={handleProfile}/>
        }
        {/* { count==3 &&
            // {console.log(item_id)}
            <Application/>
        } */}
         {/* <Script src="/js/jquery.slim.min.js"></Script>
         <Script src="/js/popper.min.js"></Script>
         <Script src="/js/bootstrap.bundle.min.js"></Script>
         <Script src="/js/custom.js"></Script> */}
          </div>
        </div>
        </div>
        </>
    )
}