import homestyle from '../../styles/Home.module.css';
import { useState,useEffect } from "react";
import logo from "../../public/orphan-kids-.jpg"
import {setLocalData} from "../../utils/storage_service"
import Router, { useRouter } from 'next/router';
import Image from 'next/image'
const search_filter=(props)=>
{
    const router=useRouter();
    const {state,mon,gen,age,income}=router.query;
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        const getDetails=async()=>{
            const res1=await fetch("https://test-api.brightlife.org/brightlife/get/application/details?page_size=6",{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getdet=await res1.json();
            setPosts(getdet.response.data);
        }
        getDetails();
    },[]);
    // console.log(posts);
    const handleCard=()=>
    {
        setLocalData("childid",props.id);
    }
    return(
        <main className={homestyle.main}>
            <div className={homestyle.grid}>
                {posts.filter(item1=>item1?.gender?.name.toString().includes(gen) || item1?.annual_income?.toString().includes(income))
                        .map((item)=>(
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
                                <a href={`/children/${item.id}`} className="btn btn-primary btn-sm" onClick={handleCard}>SPONSER CHILDREN</a>&nbsp;
                                <a href={`/children/${item.id}`} className="btn btn-secondary btn-sm" onClick={handleCard}>More Details</a>
                            </div>
                        </div>
                    ))
                } 
            </div>
        </main>
    )
}


export default search_filter;