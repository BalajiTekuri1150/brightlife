import { useRouter } from "next/router"
import { useState } from "react"
import { getLocalData,setLocalData } from "../../utils/storage_service"
import { postApplicationData } from "../../utils/data_manage_service"
export default function Kids_details(){
    let value="",isvalid=false
    const [message,setMessage]=useState("")
    const [status,setStatus]=useState(true)
    const [errormsg,setErrormsg]=useState("")
    const [estatus,setEstatus]=useState("")
    const [disable,setDisable]=useState(false)
    const router=useRouter()
    const token=getLocalData("token")
    const [formValues,setFormValues]=useState({
        username:{value,isvalid},
        bday:{value,isvalid},
        mobile:{value,isvalid},
        email:{value,isvalid}
    })
    const handleSubmit=async(e)=>
    {
        e.preventDefault()
        setDisable(true)
        let gender,child
        let gender_type=document.getElementsByName("gender")
        let child_type=document.getElementsByName("child")
        for(let i = 0; i < gender_type.length; i++) {
            if(gender_type[i].checked){
                gender=gender_type[i].value
            }
            if(child_type[i].checked){
                child=child_type[i].value
            }
        }        
        const data = {
            name: e.target.uname.value,
            birthday:e.target.bday.value,
            gender_id: gender,
            email: e.target.email.value,
            mobile: e.target.mobile.value,
            child_type_id: child
        }
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
                setDisable(false)
                setStatus(result?.data?.status)
                setMessage(result?.data?.error?.message)
            }
        })            
    }
    const handleChange=(name,values,valid)=>{
        setStatus(true)
        setMessage("")
        setFormValues({...formValues,[name]:{value:values,isvalid:valid}})
    }
    return(
        <>
            <section className="form">
                <form className="bg-light px-5 pt-5" onSubmit={handleSubmit}>
                <input type="file"  name="profile" className="form-control"/>
                <label className="m-2">Upload Kids picture</label>
                    <div className="row">
                        <div className="col-5 mx-4">
                            <label>Name</label>
                            <input type="text"  name="uname" className="form-control" onChange={handleChange}/>
                            {estatus?<p className="text-success">{errormsg}</p>:<p className="text-danger">{errormsg}</p>} 
                        </div>
                        <div className="col-5 mx-4">
                            <label>Birthday</label>
                            <input type="date" name="bday" className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Age</label>
                            <input type="number" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Email Address</label>
                            <input type="email" name="email" className="form-control" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Mobile Number</label>
                            <input type="tel" name="mobile" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Is the child</label>
                            <div className="form-check">
                                <label><input className="form-check-input" type="radio" name="child" value="1"/>orphan</label>
                                <label><input className="form-check-input m-1" type="radio" name="child" value="2" />Live with parents</label>
                            </div>
                        </div>
                        <div className="col-5 m-4">
                            <label>Gender</label>
                            <div className="form-check">
                                <label><input className="form-check-input" type="radio" name="gender" value="2"/>female</label>
                                <label><input className="form-check-input m-1" type="radio" name="gender" value="1"/>male</label>
                            </div>
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