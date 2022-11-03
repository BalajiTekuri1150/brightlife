import homestyle from '../../styles/Home.module.css';
import { useState,useEffect } from "react";
import logo from "../../public/fb.png"
import {setLocalData} from "../../utils/storage_service"
const Child_Card=(props)=>
{
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        const getDetails=async()=>{
            const res1=await fetch("https://test-api.brightlife.org/brightlife/get/application/details?page_size=6",{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getdet=await res1.json();
            setPosts(getdet.response.data);
        }
        getDetails();
    },[]);

    const handleCard=()=>
    {
        setLocalData("childid",props.id);
    }
    return(
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


export default Child_Card;