import { SiFacebook } from "react-icons/si";
import { BsVimeo } from "react-icons/bs";
import {AiFillTwitterCircle} from "react-icons/ai";
export default function Footers(){
    return(
        <>
            <div className="bg-dark">
                <div className="d-flex justify-content-around p-4">
                    <div className="ml-5">
                        <h6 className='fw-bold text-white '>bright Life</h6>
                        <p className="text-muted">Here content about the project.</p>
                    </div>
                    <div>
                        <h6 className='text-uppercase text-white'>our services</h6>
                        <div className='text-muted'>
                            <p><a href='/' >Privacy policy</a></p>
                            <p><a href='/'> Terms and Conditions</a></p>
                            <p><a href='/'>  Partner with us</a></p>
                            <p><a href='/'>   FAQ </a></p>
                            <p><a href='/'> Lorem Ipsum</a></p>
                        </div>
                    </div>
                    <div>
                        <h6 className='text-uppercase text-white'>Quick Links</h6>
                        <div className='text-muted'>
                            <p><a href='/'>Home</a></p>
                            <p><a href='/'> About Us</a></p>
                            <p><a href='/'>Help</a></p>
                            <p><a href='/'>others</a></p>
                        </div>
                    </div>
                    <div>
                        <h6 className='text-uppercase text-white'>Get in touch</h6>
                        <div className='text-muted'>
                            <p><a href='/'>Place</a></p>
                            <p><a href='/'>Email</a></p>
                            <p><a href='/'>Phone Number</a></p>
                            <p><SiFacebook/> <AiFillTwitterCircle/> <BsVimeo/></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}