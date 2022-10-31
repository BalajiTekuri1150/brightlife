import { useRouter } from "next/router"
import { useState } from "react"
import { getLocalData} from "../../utils/storage_service"
import { postApplicationData } from "../../utils/data_manage_service"
import Input from "./input_compent"
export default function Gaurdian_details(){
    let value="",isvalid=false,validation=[]
    const [message,setMessage]=useState("")
    const [status,setStatus]=useState(true)
    const [disable,setDisable]=useState(true)
    const router=useRouter()
    const token=getLocalData("token")
    const id=getLocalData("id")
    const [formValues,setFormValues]=useState({
        profession:{value,isvalid},
        annual_income:{value,isvalid},
        family_members:{value,isvalid},
        extra_allowance:{value,isvalid},
    })
    const handleSubmit=async(e)=>
    {
        e.preventDefault()  
        setDisable(true)
        const data = {
            application_id: id,
            profession: formValues.profession.value,
            annual_income: formValues.annual_income.value,
            family_members: formValues.family_members.value,
            extra_allowance: formValues.extra_allowance.value
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
    const handleChange=(name,values,valid)=>{
        setMessage("")
        setStatus(true)
        setFormValues({...formValues,[name]:{value:values,isvalid:valid}})
        for(let x in formValues){
            validation.push(formValues[x].isvalid)
        }
        function check(x){
            return x===true
        }
        console.log(formValues)
        setDisable(!validation.every(check))
    }
    return(
        <>
            <section className="form">
                <form className="bg-light px-5 pt-5" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-5 mx-4">
                            <label>Profession</label>
                            <Input type="text"  name="profession" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>Annual Income</label>
                            <Input type="number" name="annual_income" className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Family members</label>
                            <Input type="number" name="family_members" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Extra Allowances</label>
                            <Input type="number" name="extra_allowance" className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <span className="m-2">{status?<p className="text-sucess">{message}</p>:<p className="text-danger">{message}</p>}</span>
                    <div className="row">
                        <button type="submit" className="btn btn-primary mx-5 col-2 " disabled={disable}>Save&Continue</button>
                        <button type="button" className="btn btn-secondary col-2 mx-5 " >Exit</button>
                    </div>
                </form>
            </section>
        </>
    )
}