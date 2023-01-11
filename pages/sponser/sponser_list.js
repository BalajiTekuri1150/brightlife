import React from 'react';
import { getLocalData, setLocalData } from '../../utils/storage_service';
// import Side from './side_bar';
import homestyle from '../../styles/Home.module.css';
import { useState,useEffect } from 'react';
import logo from "../../public/orphan-kids-.jpg"
import Image from 'next/image'
import Router from 'next/router';
import { getData } from '../../utils/data_manage_service';
import Head from 'next/head';
import Script from 'next/script';
const Sponser_list=(props)=>
{
    const id=getLocalData("sponser_id");
    const [posts,setPosts]=useState([]);
    const [message,setMessage]=useState("");
    useEffect(()=>{
        const getDetails=async()=>{
            const res1=await fetch(`https://test-api.brightlife.org/brightlife/get/sponsor/kids?sponsor_id=${id}`,{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getdet=await res1.json();
            if(getdet?.status==true){
                setPosts(getdet?.response?.SponsoredApplications?.application);
            }
            else{
                setMessage(getdet?.error?.message);
            }
            
        }
        getDetails();
    },[]);
    const handleKidsList=()=>
    {
        Router.push({
            pathname:'/sponser/sponser',
        })
    }
    const handleView=()=>{
        props.handleView1();
    }
    return(
        <div>
            <Head>
                <title>Brightlife</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" />
            </Head>
            <div className="col-lg-12 col-sm-12">
            <button className="btn btn-primary" style={{marginLeft:'900px',marginTop:'10px',width:'200px',height:'50px'}} onClick={handleKidsList}>Kids List</button><br/>
                <div className="myaccount-right-block" style={{display:'flex'}}>
                    <div className="row sponsor-block card-marign" style={{marginTop:'30px'}}>
                    <div style={{marginLeft:'400px'}}>{message}</div>
                    {posts.length>0 && posts.map((item)=>(
                            <div className="col-lg-6 col-sm-18 col-md-6">
                                <div className="block-shadow">
                                <div><img src="/img/sponsor-child2.jpg" className="img-fluid" /></div>
                                <div className="sponsor-block-content">
                                    <p class="plan-price">20$/Monthly since Jan 2016</p>
                                    <h4>{item.name}</h4>
                                    <div>
                                    <div className="sponsor-justify"><span><img src="/img/fem-clock.png" />{item.gender.name}</span><span><img src="/img/time.png" />12 Years Old</span></div>
                                    <div className="sponsor-justify"><span><img src="/img/date-icon.png" />{item.birthday}</span> <span><img src="/img/lang.png" />Telugu</span></div>
                                    </div>
                                    <p>Vishwa Prasad is from India lives with parents, Enjoys Playing with dolls, Playing with friends, Running</p>
                                </div>
                                 <button className="view-prof-btn" onClick={()=>{handleView();setLocalData("sponsor_child",item.id)}} style={{width:'100%'}}>View Profile</button> 
                                 {/* <a href={`/children/${item.id}`} className="view-prof-btn" >View Profile</a> */}
                                </div>
                            </div>
                        ))}
                    {/* <main className={homestyle.main}>
                        <div className={homestyle.grid}>
                            {message}
                            {posts.map((item)=>(
                                <div className={homestyle.card}>
                                    <Image src={logo} style={{width:'100%',height:'200px'}}/>
                                    <p style={{marginLeft:'30px'}}>{item.name}</p><br/>
                                    <div className="row">
                                        < div className="col-sm">
                                            {item.gender.name}
                                        </div>  
                                        <div className="col-sm"> </div>
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
                                    <a href={`/children/${item.id}`} className="btn btn-primary btn-sm" >SPONSER CHILDREN</a>&nbsp;
                                    <a href={`/children/${item.id}`} className="btn btn-secondary btn-sm" >More Details</a>
                              </div>
                            </div>
                            ))
                        }
                        </div>
                    </main> */}
                    </div>

                    <Script src="js/jquery.slim.min.js"></Script>
                    <Script src="js/popper.min.js"></Script>
                    <Script src="js/bootstrap.bundle.min.js"></Script>
                    <Script src="js/custom.js"></Script>
                </div>
            </div>
        </div>
    )
} 
export default Sponser_list;
