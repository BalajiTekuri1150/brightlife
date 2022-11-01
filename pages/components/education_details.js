import { useRouter } from "next/router"
import { useState } from "react"
import { getLocalData } from "../../utils/storage_service"
import { postData } from "../../utils/data_manage_service"
import Input from "./input_compent"
export default function Education_details(){
    let value="",isvalid=false,validation=[]
    const [message,setMessage]=useState("")
    const [status,setStatus]=useState(true)
    const router=useRouter()
    const id=getLocalData("id")
    const [formValues,setFormValues]=useState({
        grade:{value,isvalid},
        school_name:{value,isvalid},
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
    const handleSubmit=async(e)=>
    {
        e.preventDefault()  
        const data = {
            application_id: id,
            grade:e.target.grade.value ,
            school: e.target.school_name.value ,
            school_address: e.target.school_address.value ,
            hobbies: e.target.hobbies.value ,
            aspirations:e.target.aspirations.value ,
            achievements: e.target.achievements.value 
        }
        const result=await(postData('https://test-api.brightlife.org/brightlife/update/education/details',data))
        if(result?.data?.status){
            router.push({ 
                pathname: '/components/required_documents',
            })  
        }
        else{
            setDisable(false)
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
                            <Input type="text"  name="grade" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>School name</label>
                            <Input type="text" name="school_name" className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>School Area/Address</label>
                            <Input type="text" name="school_address" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Hobbies</label>
                            <Input type="text" name="hobbies" className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>What are the child's aspiration or Dream?</label>
                            <Input type="text-area" name="aspirations" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Any achievment or prizes won by the child?</label>
                            <Input type="text" name="achievements" className="form-control" onChange={handleChange}/>
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
                        <button type="button" className="btn btn-secondary col-2 mx-5 ">Exit</button>
                    </div>
                </form>
            </section>
        </>
    )
}