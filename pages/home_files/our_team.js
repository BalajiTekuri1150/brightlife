import React from 'react';
import Link from 'next/link';
import { useEffect,useState } from 'react';
import { useContext } from 'react';
import { store } from '../_app';
import { getLocalData } from '../../utils/storage_service';
const Our_Team=()=>{
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
      // console.log("Hello")
      localStorage.clear();
      localStorage.removeItem("profile");
      Router.push({
        pathname:'/',
      })
    }
  // console.log(datas);
    return(
        <>
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
                  <li className="nav-item">
                    <Link className="nav-link " href="/home_files/donate">
                      <button className="btn signin-button" type="submit">
                        <span className="Donate" style={{color:'white'}}> Donate </span>
                      </button>
                    </Link>
                  </li>
                  {role_check==="guardian" && <>
                        {datas!==null ?<>
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
                            </>:null
                        }
                        </>
                   }
                  {role_check==="sponsor" && <>
                    {datas!==null ?<>
                      <li className="nav-item user-image dropdown">
                        <a className="nav-link " href>
                          <img className="user-image-header" src={datas} />{name}<i className="fa fa-angle-down" aria-hidden="true" />
                        </a>
                        <ul className="dropdown-nav">
                          <a href="/sponser/My_Profile">
                            <li>
                              <img src="/img/user.svg" />My profile
                            </li>
                          </a>
                          <a href="/sponser/My_Profile">
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
                    </>:null
                  }
                  </>}
                  {/* {datas!==null ? <>
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
                  } */}
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div id="sidebaroverlay-id" onclick="outsideclick()" />
        <div className="page_start_warpper">
          <section className="our-teams">
            <div className="custom-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="section-title">Our <span>Team</span>
                  </div>
                  <p className="teams-des">We believe every child deserves a right opportunity to learn and walk towards a brighter and happier future. Here, we will help you the reach the right sponsor and take that step towards your dreams.</p>
                </div>
              </div>
              <div id="teamsslider">
                <div className="teams">
                  <div>
                    <div className="img-box">
                      <img src="/img/team1.png" alt="" />
                    </div>
                    <div className="team-name">Uday Reddy</div>
                    <div className="team-role">CEO &amp; Founter</div>
                    <p className="team-desp">It was a dream come true for any individual of my thinking. Since then, there has been no looking back.</p>
                    <div className="teams-social d-flex justify-content-center">
                      <span> <a href><img src="/img/skype.svg" /></a></span>
                      <span><img src="/img/divider.svg" /></span>
                      <span>  <a href><img src="/img/twitter.svg" /></a></span>
                      <span><img src="/img/divider.svg" /></span>
                      <span><a href><img src="/img/fb.svg" /></a></span>
                      <span><img src="/img/divider.svg" /></span>
                      <span><a href><img src="/img/vimeo.svg" /></a></span>
                    </div>
                  </div>
                  <div>
                    <div className="img-box">
                      <img src="/img/team2.png" alt="" />
                    </div>
                    <div className="team-name">Roop Kumar</div>
                    <div className="team-role">Co Founter</div>
                    <p className="team-desp">It was a dream come true for any individual of my thinking. Since then, there has been no looking back.</p>
                    <div className="teams-social d-flex justify-content-center">
                      <span> <a href><img src="/img/skype.svg" /></a></span>
                      <span><img src="/img/divider.svg" /></span>
                      <span>  <a href><img src="/img/twitter.svg" /></a></span>
                      <span><img src="/img/divider.svg" /></span>
                      <span><a href><img src="/img/fb.svg" /></a></span>
                      <span><img src="/img/divider.svg" /></span>
                      <span><a href><img src="/img/vimeo.svg" /></a></span>
                    </div></div>
                  <div>
                    <div className="img-box">
                      <img src="/img/team3.png" alt="" />
                    </div>
                    <div className="team-name">Manjusha</div>
                    <div className="team-role">CTO</div>
                    <p className="team-desp">It was a dream come true for any individual of my thinking. Since then, there has been no looking back.</p>
                    <div className="teams-social d-flex justify-content-center">
                      <span> <a href><img src="/img/skype.svg" /></a></span>
                      <span><img src="/img/divider.svg" /></span>
                      <span>  <a href><img src="/img/twitter.svg" /></a></span>
                      <span><img src="/img/divider.svg" /></span>
                      <span><a href><img src="/img/fb.svg" /></a></span>
                      <span><img src="/img/divider.svg" /></span>
                      <span><a href><img src="/img/vimeo.svg" /></a></span>
                    </div>
                  </div>
                  <div>
                    <div className="img-box">
                      <img src="/img/team3.png" alt="" />
                    </div>
                    <div className="team-name">Manjusha</div>
                    <div className="team-role">CTO</div>
                    <p className="team-desp">It was a dream come true for any individual of my thinking. Since then, there has been no looking back.</p>
                    <div className="teams-social d-flex justify-content-center">
                      <span> <a href><img src="/img/skype.svg" /></a></span>
                      <span><img src="/img/divider.svg" /></span>
                      <span>  <a href><img src="/img/twitter.svg" /></a></span>
                      <span><img src="/img/divider.svg" /></span>
                      <span><a href><img src="/img/fb.svg" /></a></span>
                      <span><img src="/img/divider.svg" /></span>
                      <span><a href><img src="/img/vimeo.svg" /></a></span>
                    </div>
                  </div>
                </div>
              </div>
            </div></section>
          <section className="teams-aboutus">         
            <div className="teams-row">
              <div className="teams-left col-lg-6">
                <h4 className="about-head">About <span>US</span></h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. ut labore et dolore magna aliqua. Ut enim ad minim veniam. incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
              </div>
              <div className=" teams-right col-lg-6"><img className="img-fluid" src="/img/aboutus.png" /></div>
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
      </div>
        </>
    )
}
export default Our_Team;