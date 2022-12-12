import { useState,useEffect } from "react"
import { postData ,getData} from "../../utils/data_manage_service"
import { getLocalData } from "../../utils/storage_service"
import Input from "./input_compent"
import { useRouter } from "next/router"
import Link from "next/link"
export default function Bank_details(props){
    let value="",isvalid=false,result
    const [bank_id,setBank_id]=useState(0)
    const [message,setMessage]=useState("")
    const [update,setUpdate]=useState(false)
    const [status,setStatus]=useState(true)
    const router=useRouter()
    const application_number=router.query.appication_id || getLocalData("appication_id")
    const [formValues,setFormValues]=useState({
        bank_name:{value,isvalid},
        state:{value,isvalid},
        postal_code:{value,isvalid},
        account_holder:{value,isvalid},
        account_number:{value,isvalid},
        branch:{value,isvalid},
        ifsc:{value,isvalid}
    })
    useEffect(()=>{
        if(!isNaN(application_number)){
            const getprofile=async()=>{
                const result=await getData(`https://test-api.brightlife.org/brightlife/get/bank/details?application_id=${application_number}`);
                setUpdate(result?.data?.status)
                setBank_id(result?.data?.response?.id)
                if(result?.data?.status){
                    setFormValues({
                        bank_name:{value:result?.data?.response?.bank_name,isvalid:true},
                        state:{value:result?.data?.response?.state,isvalid:true},
                        postal_code:{value:result?.data?.response?.postal_code,isvalid:true},
                        account_holder:{value:result?.data?.response?.account_holder,isvalid:true},
                        account_number:{value:result?.data?.response?.account_number,isvalid:true},
                        branch:{value:result?.data?.response?.branch,isvalid:true},
                        ifsc:{value:result?.data?.response?.ifsc,isvalid:true}
                    })
                }
            }
            getprofile();
        }
    },[]);
    const handleChange=(name,values,valid)=>{
        setStatus(true)
        setMessage("")
        setFormValues({...formValues,[name]:{value:values,isvalid:valid}})
    }
    const handleSubmit=async(e)=>
    {
        e.preventDefault()  
        console.log(e.target.bank_name.value)  
        const data = {
            application_id:application_number,
            bank_name:e.target.bank_name.value,
            state:e.target.state.value,
            postal_code:Number(e.target.postal_code.value),
            account_holder:e.target.account_holder.value,
            account_number:parseInt(e.target.account_number.value),
            branch:e.target.branch.value,
            ifsc: e.target.ifsc.value
        }
        if(update){
            data.id=bank_id
            // console.log("in update",bank_id)
            result=await(postData('https://test-api.brightlife.org/brightlife/update/bank/details',data,1))
        }
        else{
            result=await(postData('https://test-api.brightlife.org/brightlife/add/bank/details',data,1))
        }
        setStatus(result?.data?.status)
        if(result?.data?.status){
            setMessage("Application submitted for verification")
            router.push({
                pathname:"/gaurdian/gaurdian_dashboard"
            })
        }
        else{
            setMessage(result?.data?.error?.message)
        }          
    }
    const isFormValid=Object.keys(formValues).every((key)=>{
        return formValues[key].isvalid
    })
    let handleExit=()=>
    {
      props.handleExitButton();
    }
    return(
        <div style={{width:'1200px'}}>
            <div className="steps-wizard">
                <div className="step1-wizard">
                <a>
                    <div className="step">1</div>
                    <p style={{color: '#2a2a2a'}}>Kids details</p></a>
                </div>  
                <div className="step1-wizard step-active">
                <a>
                    <div className="step1">2</div>
                    <p>Guardian details</p>
                </a>
                </div>  
                <div className="step1-wizard step-active">
                <a>
                    <div className="step1">3</div>
                    <p>Education details</p>
                </a>
                </div>  
                <div className="step1-wizard step-active">
                <a>
                    <div className="step1">4</div>
                    <p>Required Documents</p>
                </a>
                </div>  
                <div className="step1-wizard step-active">
                <a>
                    <div className="step1">5</div>
                    <p>Bank details</p>
                </a>
                </div>                     
            </div>
            <div className="application-form-card">
                <form onSubmit={handleSubmit}> 
                    <div className="row sponsor-block bg-white">
                        <div className="col-lg-12 bank-details-head">
                        <h4>Bank Details</h4>
                        </div>
                        <div className="col-lg-6">
                        <div className="form-group">
                            <label>Bank Name</label>
                            <Input type="text" name="bank_name" className="form-control" value={formValues.bank_name?.value} onChange={handleChange}/>
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="form-group">
                            <label>Branch and Address</label>
                            {/* <input type="text" className="form-control" />             */}
                            <Input type="text" name="branch" className="form-control" value={formValues.branch.value} onChange={handleChange}/>
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="form-group">
                            <label>State</label>
                            <Input type="text" name="state" className="form-control" value={formValues.state.value} onChange={handleChange}/>
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="form-group">
                            <label>Postal Code</label>
                            <Input type="number" name="postal_code" className="form-control" value={formValues.postal_code.value} onChange={handleChange}/>
                        </div>
                        </div>
                        <div className="details-divid col-md-12" />    
                        <div className="col-lg-12 bank-details-head">
                        <h4>Account Details</h4>
                        </div>
                        <div className="col-lg-6">
                        <div className="form-group">
                            <label>Account Holder</label>
                            <Input type="text" name="account_holder" className="form-control" value={formValues.account_holder.value} onChange={handleChange}/>
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="form-group">
                            <label>Account number</label>
                            <Input type="number" name="account_number" className="form-control" value={formValues.account_number.value} onChange={handleChange}/>
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="form-group">
                            <label>IFSC Code</label>
                            <Input type="text" name="ifsc" className="form-control" value={formValues.ifsc.value} onChange={handleChange}/>
                        </div>
                        </div>                
                        <div className="col-lg-12 application-btns">
                        {/* <button type="submit" className="sponsor-save-btn">Submit for verification</button> */}
                        <button type="submit" className="sponsor-save-btn" disabled={!isFormValid}>Submit for verification</button>
                        <div className="sponsor-exit-btn" onClick={handleExit}>Exit</div>
                        </div>
                    </div>
                </form>
            </div>
            {/* <section className="form">
                <form className="bg-light px-5 pt-5" onSubmit={handleSubmit}>
                    <h5 className="mb-5">Bank Details</h5>
                    <div className="row">
                        <div className="col-5 mx-4">
                            <label>Bank name</label>
                            <Input type="text"  name="bank_name" className="form-control" value={formValues.bank_name.value} onChange={handleChange}/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>Branch</label>
                            <Input type="text" name="branch" className="form-control" value={formValues.branch.value} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>state</label>
                            <Input type="text" name="state" className="form-control" value={formValues.state.value} onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Postal code</label>
                            <Input type="number" name="postal_code" className="form-control" value={formValues.postal_code.value} onChange={handleChange}/>
                        </div>
                    </div>
                    <hr/>
                    <h5 className="mt-5">Account Details</h5>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Account Holder</label>
                            <Input type="text" name="account_holder" className="form-control" value={formValues.account_holder.value} onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Account Number</label>
                            <Input type="number" name="account_number" className="form-control" value={formValues.account_number.value} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="col-5 m-4">
                        <label>IFSC code</label>
                        <Input type="text" name="ifsc" className="form-control" value={formValues.ifsc.value} onChange={handleChange}/>
                    </div>
                    <span className="m-2">{status?<div className="text-sucess">{message}</div>:<div className="text-danger">{message}</div>}</span>
                    <div className="row">
                        <button type="submit" className="btn btn-primary mx-5 col-2 " disabled={!isFormValid}>Submit for verification</button>
                        <Link href="/gaurdian/gaurdian_dashboard"><button type="button" className="btn btn-secondary col-2 mx-5 " >Exit</button></Link>
                    </div>
                </form>
            </section> */}
        </div>
    )
}