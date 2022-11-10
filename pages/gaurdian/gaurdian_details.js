import { useRouter } from "next/router"
import { useState,useEffect } from "react"
import { postData ,getData} from "../../utils/data_manage_service"
import Input from "./input_compent"
import Link from "next/link"
export default function Gaurdian_details(){
    let value="",isvalid=false
    const [message,setMessage]=useState("")
    const [status,setStatus]=useState(true)
    const router=useRouter()
    const application_number=router.query.application_id
    const [formValues,setFormValues]=useState({
        profession:{value,isvalid},
        annual_income:{value,isvalid},
        family_members:{value,isvalid},
        extra_allowance:{value,isvalid},
    })
    useEffect(()=>{
        const getprofile=async()=>{
            const result=await getData(`https://test-api.brightlife.org/brightlife/get/application/details?page=1&page_size=5&application_id=${application_number}`);
            const disable=(Object.keys(formValues)).every((item)=>(Object.keys(result?.data?.response?.data[0])).includes(item))
            if(disable){
                setFormValues({
                    profession:{value:result?.data?.response?.data[0].profession,isvalid:true},
                    annual_income:{value:result?.data?.response?.data[0].annual_income,isvalid:true},
                    family_members:{value:result?.data?.response?.data[0].family_members,isvalid:true},
                    extra_allowance:{value:result?.data?.response?.data[0].extra_allowance,isvalid:true},
                })
            }
        }
        getprofile();
    },[]);
    const handleSubmit=async(e)=>
    {
        e.preventDefault()  
        const data = {
            application_id: application_number,
            profession: formValues.profession.value,
            annual_income: formValues.annual_income.value,
            family_members: formValues.family_members.value,
            extra_allowance: formValues.extra_allowance.value
        } 
        const result=await(postData('https://test-api.brightlife.org/brightlife/update/guardian/details',data,1))
        if(result?.data?.status){
            router.push({ 
                pathname: '/gaurdian/education_details',
                query:{"application_id":application_number}
            })  
        }
        else{
            setStatus(result?.data?.status)
            setMessage(result?.data?.error.message)
        }            
    }
    const handleChange=(name,values,valid)=>{
        setMessage("")
        setStatus(true)
        setFormValues({...formValues,[name]:{value:values,isvalid:valid}})
    }
    const isFormValid=Object.keys(formValues).every((key)=>{
        return formValues[key].isvalid
    })
    return(
        <>
            <section className="form">
                <form className="bg-light px-5 pt-5" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-5 mx-4">
                            <label>Profession</label>
                            <Input type="text"  name="profession" className="form-control" value={formValues.profession.value} onChange={handleChange}/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>Annual Income</label>
                            <Input type="number" name="annual_income" className="form-control" value={formValues.annual_income.value} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Family members</label>
                            <Input type="number" name="family_members" className="form-control" value={formValues.family_members.value} onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Extra Allowances</label>
                            <Input type="number" name="extra_allowance" className="form-control" value={formValues.extra_allowance.value} onChange={handleChange}/>
                        </div>
                    </div>
                    <span className="m-2">{status?<p className="text-sucess">{message}</p>:<p className="text-danger">{message}</p>}</span>
                    <div className="row">
                        <button type="submit" className="btn btn-primary mx-5 col-2 " disabled={!isFormValid}>Save&Continue</button>
                        <Link href="/gaurdian/gaurdian_dashboard"><button type="button" className="btn btn-secondary col-2 mx-5 " >Exit</button></Link>
                    </div>
                </form>
            </section>
        </>
    )
}