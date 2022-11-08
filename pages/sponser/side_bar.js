import React from "react";
import style from '../../styles/register.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logo from "../../public/orphan-kids-.jpg"
import Router  from "next/router";
const Side=()=>
{
    const sponserClick=()=>
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
        <div style={{display:'flex'}}>
            <div className={style.side}>
                <div className={style.card}>
                    <Image src={logo} alt="Prathap" width="100px" height="70px"/>
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