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
            
        </>
    )
}