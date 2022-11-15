import { useState,useEffect } from "react"
import { postData ,getData} from "../../utils/data_manage_service"
import Input from "./input_compent"
import Link from "next/link"
import { useRouter } from "next/router"
import { getLocalData } from "../../utils/storage_service"
export default function Education_details(props){
    let value="",isvalid=false
    const [message,setMessage]=useState("")
    const [status,setStatus]=useState(true)
    const router=useRouter()
    const application_number=router.query.application_id || getLocalData("application_id")
    const [formValues,setFormValues]=useState({
        grade:{value,isvalid},
        school:{value,isvalid},
        school_address:{value,isvalid},
        hobbies:{value,isvalid},
        aspirations:{value,isvalid},
        achievements:{value,isvalid}
    })
    const handleChange=(name,values,valid)=>{
        setStatus(true)
        setMessage("")
        setFormValues({...formValues,[name]:{value:values,isvalid:valid}})
    }
    useEffect(()=>{
        if(!isNaN(application_number)){
            const getprofile=async()=>{
                const result=await getData(`https://test-api.brightlife.org/brightlife/get/application/details?page=1&page_size=5&application_id=${application_number}`);
                const disable=(Object.keys(formValues)).every((item)=>(Object.keys(result?.data?.response?.data[0])).includes(item))
                if(disable){
                    setFormValues({
                        grade:{value:result?.data?.response?.data[0].grade,isvalid:true},
                        school_address:{value:result?.data?.response?.data[0].school_address,isvalid:true},
                        school:{value:result?.data?.response?.data[0].school,isvalid:true},
                        hobbies:{value:result?.data?.response?.data[0].hobbies,isvalid:true},
                        aspirations:{value:result?.data?.response?.data[0].aspirations,isvalid:true},
                        achievements:{value:result?.data?.response?.data[0].achievements,isvalid:true},
                    })
                }
            }
            getprofile();
        }
    },[]);
    const handleSubmit=async(e)=>{
        e.preventDefault()  
        const data = {
            application_id: application_number,
            grade:formValues.grade.value ,
            school:formValues.school.value ,
            school_address: formValues.school_address.value ,
            hobbies: formValues.hobbies.value ,
            aspirations:formValues.aspirations.value ,
            achievements: formValues.achievements.value 
        }
        const result=await(postData('https://test-api.brightlife.org/brightlife/update/education/details',data,1))
        if(result?.data?.status){
            props.screenvalue()
        }
        else{
            setStatus(result?.data?.status)
            setMessage(result?.data?.error?.message)
        }            
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
                            <label>Class</label>
                            <Input type="text"  name="grade" className="form-control" value={formValues.grade.value} onChange={handleChange}/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>School name</label>
                            <Input type="text" name="school" className="form-control" value={formValues.school.value} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>School Area/Address</label>
                            <Input type="text" name="school_address" className="form-control" value={formValues.school_address.value} onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Hobbies</label>
                            <Input type="text" name="hobbies" className="form-control" value={formValues.hobbies.value} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>What are the child's aspiration or Dream?</label>
                            <Input type="text-area" name="aspirations" className="form-control" value={formValues.aspirations.value} onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Any achievment or prizes won by the child?</label>
                            <Input type="text" name="achievements" className="form-control" value={formValues.achievements.value} onChange={handleChange}/>
                        </div>
                    </div>
                    <label>Keyoutcome I hope will be achieved?</label>
                    <div >
                        <input className="form-check" type="checkbox"/>
                        <label>Improve kids physical health</label>
                        <input className="form-check" type="checkbox" />
                        <label >Cover basic school needs</label>
                        <input className="form-check" type="checkbox"/>
                        <label >Increase Kids confidence/social acceptance</label>
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