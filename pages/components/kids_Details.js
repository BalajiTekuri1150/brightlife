import { useRouter } from "next/router"
import { useState } from "react"
import { getLocalData,setLocalData } from "../../utils/storage_service"
import { postApplicationData } from "../../utils/data_manage_service"
import Input from "./input_compent"
export default function Kids_details(){
    let value="",isvalid=false,validation=[]
    const [message,setMessage]=useState("")
    const [status,setStatus]=useState(true)
    const [disable,setDisable]=useState(true)
    const router=useRouter()
    const token=getLocalData("token")
    const [formValues,setFormValues]=useState({
        profile:{value,isvalid},
        username:{value,isvalid},
        bday:{value,isvalid},
        mobile:{value,isvalid},
        email:{value,isvalid},
        child:{value,isvalid},
        gender:{value,isvalid}
    })
    const handleSubmit=async(e)=>
    {
        e.preventDefault()   
        const data = {
            profile:formValues.profile.value,
            name: formValues.username.value,
            birthday:formValues.bday.value,
            gender_id: formValues.gender.value,
            email:formValues.email.value,
            mobile: formValues.mobile.value,
            child_type_id: formValues.child.value
        }
        console.log(data)
        const JSONdata = JSON.stringify(data)
        postApplicationData('https://test-api.brightlife.org/brightlife/add/application/profile',JSONdata,token)
        .then((result) => {
            if(result?.data?.status){
                setLocalData("id",result?.data?.response.data.id)
                router.push({ 
                    pathname: '/components/gaurdian_details',
                })  
            }
            else{
                setStatus(result?.data?.status)
                setMessage(result?.data?.error?.message)
            }
        })            
    }
    const handleChange=(name,values,valid)=>{
        setStatus(true)
        setMessage("")
        setFormValues({...formValues,[name]:{value:values,isvalid:valid}})
        // for(let x in formValues){
        //     validation.push(formValues[x].isvalid)
        // }
        // function check(x){
        //     return x===true
        // }
        // setDisable(!validation.every(check))

    }
    const handleRadio=(e)=>{
        setFormValues({...formValues,[e.target.name]:{value:e.target.value,isvalid:true}})
        // for(let x in formValues){
        //     validation.push(formValues[x].isvalid)
        // }
        // function check(x){
        //     return x===true
        // }
        // setDisable(!validation.every(check))
    }
    const isFormValid=Object.keys(formValues).every((key)=>{
        return formValues[key].isvalid
    })
    return(
        <>
            <section className="form">
                <form className="bg-light px-5 pt-5" onSubmit={handleSubmit}>
                <input type="file"  name="profile" className="form-control" onChange={handleRadio}/>
                <label className="m-2">Upload Kids picture</label>
                    <div className="row">
                        <div className="col-5 mx-4">
                            <label>Name</label>
                            <Input type="text"  name="username" className="form-control" onChange={handleChange}/> 
                        </div>
                        <div className="col-5 mx-4">
                            <label>Birthday</label>
                            <Input type="date" name="bday" className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Age</label>
                            <Input type="number" name="age" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Email Address</label>
                            <Input type="email" name="email" className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Mobile Number</label>
                            <Input type="tel" name="mobile" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Is the child</label>
                            <div className="form-check">
                                <label><input className="form-check-input" type="radio" name="child" value="1" onChange={handleRadio}/>orphan</label>
                                <label><input className="form-check-input m-1" type="radio" name="child" value="2" onChange={handleRadio}/>Live with parents</label>
                            </div>
                        </div>
                        <div className="col-5 m-4">
                            <label>Gender</label>
                            <div className="form-check">
                                <label><input className="form-check-input" type="radio" name="gender" value="2" onChange={handleRadio}/>female</label>
                                <label><input className="form-check-input m-1" type="radio" name="gender" value="1" onChange={handleRadio}/>male</label>
                            </div>
                        </div>
                    </div>
                    <span className="m-2">{status?<p className="text-sucess">{message}</p>:<p className="text-danger">{message}</p>}</span>
                    <div className="row">
                        <button type="submit" className="btn btn-primary mx-5 col-2 " disabled={!isFormValid}>Save&Continue</button>
                        <button type="button" className="btn btn-secondary col-2 mx-5 " >Exit</button>
                    </div>
                </form>
            </section>
        </>
    )
}