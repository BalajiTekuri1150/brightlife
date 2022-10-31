import { postData } from "../../utils/data_manage_service"
import { useRouter } from "next/router"
import { useState } from "react"
import { getLocalData } from "../../utils/storage_service"
export default function Required_documents(){
    const router=useRouter()
    // const [disable,setDisable]=useState(true)
    const id=getLocalData("id")
    let number_of_documents=0,data={}
    const handleChange=async(e)=>{
        if(number_of_documents>=3){
            setDisable(false)
        }
        number_of_documents+=1
        if(e.target.name==="adhar_card"){
                data={
                application:id,
                document_type:"aadhar",
                file_type:"jpg",
                url:e.target.value,
                seq_no:number_of_documents
            }
        }
        const result=await(postData("https://test-api.brightlife.org/brightlife/add/application/documents",data)) 
        console.log(result)       
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        router.push({ 
            pathname: '/components/bank_details',
        })          
    }
    return(
        <>
            <section className="form">
                <form className="bg-light px-5 pt-5" onSubmit={handleSubmit} >
                Please submit minimum of 3 documents mentioned in below list.
                    <div className="row m-5">
                        <div className="col-5 mx-4">
                            <label>Adhar card* </label>
                            <input className="form-control form-control-sm" name="adhar_card" type="file" recquired={true} onChange={handleChange}/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>Birth Certificate*</label>
                            <input className="form-control form-control-sm" name="birth_certificate" type="file" recquired={true} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row m-5">
                        <div className="col-5 mx-4">
                            <label>Pan card </label>
                            <input className="form-control form-control-sm" name="pan_card" type="file" onChange={handleChange}/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>Ration/Income proof</label>
                            <input className="form-control form-control-sm" name="ration_card" type="file" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row m-5">
                        <div className="col-5 mx-4">
                            <label>Health certificate</label>
                            <input className="form-control form-control-sm" type="file" name="health_certificate" onChange={handleChange}/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>Disability Certificate</label>
                            <input className="form-control form-control-sm" type="file" name="disability_Certificate" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row m-5">
                        <div className="col-5 mx-4">
                            <label>Schools admission documents</label>
                            <input className="form-control form-control-sm" type="file" name="schools_documents" onChange={handleChange}/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>Report card</label>
                            <input className="form-control form-control-sm"  name="report_card" type="file" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" className="btn btn-primary mx-5 col-2 ">Save&Continue</button>
                        <button type="button" className="btn btn-secondary col-2 mx-5">Exit</button>
                    </div>
                </form>
            </section>
        </>
    )
}