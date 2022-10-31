import { useRouter } from "next/router"
import { useState } from "react"
import { getLocalData} from "../../utils/storage_service"
import { postApplicationData } from "../../utils/data_manage_service"
export default function Gaurdian_details(){
    const [message,setMessage]=useState("")
    const [status,setStatus]=useState(true)
    const [disable,setDisable]=useState(false)
    const router=useRouter()
    const token=getLocalData("token")
    const id=getLocalData("id")
    const handleSubmit=async(e)=>
    {
        e.preventDefault()  
        setDisable(true)
        const data = {
            "application_id": id,
            "profession": e.target.profession.value,
            "annual_income": e.target.annual_income.value,
            "family_members": e.target.family_members.value,
            "extra_allowance": e.target.extra_allowance.value
        }
        const JSONdata = JSON.stringify(data)
        postApplicationData('https://test-api.brightlife.org/brightlife/update/guardian/details',JSONdata,token)
        .then((result) => {
            if(result?.data?.status){
                router.push({ 
                    pathname: '/components/Education_details',
                })  
            }
            else{
                setDisable(false)
                setStatus(result?.data?.status)
                setMessage(result?.data?.error?.message)
            }
        })            
    }
    const handleChange=()=>{
        setMessage("")
        setStatus(true)
    }
    return(
        <>
            <section className="form">
                <form className="bg-light px-5 pt-5" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-5 mx-4">
                            <label>Profession</label>
                            <input type="text"  name="profession" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>Annual Income</label>
                            <input type="number" name="annual_income" className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Family members</label>
                            <input type="number" name="family_members" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Extra Allowances</label>
                            <input type="number" name="extra_allowance" className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <span className="m-2">{status?<p className="text-sucess">{message}</p>:<p className="text-danger">{message}</p>}</span>
                    <div className="row">
                        <button type="submit" className="btn btn-primary mx-5 col-2 " disabled={disable}>Save&Continue</button>
                        <button type="button" className="btn btn-secondary col-2 mx-5 " disabled={disable}>Exit</button>
                    </div>
                </form>
            </section>
        </>
    )
}