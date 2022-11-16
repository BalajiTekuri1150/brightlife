import homestyle from '../../styles/Home.module.css';
import { useState,useEffect } from "react";
import logo from "../../public/orphan-kids-.jpg"
import {setLocalData} from "../../utils/storage_service"
import Image from 'next/image'
import { getLocalData } from '../../utils/storage_service';
import Link from 'next/link';
const Child_Card=(props)=>
{
    const [posts,setPosts]=useState([]);
    const [posts1,setPosts1]=useState([]);
    const [data,setData]=useState([]);
    const [data1,setData1]=useState([]);
    const [order,setOrder]=useState();
    useEffect(()=>{
        const getDetails=async()=>{
            const res1=await fetch("https://test-api.brightlife.org/brightlife/get/application/details?page_size=100",{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getdet=await res1.json();
            setPosts(getdet.response.data);
            setData(getdet.response.data)
        }
        getDetails();
    },[]);
    // useEffect(()=>{
    //     const getDetails1=async()=>{
    //         const res1=await fetch("https://test-api.brightlife.org/brightlife/get/application/details?page_size=100",{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
    //         const getdet=await res1.json();
    //         setPosts1(getdet?.response?.data);
    //         console.log(posts1);
    //         setData1(getdet?.response?.data);
    //         console.log(data1);
    //         const sorted=[...data1].sort((a,b)=>a["id"] > b["id"] ? 1 : -1);
    //         // console.log(sorted)
    //         setData(sorted)
    //     }
    //     getDetails1();
    // },[]);
    const gen=getLocalData("gen");
    const income=getLocalData("income");
    const state=getLocalData("state");
    const handleCard=()=>
    {
        console.log("The page will redirect to payment page");
        // setLocalData("childid",props.id);
    }
    return(
        <main className={homestyle.main}>
            <div className={homestyle.grid}>
                {props.count==0 && posts.length>0 && posts.map((item)=>(
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
                                <button className="btn btn-primary btn-sm"><Link href={`/children/${item.id}`}><label style={{color:'white'}}>SPONSER CHILDREN</label></Link></button>&nbsp;
                                <button className="btn btn-secondary btn-sm"><Link href={`/children/${item.id}`}><label style={{color:'white'}}>More Details</label></Link></button>
                            </div>
                        </div>
                    ))
                }
                {props.count>0 && posts.length>0 && posts.filter(item1=>item1?.gender?.name.toString().includes(gen) || item1?.annual_income?.toString().includes(income) || item1?.state?.toString().includes(state))
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
                                <button className="btn btn-success btn-sm"><Link href={`/children/${item.id}`}><label style={{color:'white'}}>SPONSER CHILDREN</label></Link></button>&nbsp;
                                <button className="btn btn-secondary btn-sm"><Link href={`/children/${item.id}`}><label style={{color:'white'}}>More Details</label></Link></button>
                            </div>
                        </div>
                    ))
                } 
                {/* {props.count==2 && data.length>0 && data.map((item)=>(
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
                } */}
            </div>
        </main>
    )
}
export async function getStaticProps(){
    const res=await fetch(`https://test-api.brightlife.org/brightlife/get/application/details?page=${props.page}`)
    const posts2=await res.json();
    return{
        props:{
            posts2,
        }
    }
}

export default Child_Card;