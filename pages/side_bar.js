import React from "react";
import style from '../styles/register.module.css';
import Link from 'next/link';
import Router  from "next/router";
const Side=()=>
{
    const sponserClick=()=>
    {
        Router.push({
            pathname:'/sponser_list',
        })
    }
    const profileClick=()=>
    {
        Router.push({
            pathname:'/My_Profile',
        })
    }
    return(
        <div style={{display:'flex'}}>
            <div className={style.side}>
                <div className={style.card}>
                        <img src="" alt="Prathap"></img>
                </div><br/><br/> 
            <div style={{marginLeft:'120px',color:'blue'}}>
                    <button className="btn btn-light" onClick={profileClick}>My Profile</button>
            </div><br/><br/>
                <div style={{marginLeft:'110px',color:'blue'}}>
                        <button className="btn btn-lg btn-light" onClick={sponserClick}>Sponsered Child</button>
                </div>
            </div>
        </div>
    );
}
export default Side;