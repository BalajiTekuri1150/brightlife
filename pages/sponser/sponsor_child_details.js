import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getLocalData } from '../../utils/storage_service';
const Sponsor_child_details=(props)=>{
    const sponsor_child_id=getLocalData("sponsor_child")
    // console.log("details",user);
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        const getDetails=async()=>{
            const res1=await fetch(`https://test-api.brightlife.org/brightlife/get/application/details?application_id=${sponsor_child_id}`,{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getdet=await res1.json();
            setPosts(getdet.response?.data[0]);
        }
        getDetails();
    },[]);
    const handleSC=()=>{
        props.handleSC1();
    }
    return(
        <>
          <Head>
              <title>Brightlife</title>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" />
          </Head>
            {/* <div class="row nomar">
            <div className="col-lg-28 col-sm-18">
              <div className="myaccount-right-block">
                <div className="sponsor-breadcums">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><div onClick={handleSC}>Sponsored children</div></li>        
                      <li className="breadcrumb-item active">Child’s Profile</li>
                    </ol>
                  </div>  */}
                {/* <div className="myaccount-content-block"> */}
                  {/* <div className="myaccount-content-inner pad-div">    */}
                    <div className="row">      
                      <div className="col-lg-3">
                        <div className="child-prof-img">
                          <img className="img-fluid" src="/img/child-profile.png" />
                          <div className="kids-id">Kids ID : 12345678</div>
                        </div>
                        <div className="sponsor-cont child-info">
                          <div className="sponsor-justify">
                            <span>
                              <img src="/img/fem-clock.png" />{posts.gender?.name}</span>
                            <span>
                              <img src="/img/time.png" />12 Years Old </span>
                          </div>
                          <div className="sponsor-justify">
                            <span>
                              <img src="/img/date-icon.png" />{posts.birthday}</span>
                            <span>
                              <img src="/img/lang.png" />Telugu </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-9">
                        <div className="child-details">
                          <h4>50$/ Quarterly from April 2017</h4>
                          <p className="child-name">{posts.name}</p>
                          <p className="child-age">12 year girl from Telangana, India</p>
                          <p className="child-des">She lives with her mom and older sister. Her favourite subject is maths, and she enjoys playing with Dogs and going to the beach. He has some special needs requiring extra attention and resources which her mother struggles to afford. Your support will help provide for these extra needs and allow her to stay warm and healthy at home too.</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 more-about">
                        <h4>More about Shalini Kumari</h4>
                        <div className="more-about-content">
                          <div className>
                            <table>
                              <tbody><tr>
                                  <td>Gender :</td>
                                  <th>{posts.gender?.name}</th>
                                </tr>
                                <tr>
                                  <td>Country :</td>
                                  <th>India</th>
                                </tr>
                                <tr>
                                  <td>State :</td>
                                  <th>Telangana</th>
                                </tr>
                                <tr>
                                  <td>Region :</td>
                                  <th>Hyderabad</th>
                                </tr>
                                <tr>
                                  <td>Hobbies :</td>
                                  <th>Playing with dog, and reading</th>
                                </tr>
                                <tr>
                                  <td>Schooling :</td>
                                  <th>FemSharada Vidya Mandir</th>
                                </tr>
                                <tr>
                                  <td>Aspirations:</td>
                                  <th>Wishes to build a home on moon</th>
                                </tr>
                              </tbody></table>
                          </div>
                          <div className>
                            <table>
                              <tbody><tr>
                                  <td>Extra Achievements :</td>
                                  <th>1st Prize in Painting Competition</th>
                                </tr>
                                <tr>
                                  <td>Key Outcome :</td>
                                  <th>Cover basic school needs</th>
                                </tr>
                                <tr>
                                  <td>Family Members :</td>
                                  <th>4</th>
                                </tr>
                                <tr>
                                  <td>Is an :</td>
                                  <th>Orphan</th>
                                </tr>
                                <tr>
                                  <td>Guardians employment:</td>
                                  <th>Father Agriculture / farmer</th>
                                </tr>
                                <tr>
                                  <td>Family income :</td>
                                  <th>{posts?.annual_income}</th>
                                </tr>
                                <tr>
                                  <td>Report Card :</td>
                                  <th><a href>View</a></th>
                                </tr>
                              </tbody></table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 more-about">
                        <h4>Recent School Activities</h4>          
                      </div>
                    </div>
                    <div className="row">
                      <div className=" col-md-12">
                        <div className="recent-activities-main">       
                          <img src="/img/child-profile.png" />
                          <img src="/img/child-profile.png" />
                          <img src="/img/child-profile.png" />
                          <img src="/img/child-profile.png" /> 
                          <img src="/img/child-profile.png" /> 
                          <img src="/img/child-profile.png" /> 
                          <img src="/img/child-profile.png" /> 
                          <img src="/img/child-profile.png" /> 
                          <img src="/img/child-profile.png" /> 
                          <img src="/img/child-profile.png" /> 
                        </div>  
                      </div>
                    </div>
                  {/* </div>
                </div> */}
              {/* </div>
            </div>
            </div> */}
        </>
    )
}

export default Sponsor_child_details;