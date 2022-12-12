import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect,useState } from 'react';
import { useContext } from 'react';
import { store } from '../_app';

const How_Works=()=>{
  const {datas,setDatas}=useContext(store);
  const [name,setName]=useState("");
    useEffect(()=>{
        if(typeof window!=='undefined'){
            setName(localStorage.getItem('name'));
         }
      },[])
    return(
        <>
        <Head>
            <title>Brightlife</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.8/slick.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.8/slick-theme.min.css" />
        </Head>
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
                    <Link className="nav-link " href="/home_files/apply_sponsorship">
                      <button className="btn signin-button" type="submit">
                        <span className="Donate"> Apply for Sponsorship </span>
                      </button>
                    </Link>
                  </li>
                  {
                    datas!==null? <>
                      <li className="nav-item user-image dropdown">
                    <a className="nav-link " href>
                      <img className="user-image-header" src={datas?.slice(1,-1)} />{name}<i className="fa fa-angle-down" aria-hidden="true" />
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
          <section className="howitwork-bg">
            <div className="howitwork-ban">
              <h4>Missions</h4>
              <p>Follow this 3 simple steps and choose the option to</p>
            </div>  
          </section>
          <section className="work-steps">
            <div className="custom-container d-flex">             
              <div className="work-content col-lg-6">
                <h4>Donate in Bulk</h4>
                <p>Select a child of your choice from our data base, Select periodical /one time donations sponsorship for child or Donate to bright life we will select a child for you.</p>
              </div>
              <div className="step-num col-lg-6"><span>01</span></div>                   
            </div>
          </section>
          <section className="work-steps2">
            <div className="custom-container d-flex">     
              <div className="step-num col-lg-6"><span>02</span></div>         
              <div className="work-content col-lg-6">                        
                <h4>Sponsor a Kid</h4>
                <p>100% sponsored amount will go to child’s family bank account. or Brightlife will share information about your child and use entire money on the kid.</p>
              </div>                                     
            </div>
          </section>
          <section className="work-steps">
            <div className="custom-container d-flex">             
              <div className="work-content col-lg-6">
                <h4>100% Transparent</h4>
                <p>80% of the amount will use for Childs education and 20% is use for fundraising, administration, monitoring &amp; evaluation etc. annual report will sent to you indicating the progress of your child.</p>
              </div>
              <div className="step-num col-lg-6"><span>03</span></div>                   
            </div>
          </section>
          <section className="work-steps2">
            <div className="custom-container d-flex">     
              <div className="step-num col-lg-6"><span>04</span></div>         
              <div className="work-content col-lg-6">                        
                <h4>Regular updates of the Child</h4>
                <p>100% sponsored amount will go to child’s family bank account. or Brightlife will share information about your child and use entire money on the kid.</p>
              </div>                                     
            </div>
          </section>
          <section className="sponsorship-section">
            <div className="sponsor-row">
              <div className="spons-leftcard">
                <div className="spons-title">How does child <span>Sponsorship work?</span></div>
                <p>Your contribute gives child access to life-changing benefits, like:</p>
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
              <div className="spons-rightcard">
                <img className="img-fluid" src="/img/sponsored.png" />
              </div>
            </div>
          </section>
          <section className="commitments">
            <div className="custom-container col-lg-6">No commitments (except from us). When you give monthly, you can cancel anytime.</div>
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
        <Script type="module" src="js/jquery.slim.min.js"></Script>
        <Script type="module" src="js/popper.min.js"></Script>
        <Script type="module" src="js/bootstrap.bundle.min.js"></Script>
        <Script stype="module" rc="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.8/slick.min.js"></Script>
        <Script type="module" src="js/custom.js"></Script>
        </>
    )
}
export default How_Works;