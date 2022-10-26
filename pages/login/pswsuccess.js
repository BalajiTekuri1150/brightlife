import Tick from "../public/tick.png"
export default function Pswsucess(){
    return(
        <>
            <div>
                <div className="d-flex justify-content-center m-5 ">
                    <form className="bg-light px-5 pt-2">
                        <div className="m-5 ">
                           <Tick/>
                        </div>
                        <h3 className="h4 font-monospace text-center ">Paasowrd changed </h3>
                        <p className="text-sm">Your password changed successfully</p>
                        <div className="text-center">
                            <button className="btn btn-success m-2 col-6" type="submit">Continue</button>
                        </div>
                        <div className="content d-flex justify-content-center align-items-center"> 
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
