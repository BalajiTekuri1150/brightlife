import Gaurdian_details from "./gaurdian_details";
import Kids_details from "./kids_Details"
import Education_details from "./education_details";
import Required_documents from "./required_documents"
import Bank_details from "./bank_details"
import { useState} from "react"
import Link from "next/link";
export default function Application(){
    const [screen, setscreen] = useState(1);
    const toggleChecked = () => {setscreen(screen+1)};
    return (
        <>
            <div className="wrapper" >
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
                            <a className="nav-link" href="/home_files/our_team"> Our Team</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/home_files/how_works"> How it works </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href="sponsor.html">
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
                            <Link href="/sponser/My_Profile">
                                <li>
                                <img src="/img/user.svg" /><span style={{color:'black'}}>My profile</span>
                                </li>
                            </Link>
                            <Link href="/sponser/My_Profile">
                                <li>
                                <img src="/img/sponsored.svg" /><span style={{color:'black'}}>Sponsored</span>
                                </li>
                            </Link>
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
        <div className="profile-content page_start_warpper">
          <div className="row nomar">
            <div className="col-lg-2 col-sm-12">
              <div className="left-profilemenu-block">
                <div className="left-profilemenu-block">
                  <div className="left-profileimage">
                    <img src="/img/childsays.png" alt="My Profile Icon" className="left-pro-icon" />
                    <div className="image-upload">
                      <label htmlFor="file-input">
                        <img src="/img/camera.png" />
                      </label>
                      <input id="file-input" type="file" />
                      {/* {selectedFile && (
                                <div>
                                 <img alt="not fount" src={URL.createObjectURL(selectedFile)} width="100px" height="70px" style={{borderRadius:'100px',marginLeft:'30px'}}/>
                                 <br />
                                 <button onClick={()=>setSelectedFile(null)} style={{marginLeft:'50px',marginTop:'10px'}}>Remove</button>
                                 </div>
                             )}
                             {selectedImage && 
                                 <img src={selectedImage}></img>
                             } */}
                    </div>
                    <p>prathapp</p>
                  </div>
                 
                  <ul className=" col-2 sidebar-menu">
                            <Link href="/gaurdian/gaurdian_profile"><p className="text-dark m-5 pe-auto">Myprofile</p></Link>
                            <Link href="/gaurdian/gaurdian_dashboard"><p className="text-dark m-5">Applications</p></Link>
                        </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-10 col-sm-12">
              <div className="myaccount-right-block">
                <h4 className="sponsor-headding"></h4>
                <div className="myaccount-content-block">
                  <div className="myaccount-content-inner">   
                  <div className="bg-white mt-5" style={{"width":"900px","height":"900px",marginLeft:'30px'}}>
                    {/* <div className="bg-white mt-5" style={{"width":"900px","height":"auto"}}> */}
                        {screen==1 && <Kids_details screenvalue={toggleChecked}/> }
                        {screen==2 && <Gaurdian_details screenvalue={toggleChecked}/> }
                        {screen==3 && <Education_details screenvalue={toggleChecked}/> }
                        {screen==4 && <Required_documents screenvalue={toggleChecked}/> }
                        {screen==5 && <Bank_details screenvalue={toggleChecked}/> }
                    {/* </div> */}
                  </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        </>
    )
}