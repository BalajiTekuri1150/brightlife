import { getData,postData } from "../../utils/data_manage_service"
import { useRouter } from "next/router"
import { useState } from "react"
import { DataManager } from '@syncfusion/ej2-data';
import { getLocalData } from "../../utils/storage_service"
import Link from "next/link"
let number_of_documents=0
export default function Required_documents(){
    const router=useRouter()
    const [status,seStatus]=useState(true)
    const [message,setMessage]=useState("")
    const id=getLocalData("application_id")
    const token=getLocalData("token")
    const handleChange=async(e)=>{
        seStatus(true)
        setMessage("")
        number_of_documents+=1
        let document_type
        const file_type=e.target.value.split(".")
        const result=await(getData("https://test-api.brightlife.org/brightlife/list/document/types")) 
        for (let i = 0; i < result?.data?.response?.data?.length; i++) {
            if(result?.data?.response?.data[i].name==e.target.name){
                document_type=result?.data?.response?.data[i]?.id
            }
        }
        const formData = new FormData()
        formData.append("application", id);
        formData.append("seq_no", number_of_documents);
        formData.append("url", e.target.files[0]);
        formData.append("file_type", file_type[file_type.length-1]);
        formData.append("document_type",document_type);
        let dataManager = new DataManager()
        const fileData = await dataManager.postData("https://test-api.brightlife.org/brightlife/add/application/documents", formData).catch(e => { });
        if (!!fileData && fileData.status) {
            this.setState(() => { return { disableSearch: false } });
            this.setState(() => { return { input_image: fileData.response.path } })
        }
        
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        router.push({ 
            pathname: '/gaurdian/bank_details',
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
                            <input className="form-control form-control-sm" name="Aadhar" type="file"  onChange={handleChange}/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>Birth Certificate*</label>
                            <input className="form-control form-control-sm" name="Birth Certificate" type="file" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row m-5">
                        <div className="col-5 mx-4">
                            <label>Pan card </label>
                            <input className="form-control form-control-sm" name="PAN" type="file" onChange={handleChange}/>
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
                            <input className="form-control form-control-sm" type="file" name="Disability Certificate" onChange={handleChange} />
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
                    {status?<p></p>:<p className="text-danger">{message}</p>}
                    <div className="row">
                        <button type="submit" className="btn btn-primary mx-5 col-2" >Save&Continue</button>
                        <Link href="/gaurdian/gaurdian_dashboard"><button type="button" className="btn btn-secondary col-2 mx-5 " >Exit</button></Link>
                    </div>
                </form>
            </section>
        </>
    )
}