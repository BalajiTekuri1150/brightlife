import Router from "next/router";
import React, { useEffect } from "react";
import style from '../../styles/register.module.css';
import My_Profile_Child from "./My_Profile_Child";
import Image from 'next/image';
import logo from "../../public/orphan-kids-.jpg"
import { useState } from "react";
import { useRouter } from 'next/router';
import { setLocalData } from "../../utils/storage_service";
import { getLocalData } from "../../utils/storage_service";
import { postData2 } from "../../utils/data_manage_service";
const My_Profile=()=>
{
    const router = useRouter()
    // const{name,email,pass,role}=router.query;
    const [info,setInfo]=useState([]);
    const [uname,setUname]=useState("");
    const name=getLocalData("name");
    const email=getLocalData("email");
    const id=getLocalData("id");
    const role=getLocalData("role");
    const [message,setMessage]=useState("")
    const [data,setData]=useState({
        fname:{value:""},
        sname:{value:""},
        gmail:{value:""},
        organisation:{value:""},
        mobile:{value:""},
        how:{value:""},
        address:{value:""},
        city:{value:""},
        state:{value:""},
        country:{value:""},
        pin:{value:""},
    });
    useEffect(()=>{
        const getprofile=async()=>{
            const res2=await fetch(`https://test-api.brightlife.org/brightlife/get/sponsor/profile?user_id=${id}`,{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getpofiledata=await res2.json();
            console.log(getpofiledata);
            setInfo(getpofiledata.response?.sponsor);
            setData({
                fname:{value:getpofiledata.response?.sponsor?.user?.name},
                sname:{value:""},
                gmail:{value:getpofiledata.response?.sponsor?.user?.email},
                organisation:{value:getpofiledata.response?.sponsor?.organization},
                mobile:{value:getpofiledata.response?.sponsor?.mobile},
                how:{value:""},
                address:{value:getpofiledata.response?.sponsor?.address},
                city:{value:getpofiledata.response?.sponsor?.city},
                state:{value:getpofiledata.response?.sponsor?.state},
                country:{value:getpofiledata.response?.sponsor?.country},
                pin:{value:getpofiledata.response?.sponsor?.postal_code},
            })
            // console.log(getpofiledata.response?.sponsor?.id);
            setUname(getpofiledata.response?.sponsor?.user?.name);
            setLocalData("sponser_id",getpofiledata.response?.sponsor?.id);
        }
        getprofile();
    },[]);

    console.log(uname);
    console.log(info?.user?.id);
    console.log(info?.user?.email);
    // console.log(info?.mobile);
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
    const updateProfile=async()=>
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
        const result=await(postData2("https://test-api.brightlife.org/brightlife/update/sponsor/profile",datafinal))
        if(result?.data?.status==true)
        {
            setMessage("Details Updated Successfully");
        }
        if(result?.data?.status==false)
        {
            setMessage(result?.data?.error?.message?.mobile)
            setMessage(result?.data?.error?.message?.organisation)
        }
    //    fetch("https://test-api.brightlife.org/brightlife/update/sponsor/profile",{
    //         method:'POST',
    //         headers:{
    //             "Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a",
    //             'Content-type':'application/json'
    //         },
    //         body:JSON.stringify(datafinal)
    //    })
    //    .then((response)=>{
    //         console.log(response);
    //    })
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
                            <Image src={logo} alt="Prathap" width="100px" height="70px"/>
                    </div><br/><br/> 
                <div style={{marginLeft:'120px',color:'blue'}}>
                        <button className="btn btn-light" onClick={profileClick}>My Profile</button>
                </div><br/><br/>
                    <div style={{marginLeft:'110px',color:'blue'}}>
                            <button className="btn btn-lg btn-light" onClick={sponserChild}>Sponsered Child</button>
                    </div>
                </div>
                <div style={{marginTop:"70px",width:'1000px',height:'700px',backgroundColor:'white',borderRadius:'10px',boxShadow:'0 8px 6px 3px rgba(0,0,0,0.5)',transition:'3s'}}>
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
                    <div style={{color:'red',marginLeft:'150px'}}>{message}</div><br/>
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