import homestyle from '../../styles/Home.module.css';
import { useState,useEffect } from "react";
import logo from "../../public/orphan-kids-.jpg"
import {setLocalData} from "../../utils/storage_service"
import Image from 'next/image'
import { getLocalData } from '../../utils/storage_service';
import Link from 'next/link';
import Pagination from './pagination';
import { getData1 } from '../../utils/data_manage_service';
import img1 from '/public/img/sponsor-child1.jpg';
import img2 from '/public/img/sponsor-child2.jpg'
import img3 from '/public/img/sponsor-child3.jpg'
import img4 from '/public/img/sponsor-child4.jpg'
import img5 from '/public/img/sponsor-child5.jpg'
import img6 from '/public/img/sponsor-child6.jpg'
import Head from 'next/head';
const Child_Card1=(props)=>
{
    let [page,setPage]=useState(1);
    const [data1,setData1]=useState([]);
    // const [order,setOrder]=useState();
    // const [pageSize,setPageSize]=useState(6);
    // const [message,setMessage]=useState("")
    let disable1=false;
    // console.log(props.set_search.length);
    if(props.set_search.length<6){
        // setDisable1(true);
        disable1=true;
    }
    else{
        // setDisable1(false);
        disable1=false;
    }
    // console.log("page for starting:"+page);
    const images=[
        {
            id:1,
            img:img1,
        },
        {
            id:2,
            img:img2,
        },
        {
            id:3,
            img:img3,
        },
        {
            id:4,
            img:img4,
        },
        {
            id:5,
            img:img5,
        },
        {
            id:6,
            img:img6,
        }
    ]
    const handleCard=()=>
    {
        console.log("The page will redirect to payment page");
    }
    const pageHandler=async(pageNumber)=>
    {
        console.log("page number is:"+pageNumber);
        props.handlePageNumber(pageNumber);
        setPage(pageNumber);
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
            {/* <button className="btn btn-success" onClick={handleSort} style={{marginBottom:'10px'}}>Sort By Oldest</button> */}
        </div>
        <div className='row'>

                    {/* Search Filter */}
                    {props.set_search.length>0 && props.set_search.map((item)=>(
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
                                    <a href={`/children/${item.id}`} className="Sponsor-now-btn">Sponsor now</a>
                                    <a href={`/children/${item.id}`}  className="more-details-btn">More details</a>                               
                                </div>
                            </div>
                        </div>
                    ))} 
        </div>
        <div style={{marginLeft:'400px'}}><Pagination pageHandler={pageHandler} disable1={disable1}/></div><br/><br/>
        </>
    )
}

export default Child_Card1;