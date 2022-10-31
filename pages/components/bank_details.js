import { useState } from "react"
import { getLocalData } from "../../utils/storage_service"
import { postApplicationData } from "../../utils/data_manage_service"
import Input from "./input_compent"
export default function Bank_details(){
    let value="",isvalid=false,validation=[]
    const [message,setMessage]=useState("")
    const [status,setStatus]=useState(true)
    const [disable,setDisable]=useState(true)
    const id=getLocalData("id")
    const token=getLocalData("token")
    const [formValues,setFormValues]=useState({
        bank_name:{value,isvalid},
        state:{value,isvalid},
        postal_code:{value,isvalid},
        account_holder:{value,isvalid},
        account_number:{value,isvalid},
        branch:{value,isvalid},
        ifsc:{value,isvalid}
    })
    const handleChange=(name,values,valid)=>{
        setStatus(true)
        setMessage("")
        setFormValues({...formValues,[name]:{value:values,isvalid:valid}})
        for(let x in formValues){
            validation.push(formValues[x].isvalid)
        }
        function check(x){
            return x===true
        }
        setDisable(!validation.every(check))
    }
    const handleSubmit=async(e)=>
    {
        setDisable(true)
        e.preventDefault()        
        const data = {
            application_id:id,
            bank_name:e.target.bank_name.value,
            state:e.target.state.value,
            postal_code:e.target.postal_code.value,
            account_holder:e.target.account_holder.value,
            account_number:e.target.account_number.value,
            branch:e.target.branch.value,
            ifsc: e.target.ifsc.value
        }
        const JSONdata = JSON.stringify(data)
        postApplicationData('https://test-api.brightlife.org/brightlife/add/bank/details',JSONdata,token)
        .then((result) => {
            if(result?.data?.status){
                setStatus(result?.data?.status)
                setMessage("Application submitted for verification")
            }
            else{
                setDisable(false)
                setStatus(result?.data?.status)
                setMessage(result?.data?.error?.message?.account_holder)
            }
        })            
    }
    return(
        <>
            <section className="form">
                <form className="bg-light px-5 pt-5" onSubmit={handleSubmit}>
                    <h5 className="mb-5">Bank Details</h5>
                    <div className="row">
                        <div className="col-5 mx-4">
                            <label>Bank name</label>
                            <Input type="text"  name="bank_name" className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>Branch</label>
                            <Input type="text" name="branch" className="form-control"  onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>state</label>
                            <Input type="text" name="state" className="form-control"  onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Postal code</label>
                            <Input type="number" name="postal_code" className="form-control"  onChange={handleChange}/>
                        </div>
                    </div>
                    <hr/>
                    <h5 className="mt-5">Account Details</h5>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Account Holder</label>
                            <Input type="text" name="account_holder" className="form-control"  onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Account Number</label>
                            <Input type="number" name="account_number" className="form-control"  onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="col-5 m-4">
                        <label>IFSC code</label>
                        <Input type="text" name="ifsc" className="form-control"  onChange={handleChange}/>
                    </div>
                    <span className="m-2">{status?<p className="text-sucess">{message}</p>:<p className="text-danger">{message}</p>}</span>
                    <div className="row">
                        <button type="submit" className="btn btn-primary mx-5 col-2 " disabled={disable}>Submit for verification</button>
                        <button type="button" className="btn btn-secondary col-2 mx-5 " >Exit</button>
                    </div>
                </form>
            </section>
        </>
    )
}