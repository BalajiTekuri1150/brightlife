import React, { useState } from 'react';
import homestyle from "../../../styles/Home.module.css"
import logo from "../../../public/fb.png";
import Router from 'next/router'
import Image from 'next/image';
import { getLocalData } from '../../../utils/storage_service';
const index=({user})=>
{
    const [money,setMoney]=useState(0);
    const [span,setSpan]=useState("");
    const [message,setMessage]=useState("")
    console.log(user);
    const handleMoney=(e)=>
    {
        setMoney(e.target.value);
        if(e.target.value==="20"){
            setSpan("month")
        }
        else if(e.target.value==="60")
        {
            setSpan("querterly");
        }
        else
            setSpan("anually");
    }
    const handleAmount=(e)=>
    {
        e.preventDefault();
        const id=getLocalData("sponser_id")
        console.log(id);
        console.log(money);
        console.log(span);
        const data1={
                application_id:user.id,
                sponsor_id:id,
                start_date:"2021-08-16",
                status:"current",
                pledge_date:"2022-08-16",
                amount: 500,
                currency_code: "INR",
                billing_period:span,
                type:"application",
        }
        const JSONdata=JSON.stringify(data1);
        fetch("https://test-api.brightlife.org/brightlife/sponsor/child",{
            method:'POST',
            headers:{
                "Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a",
                'Content-Type':'application/json',
            },
            body:JSONdata,
        }).then((response)=>{
            setMessage("Children added to Your Sponser List");
        })
    }
    const profileClick=()=>
    {
        Router.push({
            pathname:'/sponser/My_Profile',
        })
    }
    return(
        <div style={{backgroundColor:'white',width:'100%',height:'100%'}}>
            <div style={{backgroundColor:'black',height:'60px'}}>
                <hr style={{height:'60px',backgroundColor:'white',position:'absolute'}}/>
                    <div style={{display:'flex'}}>
                        <p style={{position:'relative',color:'white',marginLeft:'800px',marginTop:'10px'}}>Our Team</p>
                        <p style={{position:'relative',color:'white',marginLeft:'100px',marginTop:'10px'}}>Our Team</p>
                        <button style={{position:'relative',color:'green',marginLeft:'10px',marginTop:'10px',width:'200px',height:'50px'}} onClick={profileClick}>Profile</button>
                    </div>
            </div>
            <br/>
            <div className='container' style={{backgroundColor:'lightgray',marginTop:'60px',marginLeft:'200px',marginRight:'200px',width:'1000px'}}>
                <br/>
                <div className='row' style={{marginLeft:'10px',display:'flex'}}>
                    <div className='col-sm-4'>
                        <Image src={logo} width="200px" height="200px"/><br/>
                        <label>{user.gender.name}</label><br/><br/>
                        <label>{user.birthday}</label>
                    </div>
                    <div className='col-sm-8' style={{marginLeft:'0px'}}>
                        <h1>{user?.name}</h1>
                        <label>12 year girl from Telangana,India</label><br/>
                        <label>She lives with her Mom and Sister.Her Favourite is Maths,she enjoys playing with the dogs and going to the beach.He Has some special needs requiring extra attention and resources which her mother struggles to afford.</label><br/>
                        <div style={{marginTop:'100px',display:'flex'}}>
                            <select style={{backgroundColor:'none',width:'300px',height:'50px'}} onClick={(e)=>handleMoney(e)}>
                                <option value="0">----Select Money----</option>
                                <option value="20">$20 monthly</option>
                                <option value="60">$60 Querterly</option>
                                <option value="120">$120 Semi-Anually</option>
                            </select>
                            <button className='btn btn-primary' style={{marginLeft:'100px',backgroundColor:'blue',width:'300px',height:'50px'}}>Sponser</button>
                        </div>
                    </div>
                </div>
            </div><br/><br/>
            <h4 style={{marginLeft:'200px'}}>More Info About {user.name}</h4>
            <div className='container' style={{backgroundColor:'white',marginTop:'30px',marginLeft:'200px',marginRight:'200px',width:'1000px',border:'1px solid lightgray'}}>  
                <div className='row' style={{marginLeft:'100px'}}>
                    <div style={{display:'flex'}}>
                        <p style={{marginRight:'250px'}}>Gender:{user.gender.name}</p>
                        <p style={{marginLeft:'235px'}}>Extra Achievements:1st prize in competetion</p>
                    </div>
                </div><br/>
                <div className='row' style={{marginLeft:'100px'}}>
                    <div style={{display:'flex'}}>
                        <p style={{marginRight:'250px'}}>Country:India</p>
                        <p style={{marginLeft:'250px'}}>Key Outcome:Cover basic school needs</p>
                    </div>
                </div><br/>
                <div className='row' style={{marginLeft:'100px'}}>
                    <div style={{display:'flex'}}>
                        <p style={{marginRight:'250px'}}>State:Telangana</p>
                        <p style={{marginLeft:'235px'}}>Family Members:4</p>
                    </div>
                </div><br/>
                <div className='row' style={{marginLeft:'100px'}}>
                    <div style={{display:'flex'}}>
                        <p style={{marginRight:'250px'}}>Region:Hyderabad</p>
                        <p style={{marginLeft:'215px'}}>Is an:Orphan</p>
                    </div>
                </div><br/>
                <div className='row' style={{marginLeft:'100px'}}>
                    <div style={{display:'flex'}}>
                        <p style={{marginRight:'250px'}}>Hobbies:Playing with Dog</p>
                        <p style={{marginLeft:'170px'}}>Guardians employement:Father Agriculture</p>
                    </div>
                </div><br/>
                <div className='row' style={{marginLeft:'100px'}}>
                    <div style={{display:'flex'}}>
                        <p style={{marginRight:'250px'}}>Schooling:Sharada</p>
                        <p style={{marginLeft:'215px'}}>Family Income:{user?.annual_income}</p>
                    </div>
                </div><br/>
                <div className='row' style={{marginLeft:'100px'}}>
                    <div style={{display:'flex'}}>
                        <p style={{marginRight:'250px'}}>Aspirations:Wishes to build a home on moon</p>
                        <p style={{marginLeft:'25px'}}>Report Card:View</p>
                    </div>
                </div><br/>
            </div><br/>
            <div className='container' style={{backgroundColor:'white',marginTop:'60px',marginLeft:'200px',marginRight:'100px',width:'1000px'}}>
                <br/>
                <div className='row' style={{marginLeft:'10px',display:'flex'}}>
                   <div style={{width:'400px'}}>
                        <h1>Select Payment </h1><br/>
                        <b>Type to Sponser her</b><br/>
                        <h3>Select Periodical Sponsership For Child</h3><br/>
                        <div style={{color:'green'}}>{message}</div>
                        <button className='btn btn-primary' style={{backgroundColor:'blue',width:'200px',height:'50px'}} onClick={handleAmount}>Sponser</button>
                   </div>
                   <div>

                   </div>
                </div>
            </div><br/><br/>
        </div>
    );
}


export async function getServerSideProps(context){
const res=await fetch(`https://test-api.brightlife.org/brightlife/get/application/details?application_id=${context.params.id}`,{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
const users=await res.json();

return{
    props:{
        user:users.response.data[0],
    },
}
}

export default index;