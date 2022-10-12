import {AiOutlineMail,AiOutlineLock} from "react-icons/ai";
export default function Login(){
    return(
        <>
            {/* <div className="bg-image d-flex border justify-content-center p-5" style={{"backgroundImage":"url('/background_image.jpeg')","backgroundRepeat":"no-repeat","backgroundSize":"cover"}}> */}
                <div>
                    <h3 className="mb-4 pt-5 font-monospace text-center">bright life</h3>
                    <div className="d-flex justify-content-center pb-5">
                        <form className="bg-light px-4 pt-5">
                            <h1 className="h3 mb-2 font-monospace text-center ">Sign in</h1>
                                <h6 className="text-center mb-3 ">To Your brightlife account</h6>
                                <div className="mb-3 row">
                                    <div>
                                        <AiOutlineMail/>
                                        <label className="col"> Email</label>
                                    </div>
                                    <div>
                                        <input type="text" className="form-control" placeholder="enter e-mail address"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div>
                                        <AiOutlineLock/>
                                        <label className="col-form-label"><i className="bi bi-lock"></i> Password</label>
                                    </div>
                                    <div>
                                        <input type="password" className="form-control" placeholder="enter password"/>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-success" type="submit">Sign in</button>
                                </div>
                                <br/>
                                <p className="text-center">  ------------------OR------------------</p>
                                <div className="btn-toolbar pt-2">
                                    <div className="mr-2">
                                       <button type="button" className="btn mx-1 text-white" style={{"background-color":"#3b5998"}}><span className="bg-white"><img src="https://www.freeiconspng.com/uploads/facebook-f-logo-transparent-facebook-f-22.png" width="25"/></span> Sign in with Facebook</button>
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-primary mx-1"><span className="bg-white"><img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" width="25"/></span> Sign in with Google</button> 
                                    </div>
                                </div>
                                <br/>
                                <p className="text-center py-3">Not a member?<a className="text-primary" href="/">Sign in</a></p>
                        </form>
                    </div>
                </div>
            {/* </div> */}
        </>
    )
}