import { SiFacebook } from "react-icons/si";
import { BsVimeo } from "react-icons/bs";
import {AiFillTwitterCircle} from "react-icons/ai";
import Link from "next/link";
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
                            <p><Link href="/">Privacy Policy</Link></p>
                            <p><Link href="/">Terms and COnditions</Link></p>
                            <p><Link href="/">Partner with us</Link></p>
                            <p><Link href="/">FAQ</Link></p>
                        </div>
                    </div>
                    <div>
                        <h6 className='text-uppercase text-white'>Quick Links</h6>
                        <div className='text-muted'>
                            <p><Link href="/">Home</Link></p>
                            <p><Link href="/">About</Link></p>
                            <p><Link href="/">Help</Link></p>
                            <p><Link href="/">Others</Link></p>
                        </div>
                    </div>
                    <div>
                        <h6 className='text-uppercase text-white'>Get in touch</h6>
                        <div className='text-muted'>
                            <p><Link href="/">Place</Link></p>
                            <p><Link href="/">Email</Link></p>
                            <p><Link href="/">Phonenumber</Link></p>
                            <p><SiFacebook/> <AiFillTwitterCircle/> <BsVimeo/></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}