import homestyle from '../../styles/Home.module.css';
import { useState,useEffect } from "react";
import logo from "../../public/orphan-kids-.jpg"
import {setLocalData} from "../../utils/storage_service"
import Image from 'next/image'
import { getLocalData } from '../../utils/storage_service';
import Link from 'next/link';
import Pagination from './pagination';
import { getData1 } from '../../utils/data_manage_service';
import Head from 'next/head';
const Child_Card=(props)=>
{
    const [posts,setPosts]=useState([]);
    const [posts1,setPosts1]=useState([]);
    const [data,setData]=useState([]);
    const [perPage,setPerpage]=useState([]);
    let [page,setPage]=useState(1);
    const [data1,setData1]=useState([]);
    const [order,setOrder]=useState();
    const [disable1,setDisable1]=useState(false);
    const [pageSize,setPageSize]=useState(6);
    const [message,setMessage]=useState("")
    // console.log("page for starting:"+page);
    useEffect(()=>{
        const getDetails=async()=>{
            const res1=await fetch(`https://test-api.brightlife.org/brightlife/get/application/details?page=${page}&page_size=6`,{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getdet=await res1.json();
            setPosts(getdet.response?.data);
            // console.log("Intial posts:"+posts)
            setData1(getdet.response?.data)
            // console.log(data1)
            const sorted=[...posts].sort((a,b)=>a["id"] > b["id"] ? 1 : -1);
            setData1(sorted)
        }
        getDetails();
    },[]);
    
    const gen=getLocalData("gen");
    const income=getLocalData("income");
    const state=getLocalData("state");
    const handleCard=()=>
    {
        console.log("The page will redirect to payment page");
    }
    // const handlePageSize=(e)=>
    // {
    //     console.log(e.target.value);
    //     setPage(e.target.value);
    // }
    const pageHandler=async(pageNumber)=>
    {
        console.log("page number is:"+pageNumber);
        setPage(pageNumber);
        const result=await(getData1(`https://test-api.brightlife.org/brightlife/get/application/details?page=${pageNumber}&page_size=6`));
        if(result.data?.status)
        {
            console.log("posts is:")
            console.log(result.data?.response?.data);
            setPosts([])
            // console.log("empty:"+posts);
            setPosts(result.data?.response?.data)
            // console.log(posts)
            setData1(result.data?.response?.data)
            setDisable1(false);
        }
        else{
            alert("Student List Ended");
            // setMessage("No student Data");
            setDisable1(true);
        }
    }

    const handleSort=()=>{
        const sorted=[...data1].sort((a,b)=>a["id"] > b["id"] ? 1 : -1);
        console.log("Sorting data is:")
        console.log(sorted);
        setData1(sorted);
        props.HandleSort();
    }
    return( 
        <>
        <Head>
            <title>Brightlife</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.8/slick-theme.min.css" />
        </Head>
        <div>
            <button className="btn btn-success" onClick={handleSort} style={{marginBottom:'10px'}}>Sort By Oldest</button>
        </div>
        <div className='row'>
                {props.count==0 && posts.length>0 && posts.map((item)=>(
                        <div className="col-lg-4 col-sm-12 col-md-6">
                            <div className="block-shadow">
                                <div><img src="/img/sponsor-child1.jpg" className="img-fluid"/></div>
                                    <div className="sponsor-block-content">
                                    <p>20$/Monthly since Jan 2016</p>
                                    <h4>{item.name}</h4>
                                    <div>
                                        <div className="sponsor-justify"><span><img src="/img/fem-clock.png"/>{item.gender.name}</span><span><img src="/img/time.png"/>12 Years Old</span></div>
                                        <div className="sponsor-justify"><span><img src="/img/date-icon.png"/>{item.birthday}</span> <span><img src="/img/lang.png"/>Telugu</span></div>
                                    </div>
                        
                                    <p>Vishwa Prasad is from India lives with parents, Enjoys Playing with dolls, Playing with friends, Running</p>
                                </div>
                                <div className="d-flex">
                                    <a href={`/children/${item.id}`} class="Sponsor-now-btn">Sponsor now</a>
                                    <a href={`/children/${item.id}`}  class="more-details-btn">More details</a>                               
                                </div>
                          </div>      
                        </div>
                    ))}

                    {/* Search Filter */}
                    {props.count>1 && posts.length>0 && posts.filter(item1=>item1?.gender?.name.toString().includes(gen) || item1?.annual_income?.toString().includes(income) || item1?.state?.toString().includes(state))
                    .map((item)=>(
                        <div className="col-lg-4 col-sm-12 col-md-6">
                            <div className="block-shadow">
                                <div>
                                    <img src="/img/sponsor-child1.jpg" className="img-fluid"/>
                                </div>
                                <div className="sponsor-block-content">
                                    <p>20$/Monthly since Jan 2016</p>
                                    <h4>{item.name}</h4>
                                    <div>
                                        <div className="sponsor-justify"><span><img src="/img/fem-clock.png"/>{item.gender.name}</span><span><img src="/img/time.png"/>12 Years Old</span></div>
                                        <div className="sponsor-justify"><span><img src="/img/date-icon.png"/>{item.birthday}</span> <span><img src="/img/lang.png"/>Telugu</span></div>
                                    </div>
                        
                                    <p>Vishwa Prasad is from India lives with parents, Enjoys Playing with dolls, Playing with friends, Running</p>
                                </div>
                                <div className="d-flex">
                                    <a href={`/children/${item.id}`} class="Sponsor-now-btn">Sponsor now</a>
                                    <a href={`/children/${item.id}`}  class="more-details-btn">More details</a>                               
                                </div>
                            </div>
                        </div>
                    ))} 

                    {/* Sort By Oldest */}
                    {props.count==1 && data1.length>0 && data1.map((item)=>(
                        <div className="col-lg-4 col-sm-12 col-md-6">
                            <div className="block-shadow">
                                <div>
                                    <img src="/img/sponsor-child1.jpg" className="img-fluid"/>
                                </div>
                                <div className="sponsor-block-content">
                                    <p>20$/Monthly since Jan 2016</p>
                                    <h4>{item.name}</h4>
                                    <div>
                                        <div className="sponsor-justify"><span><img src="/img/fem-clock.png"/>{item.gender.name}</span><span><img src="/img/time.png"/>12 Years Old</span></div>
                                        <div className="sponsor-justify"><span><img src="/img/date-icon.png"/>{item.birthday}</span> <span><img src="/img/lang.png"/>Telugu</span></div>
                                    </div>
                        
                                    <p>Vishwa Prasad is from India lives with parents, Enjoys Playing with dolls, Playing with friends, Running</p>
                                </div>
                                <div className="d-flex">
                                    <a href={`/children/${item.id}`} class="Sponsor-now-btn">Sponsor now</a>
                                    <a href={`/children/${item.id}`}  class="more-details-btn">More details</a>                               
                                </div>
                            </div>  
                        </div>
                ))}
               
        </div>
        <div style={{marginLeft:'400px'}}><Pagination pageHandler={pageHandler} disable1={disable1}/></div><br/><br/>
        </>
    )
}

export default Child_Card;