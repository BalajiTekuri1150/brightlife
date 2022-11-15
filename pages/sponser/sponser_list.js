import React from 'react';
import { getLocalData } from '../../utils/storage_service';
import Side from './side_bar';
import homestyle from '../../styles/Home.module.css';
import { useState,useEffect } from 'react';
import logo from "../../public/orphan-kids-.jpg"
import Image from 'next/image'
import Router from 'next/router';
import { getData } from '../../utils/data_manage_service';
const Sponser_list=()=>
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
    return(
        <div>
            <div style={{display:'flex'}}>
                {/* <div>
                    <Side/>
                </div> */}
                <div style={{marginTop:"70px",width:'800px',height:'100%',backgroundColor:'white',borderRadius:'10px',boxShadow:'0 8px 6px 3px rgba(0,0,0,0.5)',transition:'3s'}}>
                    <button className="btn btn-primary" style={{marginLeft:'700px',marginTop:'10px'}} onClick={handleKidsList}>Kids List</button>
                    <main className={homestyle.main}>
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
                    </main>
                </div>
            </div>
        </div>
    )
} 
export default Sponser_list;
