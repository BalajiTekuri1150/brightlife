import React from 'react';
import { getLocalData } from '../utils/storage_service';
import Side from './side_bar';
import homestyle from '../styles/Home.module.css';
import { useState,useEffect } from 'react';
import logo from "../assets/images/fb.png"
import Router from 'next/router';
const sponser_list=()=>
{
    const id=getLocalData("s_id");
    console.log(id);
    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        const getDetails=async()=>{
            const res1=await fetch(`https://test-api.brightlife.org/brightlife/get/sponsor/kids?sponsor_id=${id}`,{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getdet=await res1.json();
            console.log(getdet);
            console.log(getdet.response.data);
            setPosts(getdet.response.data);
        }
        getDetails();
    },[]);

    const profileClick=()=>
    {
        Router.push({
            pathname:'/My_Profile',
        })
    }

    return(
        <div>
            <div className="container">
                <div className="row bg-black">
                    <div className="col-sm text-light"></div>
                    <div className="col-md-auto text-light">how it works</div>
                    <div className="col-md-auto text-light">donate</div>
                    <button className="col btn btn-secondary" onClick={profileClick}>My Profile</button>
                </div>
            </div>
            <div style={{display:'flex'}}>
                <div>
                    <Side/>
                </div>
                <div style={{marginTop:"100px",width:'1000px',height:'100%',backgroundColor:'white',borderRadius:'10px',boxShadow:'0 8px 6px 3px rgba(0,0,0,0.5)',transition:'3s'}}>
                    <main className={homestyle.main}>
                        <div className={homestyle.grid}>
                            {posts.length>0 && posts.map((item)=>(
                                <div className={homestyle.card}>
                                    <img src={logo} style={{width:'100%',height:'200px'}}/>
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
                                    <button className="btn" style={{color:'green'}}>SPONSER CHILDREN</button>&nbsp;
                                    <a href={`/children/${item.id}`} className="btn btn-secondary btn-sm" style={{color:'red'}}>More Details</a>
                                </div>
                            </div>
                            ))
                        }
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
} 

// export async function getStaticProps(){
//   const res=await fetch("https://test-api.brightlife.org/brightlife/get/sponsor/kids?sponsor_id=3");
//   const users=await res.json();
//   return{
//     props:{
//       users,
//     },
//   }
// }

export default sponser_list;
