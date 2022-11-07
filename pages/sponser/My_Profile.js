import Router from "next/router";
import React, { useEffect } from "react";
import style from '../../styles/register.module.css';
import My_Profile_Child from "./My_Profile_Child";
import { useState } from "react";
import { useRouter } from 'next/router';
import { setLocalData } from "../../utils/storage_service";
import { getLocalData } from "../../utils/storage_service";
const My_Profile=()=>
{
    const router = useRouter()
    const{name,email,pass,role}=router.query;
    const [info,setInfo]=useState([]);
    const [data,setData]=useState({
        fname:{value:name},
        sname:{value:""},
        gmail:{value:email},
        organisation:{value:info?.organisation},
        mobile:{value:info?.mobile},
        how:{value:""},
        address:{value:info?.address},
        city:{value:info?.city},
        state:{value:info?.state},
        country:{value:info?.country},
        pin:{value:info?.postal_code},
    });
    const id=getLocalData("id");
    useEffect(()=>{
        const getprofile=async()=>{
            const res2=await fetch(`https://test-api.brightlife.org/brightlife/get/sponsor/profile?user_id=${id}`,{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getpofiledata=await res2.json();
            // console.log(getpofiledata.response.sponsor);
            console.log(getpofiledata);
            setInfo(getpofiledata.response?.sponsor);
            console.log(getpofiledata.response?.sponsor?.id);
            setLocalData("sponser_id",getpofiledata.response?.sponsor?.id);
        }
        getprofile();
    },[]);
    const handleData=(name,value)=>
    {
        setData({
            ...data,
            [name]:{
                ...value.name,
                value:value,
            }
        })
    }
    const updateProfile=()=>
    {
        const datafinal={
            id:info.id,
            user: {
                id:id,
                name: name,
                email:email,
                role: role
            },
            mobile:data.mobile.value,
            organization: data.organisation.value,
            source: "Turito",
            address:data.address.value,
            city: data.city.value,
            state: data.state.value,
            country:data.country.value,
            postal_code:data.pin.value
        }
       fetch("https://test-api.brightlife.org/brightlife/update/sponsor/profile",{
            method:'POST',
            headers:{
                "Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a",
                'Content-type':'application/json'
            },
            body:JSON.stringify(datafinal)
       })
       .then((response)=>{
            console.log(response);
       })
    }
    const sponserChild=()=>
    {
        Router.push({
            pathname:'/sponser/sponser_list',
        })
    }
    const profileClick=()=>
    {
        Router.push({
            pathname:'/sponser/My_Profile',
        })
    }
    return(
        <div>
            <div className="container">
                <div className="row bg-black">
                    <div className="col-sm text-light"></div>
                    <div className="col-md-auto text-light">how it works</div>
                    <div className="col-md-auto text-light">donate</div>
                    <button className="col-md-auto btn btn-secondary">My Profile</button>
                </div>
            </div>
            <div style={{display:'flex'}}>
                <div className={style.side}>
                    <div className={style.card}>
                            <img src="" alt="Prathap"></img>
                    </div><br/><br/> 
                <div style={{marginLeft:'120px',color:'blue'}}>
                        <button className="btn btn-light" onClick={profileClick}>My Profile</button>
                </div><br/><br/>
                    <div style={{marginLeft:'110px',color:'blue'}}>
                            <button className="btn btn-lg btn-light" onClick={sponserChild}>Sponsered Child</button>
                    </div>
                </div>
                <div style={{marginTop:"100px",width:'1000px',height:'700px',backgroundColor:'white',borderRadius:'10px',boxShadow:'0 8px 6px 3px rgba(0,0,0,0.5)',transition:'3s'}}>
                <form style={{border:'2px solid gray',marginTop:'20px',marginLeft:'20px',marginRight:'20px'}}>
                    <br/>
                    <div className="form-group row">
                        <div className="col-sm-5" style={{marginLeft:'30px',marginRight:'30px'}}>
                            <label>First Name</label><br/>
                            <My_Profile_Child type="text"
                                                name="fname"
                                                placeholder="enter first name"
                                                value={data.fname.value}
                                                handleChange={handleData}
                            />
                        </div>
                        <div className="col-sm-5">
                            <label>Second Name</label><br/>
                            <My_Profile_Child type="text"
                                                name="sname"
                                                value={data.sname.value}
                                                handleChange={handleData}
                            />
                        </div>
                    </div><br/>
                    <div className="form-group row">
                        <div className="col-sm-5" style={{marginLeft:'30px',marginRight:'30px'}}>
                            <label>Organisation</label><br/>
                            <My_Profile_Child type="text"
                                                name="organisation"
                                                value={data.organisation.value}
                                                handleChange={handleData}
                            />
                        </div>
                        <div className="col-sm-5">
                            <label>Email Address</label><br/>
                            <My_Profile_Child type="text"
                                                name="gmail"
                                                value={data.gmail.value}
                                                handleChange={handleData}
                            />
                        </div>
                    </div><br/>
                    <div className="form-group row">
                        <div className="col-sm-5" style={{marginLeft:'30px',marginRight:'30px'}}>
                            <label>Mobile Number</label><br/>
                            <My_Profile_Child type="text"
                                                name="mobile"
                                                value={data.mobile.value}
                                                handleChange={handleData}
                            />
                        </div>
                        <div className="col-sm-5">
                            <label>How did you head about Us?</label><br/>
                            <My_Profile_Child type="text"
                                                name="how"
                                                value={data.how.value}
                                                handleChange={handleData}
                            />
                        </div>
                    </div><br/>
                    <div className="form-group row">
                        <div className="col-sm-5" style={{marginLeft:'30px',marginRight:'30px'}}>
                            <label>Address</label><br/>
                            <My_Profile_Child type="text"
                                                name="address"
                                                value={data.address.value}
                                                handleChange={handleData}
                            />
                        </div>
                        <div className="col-sm-5">
                            <label>city</label><br/>
                            <My_Profile_Child type="text"
                                                name="city"
                                                value={data.city.value}
                                                handleChange={handleData}
                            />
                        </div>
                    </div><br/>
                    <div className="form-group row">
                        <div className="col-sm-5" style={{marginLeft:'30px',marginRight:'30px'}}>
                            <label>state</label><br/>
                            <My_Profile_Child type="text"
                                                name="state"
                                                value={data.state.value}
                                                handleChange={handleData}
                            />
                        </div>
                        <div className="col-sm-5">
                            <label>Country</label><br/>
                            <My_Profile_Child type="text"
                                                name="country"
                                                value={data.country.value}
                                                handleChange={handleData}
                            />
                        </div>
                    </div><br/>
                    <div className="form-group row">
                        <div className="col-sm-5" style={{marginLeft:'30px',marginRight:'30px'}}>
                            <label>Postal Code</label><br/>
                            <My_Profile_Child type="text"
                                                name="pin"
                                                value={data.pin.value}
                                                handleChange={handleData}
                            />
                        </div>
                    </div><br/>
                    <div className="form-group row">
                        
                        <div className="col-sm-11" style={{marginLeft:'30px',marginRight:'30px'}}>
                            <input type="button" className="form-control btn btn-primary" value="save" onClick={updateProfile}/>
                        </div>
                    </div><br/>
                </form>
            </div>
        </div>
        </div>
    )
}

export default My_Profile;