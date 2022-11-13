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
        const result=await(postData('https://test-api.brightlife.org/brightlife/signin',data))
        removeSessionData(password)
        setLocalData("token",result.data.token)
        setLocalData("user_id",result?.data?.response?.user?.id)
        if(result?.data?.response?.user?.role==="sponsor"){
            router.push({ 
                pathname: '/sponser/sponser_list',
            })
        }
        else if(result?.data?.response?.user?.role==="child"){
            router.push({
                pathname: '/kids/kids_Dashboard',
            })  
        }
        else if(result?.data?.response?.user?.role==="guardian"){
            router.push({ 
                pathname: '/gaurdian/gaurdian_dashboard',
            })   
        }
        else if(result?.data?.response?.user?.role==="admin"){
            router.push({ 
                pathname: '/components/admin_dashboard',
            })  
        }
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
