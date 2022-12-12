import React, { useState } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import Link from 'next/link';
import { useContext,useEffect } from 'react';
import { store } from '../_app';
const Donate=()=>{
    const {datas,setDatas}=useContext(store)
    const [name,setName]=useState("");
    useEffect(()=>{
      if(typeof window!=='undefined'){
          setName(localStorage.getItem('name'));
       }
    },[])
    
    return(
        <>
            <div>
            <Head>
            <title>Brightlife</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.8/slick.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.8/slick-theme.min.css" />
            </Head>
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
                  <li className="nav-item">
                    <Link className="nav-link " href="/home_files/donate">
                      <button className="btn signin-button" type="submit">
                        <span className="Donate"> Donate </span>
                      </button>
                    </Link>
                  </li>
                  {datas!==null ?<>
                    <li className="nav-item user-image dropdown">
                      <a className="nav-link " href>
                        <img className="user-image-header" src={datas} />{name}<i className="fa fa-angle-down" aria-hidden="true" />
                      </a>
                      <ul className="dropdown-nav">
                        <a href="#">
                          <li>
                            <img src="/img/user.svg" />My profile
                          </li>
                        </a>
                        <a href="#">
                          <li>
                            <img src="/img/sponsored.svg" />Sponsored children
                          </li>
                        </a>
                        <a href="#">
                          <li>
                            <img src="/img/signout.svg" />Sign out
                          </li>
                        </a>
                      </ul>
                    </li>
                  </>:null
                  }
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div id="sidebaroverlay-id" onclick="outsideclick()" />
        <div className="page_start_warpper">      
          <section className="make-donation-bg">   
            <div className="custom-container">     
              <div className="makedonation-ban">  
                <div className="make-title">Make a <span>donation</span></div>
                <p>Transforming Children’s Lives when you become a donor show God’s love to a child in need.</p>
              </div>  
            </div>       
          </section>   
          <section className="make-donate-form">   
            <div className="custom-container">     
              <div className="donateform-card">                
                <div className="row">
                  <div className="col-lg-5">
                    <img className="img-fluid" src="/img/donateimg.png" />
                  </div>
                  <div className="col-lg-7 form-length">
                    <form>
                      <p className="doante-q">How often would you like to donate?</p>
                      <div className="form-group">
                        <select className="form-control selected-active">
                          <option>Monthly</option>
                          <option>yearly</option>                                  
                        </select>
                      </div>
                      <p className="doante-q text-left">Please select your donation amount</p>
                      <div className="d-flex">                            
                        <div className="dontate-amount">$50</div> 
                        <div className="dontate-amount">$100</div>     
                        <div className="dontate-amount amount-active">$200</div>     
                        <div className="dontate-amount">$400</div>                         
                      </div>
                      <div className="form-group specific-amount">
                        <input type="text" className="form-control" placeholder="Or  enter Specific amount" />
                      </div>
                      <div className="proceed-to-pay">
                        <a href className="pay-btn">Proceed to pay</a>
                      </div>
                    </form>
                  </div>                    
                </div>
                <div className="row">
                  <p className="note-text">You will be charged a reoccurring amount of 20$ on the 7th of every month which will be deducted from the card that you provided.</p>
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
    );
}
export default Donate;