import { useRouter } from "next/router"
import { getSessionData,removeSessionData,setLocalData } from "../../utils/storage_service"
import { postData } from "../../utils/data_manage_service"
export default function Pswsucess(){
    const router=useRouter()
    const email=router.query.email
    const psw=getSessionData("password")
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const data = {
            username:email,
            password:psw
        }   
        const result=await(postData('https://test-api.brightlife.org/brightlife/get/token',data))
        setLocalData("token",result?.data?.token) 
        router.push({ 
            pathname: '/components/kids_details',
        })   
    }
    return(
        <>
            <div>
                <div className="d-flex justify-content-center m-5 ">
                    <form className="bg-light px-5 pt-2" onSubmit={handleSubmit}>
                        <h3 className="h4 font-monospace text-center ">Paasowrd changed </h3>
                        <p className="text-sm">Your password changed successfully</p>
                        <div className="text-center">
                            <button className="btn btn-success m-2 col-6" type="submit">Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
