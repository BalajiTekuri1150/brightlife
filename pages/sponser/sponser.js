import React from "react";
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import style from '../../styles/register.module.css';
import Button from 'react-bootstrap/Button';
import Child_Card from "./Child_Card";
import Router from "next/router";
// import Avatar from 'react-avatar';
import logo from '../../public/fb.png';
import { getLocalData } from "../../utils/storage_service";
import { setLocalData } from "../../utils/storage_service";
import { getData1 } from "../../utils/data_manage_service";
const Final=()=>
{
    
    const router = useRouter()
    // const{name,email,pass,role,id}=router.query;
    const [coun,setCoun]=useState([]);
    const [conid,setconId]=useState(' ');
    const [st,setSt]=useState([]);
    const [mon,setMon]=useState(" ");
    const [gen,setGen]=useState("");
    const [state,setState]=useState(" ");
    const [age,setAge]=useState();
    const [region,setRegion]=useState(" ");
    const [income,setIncome]=useState('');
    const [posts,setPosts]=useState([]);
    const [count,setCount]=useState(0);
    const [page,setPage]=useState(6);
    useEffect(()=>{
        const getCountry=async()=>{
            const res=await fetch("https://test-api.brightlife.org/brightlife/list/countries",{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getcon=await res.json();
            console.log(getcon);
            console.log(getcon.response.data);
            setCoun(getcon.response.data);
        }
        getCountry();
    },[]);

    const id1=getLocalData("id");
    
    useEffect(()=>{
        const getprofile=async()=>{
            const res2=await fetch(`https://test-api.brightlife.org/brightlife/get/sponsor/profile?user_id=${id1}`,{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getpofiledata=await res2.json();
            setLocalData("sponser_id",getpofiledata.response?.sponsor?.id);
        }
        getprofile();
    },[]);

    const handleCountry=(e)=>
    {
        const getCountryid=e.target.value;
        // console.log(getCountryid);
        setconId(getCountryid);
    }

    useEffect(()=>{
        const getState=async()=>{
            const resst=await fetch(`https://test-api.brightlife.org/brightlife/get/states/by/country?country_id=${conid}`,{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getst=await resst.json();
            if(getst.response?.data)
            {
                setSt(getst.response.data);
            }
        }
        getState();
    },[conid]);

    const handleMonth=(e)=>
    {
        setMon(e.target.value);
    }
    const handleGender=(e)=>
    {
        setGen(e.target.value);
    }
    const handleAge=(e)=>
    {
        setAge(e.target.value);
    }
    const handleState=(e)=>
    {
        setState(e.target.value);
    }
    const handleRegion=(e)=>
    {
        setRegion(e.target.value);
    }
    const handleIncome=(e)=>
    {
        setIncome(e.target.value);
    }
    const handleProfile=()=>
    {
        Router.push({
            pathname:'/sponser/My_Profile',
        })
    }
    const handleClear=(e)=>
    {
        e.preventDefault()
        setCount(0);
        setState(" ");
        setGen("");
        setAge(" ");
        setIncome(" ");
        setMon(" ");
    }
    const handleSubmit=(e)=>
    {
        e.preventDefault();
        if(count==0)
        {
            setCount(count+2);
        }
        else{
            setCount(count+1);
        }
        setLocalData("state",state);
        setLocalData("mon",mon);
        setLocalData("gen",gen);
        setLocalData("income",income);
    }
    const handleCount=(c)=>
    {
        console.log(c);
        setCount(c);
        setState(" ");
        setGen(" ");
        setAge(" ");
        setIncome(" ");
        setMon(" ");
    }
    return( 
        <div>
            <div className="container">
                <div className="row bg-black">
                <div className="col-sm text-light"></div>
                    <div className="col-sm text-light"></div>
                    <div className="col-sm text-light">how it works</div>
                    <div className="col-sm text-light">donate</div>
                    <button className="col-sm btn btn-secondary" onClick={handleProfile}>My Profile</button>
                </div>
            </div>
            <div style={{backgroundColor:'white',marginLeft:'200px',width:'1000px',height:'300px',marginTop:'100px',borderRadius:'10px'}}>
            <Form>
                <Form.Group><br/>
                    <h3 style={{marginLeft:'10px'}}>Search</h3>
                    <div style={{display:'flex',marginTop:'30px'}}>
                        <Form.Control as="select" style={{width:'300px',marginLeft:'10px',marginRight:'10px'}} onChange={(e)=>handleCountry(e)}>
                            <option value=" ">-----Select Country-----</option>

                            {
                                coun.length>0 &&
                                coun.map((countryget)=>{
                                    return <option key={countryget.id} value={countryget.id}>{countryget.name}</option>
                                })
                            }

                        </Form.Control>
                        <Form.Control as="select" value={mon} className={style.sponser_input} placeholder="Birth Month" onChange={handleMonth}>
                            <option value=" ">SELECT MONTH</option>
                            <option value="JAN">JANUARY</option>
                            <option value="feb">FEBRUARY</option>
                            <option value="mar">MARCH</option>
                            <option value="APR">APRIL</option>
                            <option value="MAY">MAY</option>
                            <option value="JUN">JUNE</option>
                            <option value="JUL">JULY</option>
                            <option value="AUG">AUGUST</option>
                            <option value="SEP">SEPTEMBER</option>
                            <option value="OCT">OCTOBER</option>
                            <option value="NOV">NOVEMBER</option>
                            <option value="DEC">DECEMBER</option>
                        </Form.Control>
                        <Form.Control as="select" value={gen} className={style.sponser_input} onChange={handleGender}>
                            <option value=' '>SELECT GENDER</option>
                            <option value="Male">MALE</option>
                            <option value="Female">FEMALE</option>
                        </Form.Control>
                        <label style={{marginTop:'8px'}}>AGE:</label><Form.Control as="input" className={style.sponser_input} value={age} placeholder="AGE" onChange={handleAge}/>
                    </div>
                </Form.Group><br/>
                <Form.Group>
                    <div style={{display:'flex'}}>
                        <Form.Control as="select" value={state} style={{width:'300px',marginLeft:'10px',marginRight:'10px'}} onChange={handleState}>
                            <option value="">-----SELECT STATE-------</option>
                            {
                                st.length>0 &&
                                st.map((resst)=>{
                                    return <option key={resst.name} value={resst.name}>{resst.name}</option>
                                })
                            }
                        </Form.Control>
                        <Form.Control as="input" className={style.sponser_input} placeholder="REGION" onChange={handleRegion}/>
                        <label style={{marginTop:'8px'}}>INCOME:</label><Form.Control as="input" className={style.sponser_input} placeholder="FAMILY INCOME" value={income} onChange={handleIncome}/>
                    </div>
                </Form.Group><br/>
                <Form.Group style={{marginLeft:'350px'}}>
                    <Button variant="primary" type="submit" style={{marginRight:'50px'}} size="lg" onClick={handleSubmit}>Search</Button>{' '}
                    <Button variant="secondary" type="submit" size="lg" onClick={handleClear}>Clear All</Button>
                </Form.Group>
            </Form><br/><br/>
            {/* <button className="btn btn-success" onClick={handleCount}>Sort By Oldest</button> */}
            <Child_Card count={count} HandleSort={handleCount}/>
            </div>
        </div>
    )
}


export default Final;