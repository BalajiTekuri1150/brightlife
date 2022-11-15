import { useRouter } from "next/router"
export default function Pswsucess(){
    const router=useRouter()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        router.push({pathname: '/login/logins'})
    }
    return(
        <>
            <div className="d-flex justify-content-center m-5 ">
                <form className="bg-light px-5 pt-2" onSubmit={handleSubmit}>
                    <h3 className="h4 font-monospace text-center ">Paasowrd changed </h3>
                    <p className="text-sm">Your password changed successfully</p>
                    <div className="text-center">
                        <button className="btn btn-success m-2 col-6" type="submit">Continue</button>
                    </div>
                </form>
            </div>
        </>
    )
}
