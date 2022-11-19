import homestyle from '../../styles/Home.module.css';
import { useState,useEffect } from "react";
import logo from "../../public/orphan-kids-.jpg"
import {setLocalData} from "../../utils/storage_service"
import Image from 'next/image'
import { getLocalData } from '../../utils/storage_service';
import Link from 'next/link';
import Pagination from './pagination';
import { getData1 } from '../../utils/data_manage_service';
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
            // console.log(data1)
            // setPerpage(getdet.response.data.slice(0,9));
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
        const result=await(getData1(`https://test-api.brightlife.org/brightlife/get/application/details?page=${pageNumber}&page_size=10`));
        if(result.data?.status)
        {
            console.log("posts is:")
            console.log(result.data?.response?.data);
            setPosts([])
            // console.log("empty:"+posts);
            setPosts(result.data?.response?.data)
            // console.log(posts)
            setData1(result.data?.response?.data)
            // functionPage(result.data?.response?.data);
            // setData1("");
            // setData1(result.data?.response?.data);
            // console.log(data1);
            // const sorted=[...data1].sort((a,b)=>a["id"] > b["id"] ? 1 : -1);
            // functionPage();
            // setData1(sorted)
            // console.log(data1);
            setDisable1(false);
        }
        else{
            alert("Student List Ended");
            // setMessage("No student Data");
            setDisable1(true);
        }
    }
    //console.log("data2 is:")
    //console.log(data1);
    // const functionPage=()=>{
    //    const sorted=[...data1].sort((a,b)=>a["id"] > b["id"] ? 1 : -1);
    //    console.log("data1 is:")
    //    console.log(sorted);
    // }
    const handleSort=()=>{
        const sorted=[...data1].sort((a,b)=>a["id"] > b["id"] ? 1 : -1);
        console.log("Sorting data is:")
        console.log(sorted);
        setData1(sorted);
        props.HandleSort(1);
    }
    // console.log("sorted data is;");
    // console.log(data1)
    // useEffect(()=>{ 
    //     const getDetails1=async()=>{
    //         const res1=await fetch("https://test-api.brightlife.org/brightlife/get/application/details?page_size=100",{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
    //         const getdet=await res1.json();
    //         setPosts1(getdet?.response?.data);
    //         console.log(posts1);
    //         setData1(getdet?.response?.data);
    //         console.log(data1);
    //         const sorted=[...posts1].sort((a,b)=>a["id"] > b["id"] ? 1 : -1);
    //         setData1(sorted)
    //     }
    //     getDetails1();
    // },[]);
    return( 
        <div>
        <button className="btn btn-success" onClick={handleSort}>Sort By Oldest</button>
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
                }<br/>
                {props.count>1 && posts.length>0 && posts.filter(item1=>item1?.gender?.name.toString().includes(gen) || item1?.annual_income?.toString().includes(income) || item1?.state?.toString().includes(state))
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
                } <br/>
                 {props.count==1 && data1.length>0 && data1.map((item)=>(
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
           <div style={{display:'flex'}}>
                {/* {props.count!=1 &&<label style={{marginRight:'10px'}}>Enter Number of children per page here[1-20](optional):</label>}
                {props.count!=1 && <input type="number" onChange={handlePageSize} min="0" max="20"/>} */}
            </div><br/>
             <Pagination pageHandler={pageHandler} disable1={disable1}/>
        </main>
        </div>
    )
}

// export async function getServerSideProps(context){
//     const res=await fetch("https://test-api.brightlife.org/brightlife/get/application/details?page_size=6",{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
//     const users=await res.json();
    
//     return{
//         props:{
//             user:users,
//         },
//     }
// }

export default Child_Card;