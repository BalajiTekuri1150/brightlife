import React, { useState } from 'react';
import homestyle from "../../../styles/Home.module.css"
import logo from "../../../public/orphan-kids-.jpg"
import Router from 'next/router'
import Image from 'next/image';
import { getLocalData } from '../../../utils/storage_service';
import Head from 'next/head';
import Script from 'next/script';
const index=({user})=>
{
    const [money,setMoney]=useState(0);
    const [span,setSpan]=useState("");
    const [message,setMessage]=useState("")
    console.log(user);
    const handleMoney=(e)=>
    {
        console.log(e.target.value);
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
        <div>
            <Head>
            <title>Brightlife</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.8/slick.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.8/slick-theme.min.css" />
            </Head>
            <div>
        {/* header start */}
        <header>
          <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between solid">
            <div className="custom-container border_bottom">
              <div>
                <a className="navbar-toggler" type="button" onclick="toggleSidebar()">
                  <i className="fa fa-bars" aria-hidden="true" />
                </a>
                <a className="navbar-brand" href="index.html">
                  <img className="logo" src="/img/logo.png" alt="Brightlife" />
                </a>
              </div>
              <div className=" navbar-collapse " id="mobilesidemenu">
                <ul className="navbar-nav mr-auto ">
                  <li className="nav-item ">
                    <a className="nav-link" href="/home_files/our_team"> Our Team</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/home/how_works"> How it works </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="/home_files/donate">
                      <button className="btn signin-button" type="submit">
                        <span className="Donate"> Donate </span>
                      </button>
                    </a>
                  </li>
                  <li className="nav-item user-image dropdown">
                    <a className="nav-link " href>
                      <img className="user-image-header" src="/img/user.png" />Andrew <i className="fa fa-angle-down" aria-hidden="true" />
                    </a>
                    <ul className="dropdown-nav">
                        <li onClick={profileClick} style={{color:'black'}}>
                          <img src="/img/user.svg"/>My profile
                        </li>
                      {/* <a href="#">
                        <li>
                          <img src="/img/sponsored.svg" />Sponsored children
                        </li>
                      </a> */}
                      <a href="#">
                        <li>
                          <img src="/img/signout.svg" />Sign out
                        </li>
                      </a>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div id="sidebaroverlay-id" onclick="outsideclick()" />
        <div className="page_start_warpper">
          <section className="child-detail-start">
            <div className="custom-container">
              <div className="row">      
                <div className="col-lg-3">
                  <div className="child-prof-img">
                    <img className="img-fluid" src="/img/child-profile.png" />
                    <div className="kids-id">Kids ID : 12345678</div>
                  </div>
                  <div className="sponsor-cont child-info">
                    <div className="sponsor-justify">
                      <span>
                        <img src="/img/fem-clock.png" />{user.gender.name}</span>
                      <span>
                        <img src="/img/time.png" />12 Years Old </span>
                    </div>
                    <div className="sponsor-justify">
                      <span>
                        <img src="/img/date-icon.png" />{user.birthday}</span>
                      <span>
                        <img src="/img/lang.png" />Telugu </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 child-detail-content">
                  <div className="child-details">
                    <div className="days-waiting">
                      <span>Days waiting: 123</span>
                    </div>                       
                    <p className="child-name">{user.name}</p>
                    <p className="child-age">12 year girl from Telangana, India</p>
                    <p className="child-des">She lives with her mom and older sister. Her favourite subject is maths, and she enjoys playing with Dogs and going to the beach. He has some special needs requiring extra attention and resources which her mother struggles to afford. Your support will help provide for these extra needs and allow her to stay warm and healthy at home too.</p>
                    <div className="child-detail-btns">
                      <div>
                        <select className="form-control" onClick={(e)=>handleMoney(e)}>
                          <option value="10">$10 Monthly</option>
                          <option value="20">$20 Monthly</option>
                          <option value="30">$30 Monthly</option>
                        </select>
                      </div>
                      <div className="sponor-name-btn" onClick={handleAmount}>
                        Sponsor {user.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 more-about">
                  <h4>More about {user.name}</h4>
                  <div className="more-about-content">
                    <div className>
                      <table>
                        <tbody><tr>
                            <td>Gender :</td>
                            <th>{user.gender.name}</th>
                          </tr>
                          <tr>
                            <td>Country :</td>
                            <th>{user.country}</th>
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
                            <th>{user?.annual_income}</th>
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
              <div className="row select-payemnt-stat">
                <div className="col-lg-5">
                  <div className="select-pay-title">
                    <span>Select payment</span><br /> type to sponsor her
                  </div>
                  <p>Select periodical sponsorship for child</p>
                  <div style={{color:'green'}}>{message}</div>
                  <div className="sponor-name-btn" onClick={handleAmount}>
                    Sponsor {user.name}
                  </div>
                </div>
                <div className="col-lg-4">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <div className="form-check" onClick={(e)=>handleMoney(e)}>
                        <input className="form-check-input" type="radio" name="payment" id="payment1" Value="20" defaultChecked />
                        <label className="form-check-label" htmlFor="payment1">
                          $20 Monthly
                        </label>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="form-check" onClick={(e)=>handleMoney(e)}>
                        <input className="form-check-input" type="radio" name="payment" id="payment2" defaultValue="60" />
                        <label className="form-check-label" htmlFor="payment2">
                          $60 Quarterly
                        </label>
                      </div>
                    </li>
                    <li className="list-group-item" onClick={(e)=>handleMoney(e)}>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="payment" id="payment3" defaultValue="120" />
                        <label className="form-check-label" htmlFor="payment3">
                          $120 Semi-Annually
                        </label>
                      </div>
                    </li>
                    <li className="list-group-item" onClick={(e)=>handleMoney(e)}>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="payment" id="payment4" defaultValue="240" />
                        <label className="form-check-label" htmlFor="payment4">
                          $240 Annually
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="sponsorship-section">                    
                  <div className="spons-leftcard">
                    <div className="spons-title">How does child <span>Sponsorship work?</span></div>
                    <p>Your $240 Annually contribute gives Vikram Kumar access to life-changing benefits, like:</p>
                    <ul>
                      <li>Educational support</li>
                      <li>Life skills</li>
                      <li>Job-training before graduation.</li>                            
                    </ul>
                    <h4>When you sponsor, what do you receive?</h4>
                    <ul>
                      <li>Receive updates about your child on a regular basis</li>
                      <li>Be able to exchange letters and photos with your sponsored child</li>
                      <li>Be able to visit your child any time.</li>                            
                    </ul>
                  </div> 
                </div>
                <div className="commitments col-lg-8 ">
                  <p>No commitments (except from us). When you give monthly, you can cancel anytime.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <footer id="footer">
          <div className="footer-top">
            <div className="custom-container">
              <div className="row">
                <div className="col-lg-3 col-md-6 footer-contact">
                  <a href="index.html">
                    <img className="logo" src="/img/logo.png" alt="Brightlife" />
                  </a>
                  <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>
                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>OUR SERVICES</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Services</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Terms of service</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Privacy policy</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>QUICK LINKS</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Web Design</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Web Development</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Product Management</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Marketing</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Graphic Design</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>GET IN TOUCH</h4>
                  <div>Lorem ipsum Lorem ipsum Lorem ipsum 19801</div>
                  <div>Email: Lorem ipsum@gmail.com</div>
                  <div>Phone: +00 000 000 1234</div>
                  <div className="social-links mt-3">
                    <a href="#" className>
                      <i className="fa fa-skype" aria-hidden="true" />
                    </a>
                    <a href="#" className>
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                    <a href="#" className>
                      <i className="fa fa-whatsapp" aria-hidden="true" />
                    </a>
                    <a href="#" className>
                      <i className="fa fa-vimeo" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="custom-container footer-bottom clearfix">
            <div className="copyright">© 2019 brightlife.com </div>
            <div className="credits">
              <a href>FAQ’s</a>
              <a href>Deposit</a>
            </div>
          </div>
        </footer>

        <Script src="js/jquery.slim.min.js"></Script>
        <Script src="js/popper.min.js"></Script>
        <Script src="js/bootstrap.bundle.min.js"></Script>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.8/slick.min.js"></Script>
        <Script src="js/custom.js"></Script>
      </div>
        </div>
        // <div style={{backgroundColor:'white',width:'100%',height:'100%'}}>
        //     <div style={{backgroundColor:'black',height:'60px'}}>
        //         <hr style={{height:'60px',backgroundColor:'white',position:'absolute'}}/>
        //             <div style={{display:'flex'}}>
        //                 <p style={{position:'relative',color:'white',marginLeft:'800px',marginTop:'10px'}}>Our Team</p>
        //                 <p style={{position:'relative',color:'white',marginLeft:'100px',marginTop:'10px'}}>Our Team</p>
        //                 <button style={{position:'relative',color:'green',marginLeft:'10px',marginTop:'10px',width:'200px',height:'50px'}} onClick={profileClick}>Profile</button>
        //             </div>
        //     </div>
        //     <br/>
        //     <div className='container' style={{backgroundColor:'lightgray',marginTop:'60px',marginLeft:'200px',marginRight:'200px',width:'1000px'}}>
        //         <br/>
        //         <div className='row' style={{marginLeft:'10px',display:'flex'}}>
        //             <div className='col-sm-4'>
        //                 <Image src={logo} width="200px" height="200px"/><br/>
        //                 <label>{user.gender.name}</label><br/><br/>
        //                 <label>{user.birthday}</label>
        //             </div>
        //             <div className='col-sm-8' style={{marginLeft:'0px'}}>
        //                 <h1>{user?.name}</h1>
        //                 <label>12 year girl from Telangana,India</label><br/>
        //                 <label>She lives with her Mom and Sister.Her Favourite is Maths,she enjoys playing with the dogs and going to the beach.He Has some special needs requiring extra attention and resources which her mother struggles to afford.</label><br/>
        //                 <div style={{marginTop:'100px',display:'flex'}}>
        //                     <select style={{backgroundColor:'none',width:'300px',height:'50px'}} onClick={(e)=>handleMoney(e)}>
        //                         <option value="0">----Select Money----</option>
        //                         <option value="20">$20 monthly</option>
        //                         <option value="60">$60 Querterly</option>
        //                         <option value="120">$120 Semi-Anually</option>
        //                     </select>
        //                     <button className='btn btn-primary' style={{marginLeft:'100px',backgroundColor:'blue',width:'300px',height:'50px'}}>Sponser</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div><br/><br/>
        //     <h4 style={{marginLeft:'200px'}}>More Info About {user.name}</h4>
        //     <div className='container' style={{backgroundColor:'white',marginTop:'30px',marginLeft:'200px',marginRight:'200px',width:'1000px',border:'1px solid lightgray'}}>  
        //         <div className='row' style={{marginLeft:'100px'}}>
        //             <div style={{display:'flex'}}>
        //                 <p style={{marginRight:'250px'}}>Gender:{user.gender.name}</p>
        //                 <p style={{marginLeft:'235px'}}>Extra Achievements:1st prize in competetion</p>
        //             </div>
        //         </div><br/>
        //         <div className='row' style={{marginLeft:'100px'}}>
        //             <div style={{display:'flex'}}>
        //                 <p style={{marginRight:'250px'}}>Country:India</p>
        //                 <p style={{marginLeft:'250px'}}>Key Outcome:Cover basic school needs</p>
        //             </div>
        //         </div><br/>
        //         <div className='row' style={{marginLeft:'100px'}}>
        //             <div style={{display:'flex'}}>
        //                 <p style={{marginRight:'250px'}}>State:Telangana</p>
        //                 <p style={{marginLeft:'235px'}}>Family Members:4</p>
        //             </div>
        //         </div><br/>
        //         <div className='row' style={{marginLeft:'100px'}}>
        //             <div style={{display:'flex'}}>
        //                 <p style={{marginRight:'250px'}}>Region:Hyderabad</p>
        //                 <p style={{marginLeft:'215px'}}>Is an:Orphan</p>
        //             </div>
        //         </div><br/>
        //         <div className='row' style={{marginLeft:'100px'}}>
        //             <div style={{display:'flex'}}>
        //                 <p style={{marginRight:'250px'}}>Hobbies:Playing with Dog</p>
        //                 <p style={{marginLeft:'170px'}}>Guardians employement:Father Agriculture</p>
        //             </div>
        //         </div><br/>
        //         <div className='row' style={{marginLeft:'100px'}}>
        //             <div style={{display:'flex'}}>
        //                 <p style={{marginRight:'250px'}}>Schooling:Sharada</p>
        //                 <p style={{marginLeft:'215px'}}>Family Income:{user?.annual_income}</p>
        //             </div>
        //         </div><br/>
        //         <div className='row' style={{marginLeft:'100px'}}>
        //             <div style={{display:'flex'}}>
        //                 <p style={{marginRight:'250px'}}>Aspirations:Wishes to build a home on moon</p>
        //                 <p style={{marginLeft:'25px'}}>Report Card:View</p>
        //             </div>
        //         </div><br/>
        //     </div><br/>
        //     <div className='container' style={{backgroundColor:'white',marginTop:'60px',marginLeft:'200px',marginRight:'100px',width:'1000px'}}>
        //         <br/>
        //         <div className='row' style={{marginLeft:'10px',display:'flex'}}>
        //            <div style={{width:'400px'}}>
        //                 <h1>Select Payment </h1><br/>
        //                 <b>Type to Sponser her</b><br/>
        //                 <h3>Select Periodical Sponsership For Child</h3><br/>
        //                 <div style={{color:'green'}}>{message}</div>
        //                 <button className='btn btn-primary' style={{backgroundColor:'blue',width:'200px',height:'50px'}} onClick={handleAmount}>Sponser</button>
        //            </div>
        //            <div>

        //            </div>
        //         </div>
        //     </div><br/><br/>
        // </div>
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