import Gaurdian_details from "./gaurdian_details";
import Kids_details from "./kids_Details"
import Education_details from "./education_details";
import Required_documents from "./required_documents"
import Bank_details from "./bank_details"
import { useState} from "react"
import Link from "next/link";
export default function Application(props){
    const [screen, setscreen] = useState(1);
    const toggleChecked = () => {setscreen(screen+1)};
    const handleProfile=()=>
    {
        props.handleExit1();
    }
    return (
        <>    
          <div className="col-lg-10 col-sm-12">
            <div className="myaccount-right-block">
              <h4 className="sponsor-headding"></h4>
              <div className="myaccount-content-block">
                <div className="myaccount-content-inner">   
                  {/* <div className="bg-white mt-5" style={{"width":"900px","height":"900px",marginLeft:'30px'}}> */}
                    <div className="bg-white mt-5">
                        {screen==1 && <Kids_details screenvalue={toggleChecked} handleExitButton={handleProfile}/> }
                        {screen==2 && <Gaurdian_details screenvalue={toggleChecked} handleExitButton={handleProfile}/> }
                        {screen==3 && <Education_details screenvalue={toggleChecked} handleExitButton={handleProfile}/> }
                        {screen==4 && <Required_documents screenvalue={toggleChecked} handleExitButton={handleProfile}/> }
                        {screen==5 && <Bank_details screenvalue={toggleChecked} handleExitButton={handleProfile} handleBank={handleProfile}/> }
                    </div>
                  {/* </div> */}
          
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