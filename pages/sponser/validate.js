import React from 'react';
import {useState,useEffect} from 'react'
import homestyle from '../../styles/Home.module.css';
import logo from "../../public/orphan-kids-.jpg"
import {setLocalData} from "../../utils/storage_service"
import Image from 'next/image'
import { getLocalData } from '../../utils/storage_service';
const Validate=()=>
{
    const [posts,setPosts]=useState([]);
    const [data,setData]=useState([]);
    const [order,setOrder]=useState();
    useEffect(()=>{
        const getDetails=async()=>{
            const res1=await fetch("https://test-api.brightlife.org/brightlife/get/application/details?page_size=6",{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getdet=await res1.json();
            setPosts(getdet.response.data);
            console.log(posts);
            setData(getdet.response.data);
            console.log(data);
            const sorted=[...data].sort((a,b)=>a["name"].toLowerCase()>b["name"].toLowerCase() ? 1 : -1);
            console.log(sorted)
            setData(sorted)
        }
        getDetails();
    },[]);
    const sorting=()=>
    {
        const sorted=data.sort((a,b)=>a["name"].toLowerCase()>b["name"].toLowerCase ? 1 : -1);
        console.log(sorted)
        setData(sorted)
        console.log(data);
    }
    return(
        <div>  
             <main className={homestyle.main}>
                <div className={homestyle.grid}>
                {data.length>0 && data.map((item)=>(
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
                                <a href={`/children/${item.id}`} className="btn btn-primary btn-sm">SPONSER CHILDREN</a>&nbsp;
                                <a href={`/children/${item.id}`} className="btn btn-secondary btn-sm">More Details</a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </main>
        </div>
    )
}
export default Validate;