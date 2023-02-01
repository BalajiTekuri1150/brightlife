import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link'
import { useContext ,useEffect,useState} from 'react';
import { store } from '../_app';
import { getLocalData } from '../../utils/storage_service';
import Router from 'next/router';
const Apply_Sponsorship=()=>{
    const {datas,setDatas}=useContext(store);
    const [name,setName]=useState("");
    useEffect(()=>{
        if(typeof window!=='undefined'){
            setName(localStorage.getItem('name'));
         }
      },[])
    let role_check=getLocalData("role_check");
    console.log(role_check)
    const handleLogout=()=>
    {
      console.log("Hello")
      localStorage.clear();
      localStorage.removeItem("profile");
      Router.push({
        pathname:'/',
      })
    }
    return(
        <>
            <Head>
                <title>Brightlife</title>
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
                    <a className="navbar-brand" href="/">
                    <img className="logo" src="/img/logo.png" alt="Brightlife" />
                    </a>
                </div>
                <div className=" navbar-collapse " id="mobilesidemenu">
                    <ul className="navbar-nav mr-auto ">
                    <li className="nav-item ">
                        <Link className="nav-link" href="/home_files/our_team"> Our Team</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/home_files/how_works"> How it works </Link>
                    </li>
                    {role_check==="guardian" && <>
                        {datas!=="undefined" ?<>
                            <li className="nav-item user-image dropdown">
                                <a className="nav-link " href>
                                <img className="user-image-header" src={datas} />{name}<i className="fa fa-angle-down" aria-hidden="true" />
                                </a>
                                <ul className="dropdown-nav">
                                <a href="/gaurdian/gaurdian_dashboard">
                                    <li>
                                    <img src="/img/user.svg" />My profile
                                    </li>
                                </a>
                                <a href="#">
                                    <li>
                                    <img src="/img/sponsored.svg" />Sponsored children
                                    </li>
                                </a>
                                <a onClick={handleLogout}>
                                    <li style={{color:'black'}}>
                                    <img src="/img/signout.svg" />Sign out
                                    </li>
                                </a>
                                </ul>
                            </li>
                            </>:
                            <>
                            <li className="nav-item user-image dropdown">
                                <a className="nav-link " href>
                                  <img className="user-image-header" src="/img/profile.png" />{name}<i className="fa fa-angle-down" aria-hidden="true" />
                                </a>
                                <ul className="dropdown-nav">
                                  <Link href="/gaurdian/gaurdian_dashboard">
                                    <li>
                                      <img src="/img/user.svg" /><span style={{color:'black'}}>My profile</span>
                                    </li>
                                  </Link>
                                  <Link href="/gaurdian/gaurdian_dashboard">
                                    <li>
                                      <img src="/img/sponsored.svg" /><span style={{color:'black'}}>Sponsored children</span>
                                    </li>
                                  </Link>
                                  <a onClick={handleLogout} >
                                    <li>
                                      <img src="/img/signout.svg"/><span style={{color:'black'}}>Sign out</span>
                                    </li>
                                  </a>
                                </ul>
                            </li>
                          </>
                        }
                        </>
                   }
                  {role_check==="sponsor" && <>
                    {datas!=="undefined" ?<>
                      <li className="nav-item user-image dropdown">
                        <a className="nav-link " href>
                          <img className="user-image-header" src={datas} />{name}<i className="fa fa-angle-down" aria-hidden="true" />
                        </a>
                        <ul className="dropdown-nav">
                          <a href="/sponser/my_profile1">
                            <li>
                              <img src="/img/user.svg" />My profile
                            </li>
                          </a>
                          <a href="/sponser/my_profile1">
                            <li>
                              <img src="/img/sponsored.svg" />Sponsored children
                            </li>
                          </a>
                          <a onClick={handleLogout}>
                            <li style={{color:'black'}}>
                              <img src="/img/signout.svg" />Sign out
                            </li>
                          </a>
                        </ul>
                      </li>
                    </>:
                    <>
                    <li className="nav-item user-image dropdown">
                        <a className="nav-link " href>
                          <img className="user-image-header" src="/img/profile.png" />{name}<i className="fa fa-angle-down" aria-hidden="true" />
                        </a>
                        <ul className="dropdown-nav">
                          <Link href="/sponser/my_profile1">
                            <li>
                              <img src="/img/user.svg" /><span style={{color:'black'}}>My profile</span>
                            </li>
                          </Link>
                          <Link href="/sponser/my_profile1">
                            <li>
                              <img src="/img/sponsored.svg" /><span style={{color:'black'}}>Sponsored children</span>
                            </li>
                          </Link>
                          <a onClick={handleLogout} >
                            <li>
                              <img src="/img/signout.svg"/><span style={{color:'black'}}>Sign out</span>
                            </li>
                          </a>
                        </ul>
                    </li>
                  </>
                  }
                  </>}
                    </ul>
                </div>
                </div>
            </nav>
            </header>
            <div id="sidebaroverlay-id" onclick="outsideclick()" />
            <div className="page_start_warpper">
            <section className="sponsor-section">
                <div className="custom-container">
                <div className="row">
                    <div className="col-md-12">
                    <div className="section-title">Two ways to <span>Sponsor/Donate </span>
                    </div>
                    <p className="teams-des">Select your option below to transforming children’s Lives when you become a helping hand show god’s love to a child in need.</p>
                    </div>
                </div>
                </div>
            </section>
            <section className="sponsor-section">        
                <div className="custom-container card-sec">
                <div className="row">
                    <div className="col-lg-6">
                    <div className="sponsor-card">
                        <div className="spon-title">Sponsor a Child</div>
                        <p>With four easy steps</p>
                        <div className="d-flex justify-content-center">
                        <div className="spon-count">
                            <img className="img-fluid" src="/img/spon-step1.svg" />
                            <div className="spon-step-des">Choose a child from our data base</div>
                        </div>
                        <div className="spon-count">
                            <img className="img-fluid" src="/img/spon-step2.svg" />
                            <div className="spon-step-des">Select periodical sponsorship for child</div>
                        </div>                                                               
                        </div>
                        <div className="d-flex justify-content-center">
                        <div className="spon-count">
                            <img className="img-fluid" src="/img/spon-step3.svg" />
                            <div className="spon-step-des">Make payment through online</div>
                        </div>
                        <div className="spon-count">
                            <img className="img-fluid" src="/img/spon-step4.svg" />
                            <div className="spon-step-des">100% sponsored amount will go child family bank account</div>
                        </div>                                                               
                        </div>
                        <div className="d-flex justify-content-center">
                        <div className="spon-count width-50-per">
                            <img className="img-fluid" src="/img/spon-step5.svg" />
                            <div className="spon-step-des">Regular updates about the child’s progress will be sent</div>
                        </div>                                                       
                        </div>
                        {role_check==="sponsor" && <>
                            {datas!==null ?
                                <div className="sposor-btn">
                                    <Link href="/sponser/My_Profile">Sponsor a child now</Link>
                                </div>:

                                <div className="sposor-btn">
                                <Link href="/register/Register_Page">Sponsor a child now</Link>
                                </div>
                            }
                            </>
                        }
                        {role_check==="guardian" && <>
                            {datas!==null ?
                                <div className="sposor-btn">
                                    <Link href="/gaurdian/gaurdian_dashboard">Sponsor a child now</Link>
                                </div>:

                                <div className="sposor-btn">
                                <Link href="/register/Register_Page">Sponsor a child now</Link>
                                </div>
                            }
                            </>
                        }
                        {/* {datas!==null &&
                        
                        } */}
                    </div>                            
                    </div>
                    <div className="col-lg-6">
                    <div className="sponsor-card donar">
                        <div className="spon-title">Donate</div>
                        <p>With 3 easy steps</p>
                        <div className="spon-count width-50-per">
                        <img className="img-fluid" src="/img/donar-step1.svg" />
                        <div className="spon-step-des">Select periodical or one time donor</div>
                        </div>   
                        <div className="spon-count width-50-per">
                        <img className="img-fluid" src="/img/donar-step2.svg" />
                        <div className="spon-step-des">Make payment through online</div>
                        </div>  
                        <div className="spon-count">
                        <img className="img-fluid" src="/img/donar-step3.svg" />
                        <div className="spon-step-des">80% of the amount will use for Childs education and 20% is use for fundraising, administration, monitoring &amp; evaluation etc.</div>
                        </div>  
                        <div className="sposor-btn">
                        <Link href="/home_files/donate">Donate now</Link>
                        </div>
                    </div>                            
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
        </>
    )
}
export default Apply_Sponsorship;