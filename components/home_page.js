
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import Router from 'next/router';
import { setLocalData } from '../utils/storage_service';
import { useState,useEffect } from 'react';
import { useContext } from 'react';
import { store } from '../pages/_app';
const Home_page=()=>{
    const {datas}=useContext(store);
    const handleSignIn=()=>{
        Router.push({
            pathname:"/login/logins"
        });
    }
    const handleSignUp=()=>{
        Router.push({
            pathname:"/register/Register_Page"
        })
    }
    // console.log(datas);
    useEffect(()=>{
      if(typeof window!=='undefined'){
          localStorage.removeItem('profile');
          localStorage.clear()
       }
    },[])
    return(
        <>
        <Head>
            <title>Brightlife</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.8/slick.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.8/slick-theme.min.css" />
        </Head>
        <header>
            <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between ">
            <div className="custom-container border_bottom">
                <div>
                <a className="navbar-toggler" type="button" onclick="toggleSidebar()">
                    <i className="fa fa-bars" aria-hidden="true" />
                </a>
                <a className="navbar-brand" href="index.html"><img className="logo" src="/img/logo.png" alt="Brightlife" /></a>
                </div>
                <div className=" navbar-collapse animated slideInLeft" id="mobilesidemenu">
                <ul className="navbar-nav mr-auto ">
                    <li className="nav-item ">
                    <Link className="nav-link" href="/home_files/our_team">  Our Team</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" href="/home_files/how_works">How it works</Link>
                    </li>         
                    <li className="nav-item">
                    <button className="btn signin-button" type="submit" onClick={handleSignIn}>Sign in</button>
                    </li>
                    <li className="nav-item">
                    <button className="btn Signup-button" type="submit" onClick={handleSignUp}> Sign up</button>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </header>
        <div id="sidebaroverlay-id" onclick="outsideclick()" />
        <div className="page_start">
          {/* header end */}
          <section className="banner-section">
            <div id="homebanner" className="carousel slide" data-ride>
              <ol className="carousel-indicators">
                <li data-target="#homebanner" data-slide-to={0} className="active" />
                <li data-target="#homebanner" data-slide-to={1} />     
              </ol> 
              <div className="carousel-inner ">
                <div className="carousel-item active " style={{backgroundImage: 'url("img/slider/banner1.jpg")'}}>
                  <div className="row "> 
                    <div className="position-real custom-container ">       
                      <div className="banner-content col-md-9">
                        <div className>
                          <h1>To make a difference in someone’s life, 
                            you don’t have to be rich, or perfect.</h1>
                          <p>Through Brightlife in India more than 150% of kids are getting education.</p>
                          <div className="d-flex">
                            <a className="sponsorship-button" href="/home_files/apply_sponsorship">Apply for Sponsorship</a>
                            <a className="donate-button" href="/home_files/donate">Donate</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item  " style={{backgroundImage: 'url("img/slider/banner1.jpg")'}}>
                  <div className="row "> 
                    <div className="position-real custom-container ">       
                      <div className="banner-content col-md-9">
                        <div className>
                          <h1>To make a difference in someone’s life, 
                            you don’t have to be rich, or perfect.</h1>
                          <p>Through Brightlife in India more than 150% of kids are getting education.</p>
                          <div className="d-flex">
                            <a className="sponsorship-button">Apply for Sponsorship</a>
                            <Link className="donate-button" href="/home_files/donate">Donate</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-target="#homebanner" data-slide="prev">
                <div className="bannerleftarrow"> <i className="fa fa-angle-left" aria-hidden="true" /></div>
              </button>
              <button className="carousel-control-next" type="button" data-target="#homebanner" data-slide="next">
                <div className="bannerrightarrow"> <i className="fa fa-angle-right" aria-hidden="true" /></div>
              </button>
            </div>
          </section>
          {/* How it Works start */}
          <section className="how-it-works">
            <div className="custom-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="section-title">How it <span>Works</span></div>
                </div>
              </div>
              <div className="row how-it-works-steps">
                <div className="col-md-4">
                  <div className="step-cirlce1">
                    <span> 01</span>
                  </div>
                  <div className="step1-grad" />
                </div>
                <div className="col-md-4">
                  <div className="step-cirlce2">
                    <span> 02</span>
                  </div>
                  <div className="step2-grad" />
                </div>
                <div className="col-md-4">
                  <div className="step-cirlce3">
                    <span> 03</span>
                  </div>
                </div>
              </div>
              <div className="row how-it-works-row  mobile-steps">
                <div className="col-md-12 col-lg-4">
                  <div className="how-its-work-box">
                    <div className="step-cirlce1">
                      <span> 01</span>
                    </div>
                    <div className="steps_content">
                      <div className="step-title">STEP</div>
                      <p className="step-description">Select a kid of your choice From our data base</p>
                      <div className="or-line" />
                      <div className="or-text">or</div>
                      <p className="step-description">Donate to Brightlife. we will 
                        select a kid for you.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-4">
                  <div className="how-its-work-box">
                    <div className="step-cirlce2">
                      <span> 02</span>
                    </div>
                    <div className="steps_content">
                      <div className="step-title">STEP</div>
                      <p className="step-description">Kid selected by you will get 
                        100% money in their accounts.</p>
                      <div className="or-line" />
                      <div className="or-text">or</div>
                      <p className="step-description">Brightlife will share information 
                        about your kid and use entire 
                        money on the kid.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-4">
                  <div className="how-its-work-box">
                    <div className="step-cirlce3">
                      <span> 03</span>
                    </div>
                    <div className="steps_content">
                      <div className="step-title">STEP</div>
                      <p className="step-description">100% high standards of accountability and transparency and annual report will sent to you indicating the progress of your child</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* How it Works end */}
          {/* sponsored child says start */}
          <section className="sponsored-child-says">
            <div className="row" style={{width: '100%'}}>
              <div className="col-lg-6">
                <img className="img-fluid" src="img/childsays.png" />
              </div>
              <div className="col-md-12 col-lg-4">
                <div className="sponsored-title">
                  What <span>brightlife</span> sponsored child say’s
                </div>
                <div className="sponsored-underline" />
                <div className="sponsored-name">
                  Shalini
                </div>
                <div className="sponsored-age">
                  14 year girl from Ranchi
                </div>
                <p>brightlife foundation has changed my life  by teaching me a basic rights and giving me education. and also be lives of many other vulnerable children like me.</p>
              </div>
              <div className="col-lg-2 sponsored-bg">
                <img className="child1 img-fluid" src="img/child2.png" />
                <img className="child2 img-fluid" src="img/child1.png" />
              </div>
            </div>
          </section>
          {/* sponsored child says end */}
          {/* Our sponsors Testimonials start */}
          <section className="testimonials-section">
            <div className="custom-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="section-title">Our sponsors <span>Testimonials</span></div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mx-auto">
                  <div id="myCarousel" className="carousel slide" data-ride>
                    {/* Wrapper for carousel items */}
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="img-box"><img src="img/testimonials1.png" alt="" /></div>
                        <div className="testimonial-name">Mahesh Babu</div>
                        <div className="testimonial-role">Mahesh Babu</div>
                        <p className="testimonial-desp">“As a family, we sponsor a child. Being able to change a life gives us great satisfaction. We hope others will be inspired to do the same. Nothing gives more joy than empowering those who need it most”</p>
                      </div>
                      <div className="carousel-item ">
                        <div className="img-box"><img src="img/testimonials1.png" alt="" /></div>
                        <div className="testimonial-name">Mahesh Babu</div>
                        <div className="testimonial-role">Mahesh Babu</div>
                        <p className="testimonial-desp">“As a family, we sponsor a child. Being able to change a life gives us great satisfaction. We hope others will be inspired to do the same. Nothing gives more joy than empowering those who need it most”</p>
                      </div>
                      <div className="carousel-item ">
                        <div className="img-box"><img src="img/testimonials1.png" alt="" /></div>
                        <div className="testimonial-name">Mahesh Babu</div>
                        <div className="testimonial-role">Mahesh Babu</div>
                        <p className="testimonial-desp">“As a family, we sponsor a child. Being able to change a life gives us great satisfaction. We hope others will be inspired to do the same. Nothing gives more joy than empowering those who need it most”</p>
                      </div>
                    </div>
                    {/* Carousel controls */}
                    <div className="testimonial-indicator">
                      <a className="carousel-control-prev" href="#myCarousel" data-slide="prev">
                        <img src="img/left-arrow.svg" />
                      </a>
                      <a className="carousel-control-next" href="#myCarousel" data-slide="next">
                        <img src="img/right-arrow.svg" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img className="testmonailbg1" src="img/testmonailbg1.svg" />
            <img className="testmonailquote1" src="img/testmonailquote1.png" />
            <img className="testmonailquote2" src="img/testmonailquote2.png" />
          </section>
          {/* Our sponsors Testimonials end */}
          {/*  count section start */}
          <section className="count-section">
            <div className="custom-container">
              <div className="row">
                <div className="col-lg-4 md-hide text-center">
                  <img className src="img/count-img.png" />
                </div>
                <div className="col-lg-3 kids">
                  <div className="count-num">2000 </div>
                  <div className="count-type">Kids </div>
                  <p>Within just a year, 2000 kids have successfully received scholarships to achieve their dreams</p>
                </div>
                <div className="col-lg-1"><div className="line-sapration" /></div>
                <div className="col-lg-4 donors">
                  <div className="count-num">1500 </div>
                  <div className="count-type">Donors </div>
                  <p>With 1500 active donors across the globe , we are actively improving our outreach</p>
                </div>
                <div className="col-lg-4 sm-hide">
                  <img className src="img/count-img.png" />
                </div>
              </div>
            </div>
          </section>
          {/* Have any Question? start */}
          <section className="have-any-question">
            <div className="custom-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="section-title">Have any <span>Question?</span></div>
                </div>
              </div>
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-6">
                  <p>We’re here to help. Send us an email or call us at +44 123 123 4567  Please feel free to contact our expert.</p>
                  <div className="contact-btn-div">
                    <a href className="contact-us-button">Contact us</a>
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
                <a href="index.html"><img className="logo" src="img/logo.png" alt="Brightlife" /></a>
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
                <div>Lorem ipsum
                  Lorem ipsum Lorem ipsum 19801</div>            
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
          <div className="copyright">© 2019  
            brightlife.com
          </div>
          <div className="credits"> <a href>FAQ’s</a> <a href>Deposit</a>
          </div>
        </div>
      </footer>

        <Script src="js/jquery.slim.min.js"></Script>
        <Script src="js/popper.min.js"></Script>
        <Script src="js/bootstrap.bundle.min.js"></Script>
        <Script src="js/custom.js"></Script>
        {/* <Script>
            // header sticky
        $(document).ready(function() {
            // Transition effect for navbar 
            $(window).scroll(function() {
                // checks if window is scrolled more than 500px, adds/removes solid class
                if($(this).scrollTop() > 10) { 
                    $('.navbar').addClass('solid');
                } else {
                    $('.navbar').removeClass('solid');
                }
            })
        })
        </Script> */}
        </>
    );
}
export default Home_page;