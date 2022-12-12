import Head from "next/head"
import { useRouter } from "next/router"
import Script from "next/script"
export default function Pswsucess(){
    const router=useRouter()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        router.push({pathname: '/login/logins'})
    }
    return(
        <>
        <Head>
            <title>Brightlife</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
        </Head>
        <div className="sign-bg">
            <img src="/img/signin-bg.jpg" alt="" className="bg" />
            </div>
            <div className="sign-container password-changed otp-container">
            <a href="/"> <div className="sign-logo"> <img src="/img/logo.png" alt="Bright Life" /></div></a>
            <form onSubmit={handleSubmit}>
                <div className="sign-in-block ">
                    <div>
                        <img src="/img/payment-sucss-icon.svg" />
                    </div>
                    <h4>Password Changed!</h4>
                    <p>Your password has been changed succssfully</p>
                    <div className="continue-btn">
                        <button className="btn sign-btn" type="submit">Close</button>
                    </div>
                </div>
            </form>
        </div>
        <Script src="js/jquery.slim.min.js"></Script>
        <Script src="js/popper.min.js"></Script>
        <Script src="js/bootstrap.bundle.min.js"></Script>
        <Script src="js/custom.js"></Script>
            {/* <div className="d-flex justify-content-center m-5 ">
                <form className="bg-light px-5 pt-2" onSubmit={handleSubmit}>
                    <h3 className="h4 font-monospace text-center ">Paasowrd changed </h3>
                    <p className="text-sm">Your password changed successfully</p>
                    <div className="text-center">
                        <button className="btn btn-success m-2 col-6" type="submit">Continue</button>
                    </div>
                </form>
            </div> */}
        </>
    )
}
