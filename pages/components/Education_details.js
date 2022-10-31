import { useRouter } from "next/router"
import { useState } from "react"
import { getLocalData } from "../../utils/storage_service"
import { postApplicationData } from "../../utils/data_manage_service"
export default function Education_details(){
    const [message,setMessage]=useState("")
    const [status,setStatus]=useState(true)
    const [disable,setDisable]=useState(false)
    const router=useRouter()
    const token=getLocalData("token")
    const id=getLocalData("id")
    const handleSubmit=async(e)=>
    {
        setDisable(true)
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
        const JSONdata = JSON.stringify(data)
        postApplicationData('https://test-api.brightlife.org/brightlife/update/education/details',JSONdata,token)
        .then((result) => {
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
        })            
    }
    return(
        <>
            <section className="form">
                <form className="bg-light px-5 pt-5" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-5 mx-4">
                            <label>Class</label>
                            <input type="text"  name="grade" className="form-control"/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>School name</label>
                            <input type="text" name="school_name" className="form-control"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>School Area/Address</label>
                            <input type="text" name="school_address" className="form-control"/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Hobbies</label>
                            <input type="text" name="hobbies" className="form-control"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>What are the child's aspiration or Dream?</label>
                            <input type="text-area" name="aspirations" className="form-control"/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Any achievment or prizes won by the child?</label>
                            <input type="text" name="achievements" className="form-control"/>
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
                        <button type="submit" className="btn btn-primary mx-5 col-2 " disabled={disable}>Save&Continue</button>
                        <button type="button" className="btn btn-secondary col-2 mx-5 " disabled={disable}>Exit</button>
                    </div>
                </form>
            </section>
        </>
    )
}