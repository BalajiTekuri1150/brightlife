import Input from "./input_compent"
import { useState } from "react"
export default function Gaurdian_Profile(){
    let value="",isvalid=false
    // const [message,setMessage]=useState("")
    // const [status,setStatus]=useState(true)
    const [formValues,setFormValues]=useState({
        firstName:{value,isvalid},
        lastName:{value,isvalid},
        organization:{value,isvalid},
        mobile:{value,isvalid},
        email:{value,isvalid},
        address:{value,isvalid},
        city:{value,isvalid},
        state:{value,isvalid},
        postalCode:{value,isvalid},
        conutry:{value,isvalid}
    })
    const handleSubmit=async(e)=>
    {
        e.preventDefault()   
        // const data = {
        //     profile:formValues.profile.value,
        //     name: formValues.username.value,
        //     birthday:formValues.bday.value,
        //     gender_id: formValues.gender.value,
        //     email:formValues.email.value,
        //     mobile: formValues.mobile.value,
        //     child_type_id: formValues.child.value
        // }
        // const result=await(postData('https://test-api.brightlife.org/brightlife/add/application/profile',data))
        // if(result?.data?.status){
        //     setLocalData("id",result?.data?.response.data.id)
        //     router.push({ 
        //         pathname: '/components/gaurdian_details',
        //     })  
        // }
        // else{
        //     setStatus(result?.data?.status)
        //     setMessage(result?.data?.error?.message)
        // }           
    }
    const handleChange=(name,values,valid)=>{
        setStatus(true)
        setMessage("")
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
                            <label>First Name</label>
                            <Input type="text"  name="username" className="form-control" onChange={handleChange}/> 
                        </div>
                        <div className="col-5 mx-4">
                            <label>LastName</label>
                            <Input type="text" name="username" className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Organization</label>
                            <Input type="text" name="organization" className="form-control" onChange={handleChange}/>
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
                            <label>How did you hear aboiut us</label>
                            <Input type="tel" name="mobile" className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Address</label>
                            <Input type="text" name="address" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>City</label>
                            <Input type="text" name="city" className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>State</label>
                            <Input type="text" name="state" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Country</label>
                            <Input type="text" name="country" className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Postal code</label>
                            <Input type="number" name="postcode" className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" className="btn btn-primary mx-5 col-2 " disabled={!isFormValid}>Save&Continue</button>
                        <button type="button" className="btn btn-secondary col-2 mx-5 " >Exit</button>
                    </div>
                </form>
            </section>
        </>
    )
}