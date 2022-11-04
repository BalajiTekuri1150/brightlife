import React from "react";
import homestyle from '../../styles/Home.module.css';
import { useState,useEffect } from "react";
import logo from "../../assets/images/fb.png"
import Link from "next/link";
import { getData } from "../../utils/data_manage_service";
const Child_Card=()=>
{
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        const getDetails=async()=>{
            const result=await getData("https://test-api.brightlife.org/brightlife/get/application/details?page_size=6");
            setPosts(result.data.response.data);
        }
        getDetails();
    },[]);
    return(
        <div className="wrapper" >
            <nav className="navbar fixed-top navbar-expand-lg" style={{"backgroundColor":" #00004d"}}>
                <p className="navbar-brand text-light m-2 px-5">Logo</p>
            </nav>
            <div className="row h-100 mt-5">
                <div className="border border-dark bg-white mt-5" style={{"width":"350px","height":"1000px"}}>
                    <ul className=" col-2 sidebar-menu">
                        <Link href="/components/gaurdian_profile"><p className="text-dark m-5 pe-auto">Myprofile</p></Link>
                        <Link href="/components/gaurdian_dashboard"><p className="text-dark m-5">Applications</p></Link>
                    </ul>
                </div>
                <div className="bg-white mt-5" style={{"width":"1100px","height":"1000px"}}>
                    {/* <section className="content-header m-5">Ribbon</section> */}
                    <Link href="/components/kids_Details"><button className="btn btn-primary ">New Application</button></Link>
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
                                        <Link href={`/child/${item.id}`} className="btn btn-primary btn-sm" >SPONSER CHILDREN</Link>
                                        <Link href={`/components/child/${item.id}`} className="btn btn-secondary btn-sm">More Details</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
export default Child_Card;