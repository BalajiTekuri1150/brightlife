// import { useState } from "react"
// import { postApplicationData } from "../../utils/data_manage_service"
// import { getLocalData } from "../../utils/storage_service"
import { useRouter } from "next/router"
export default function Required_documents(){
    const router=useRouter()
    // const token=getLocalData("token")
    // let application_number=0
    // const handleChange=(e)=>{
        
        // application_number+=1
        // const data={
        //     application:application_number,
        //     document_type:"3",
        //     file_type:"jpg",
        //     url:e.target.value,
        //     seq_no:"5"
        // }
        // postApplicationData("https://test-api.brightlife.org/brightlife/add/application/documents",data,token)
        // .then((result) => {
        //     if(result?.data?.status){
        //         router.push({ 
        //             pathname: '/components/required_documents',
        //         })  
        //     }
        //     else{

        //     }
        // })
    // }
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
                            <label>Adhar card </label>
                            <input className="form-control form-control-sm" name="adhar_card" type="file"/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>Birth Certificate</label>
                            <input className="form-control form-control-sm" name="birth_certificate" type="file"/>
                        </div>
                    </div>
                    <div className="row m-5">
                        <div className="col-5 mx-4">
                            <label>Pan card </label>
                            <input className="form-control form-control-sm" name="pan_card" type="file" />
                        </div>
                        <div className="col-5 mx-4">
                            <label>Ration/Income proof</label>
                            <input className="form-control form-control-sm" name="ration_card" type="file" />
                        </div>
                    </div>
                    <div className="row m-5">
                        <div className="col-5 mx-4">
                            <label>Health certificate</label>
                            <input className="form-control form-control-sm" type="file" name="health_certificate" />
                        </div>
                        <div className="col-5 mx-4">
                            <label>Disability Certificate</label>
                            <input className="form-control form-control-sm" type="file" name="disability_Certificate" />
                        </div>
                    </div>
                    <div className="row m-5">
                        <div className="col-5 mx-4">
                            <label>Schools admission documents</label>
                            <input className="form-control form-control-sm" type="file" name="schools_documents" />
                        </div>
                        <div className="col-5 mx-4">
                            <label>Report card</label>
                            <input className="form-control form-control-sm"  name="report_card" type="file"/>
                        </div>
                    </div>
                    {/* <span className="m-2">{status?<p className="text-sucess">{message}</p>:<p className="text-danger">{message}</p>}</span> */}
                    <div className="row">
                        <button type="submit" className="btn btn-primary mx-5 col-2 ">Save&Continue</button>
                        <button type="button" className="btn btn-secondary col-2 mx-5">Exit</button>
                    </div>
                </form>
            </section>
        </>
    )
}