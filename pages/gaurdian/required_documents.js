import { getData,postData } from "../../utils/data_manage_service"
import { useRouter } from "next/router"
import { useState } from "react"
import axios from "axios"
import { getLocalData } from "../../utils/storage_service"
import Link from "next/link"
let number_of_documents=0,document_type
export default function Required_documents(){
    const router=useRouter()
    const application_number=router.query.application_id
    let value=0,isvalid=false
    const [disable,setDisable]=useState(true)
    const id=getLocalData("application_id")
    const token=getLocalData("token")
    const [formValues,setFormValues]=useState({
        Aadhar:{value,isvalid},
        Birth_certificate:{value,isvalid},
        PAN:{value,isvalid},
        Disability_certificate:{value,isvalid}
    })
    // useEffect(()=>{
    //     const getprofile=async()=>{
    //         const result=await getData(`https://test-api.brightlife.org/brightlife/get/application/documents?application_id=${application_number}`);
    //         setFormValues({
    //             Aadhar:{value:result?.data?.response?.data[0].grade,isvalid:true},
    //             school_address:{value:result?.data?.response?.data[0].school_address,isvalid:true},
    //             school_name:{value:result?.data?.response?.data[0].school,isvalid:true},
    //             hobbies:{value:result?.data?.response?.data[0].hobbies,isvalid:true},
    //             aspirations:{value:result?.data?.response?.data[0].aspirations,isvalid:true},
    //             achievements:{value:result?.data?.response?.data[0].achievements,isvalid:true},
    //         })
    //     }
    //     getprofile();
    // },[]);
    const handleChange=async(e)=>{
        if(e.target.value===""){
            number_of_documents==0?number_of_documents=0:number_of_documents-=1
            setFormValues({...formValues,[e.target.name]:{value:0,isvalid:false}})
            // const result=await(postData('https://test-api.brightlife.org/brightlife/remove/application/documents',ids))
        }
        else{
            if(!formValues[e.target.name]?.isvalid){
                number_of_documents+=1
            }
            if(number_of_documents>=3){
                setDisable(false)
            }
            setFormValues({...formValues,[e.target.name]:{value:1,isvalid:true}})
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
            axios({
                method: "POST",
                url: "https://test-api.brightlife.org/brightlife/add/application/documents",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "token "+token
                },
                data: formData
            })            
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        router.push({ 
            pathname: '/gaurdian/bank_details',
            query:{"application_id":application_number}
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
                            <input className="form-control form-control-sm" name="Birth_certificate" type="file" onChange={handleChange}/>
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
                            <input className="form-control form-control-sm" type="file" name="Disability_certificate" onChange={handleChange} />
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
                        <button type="submit" className="btn btn-primary mx-5 col-2" >Save&Continue</button>
                        <Link href="/gaurdian/gaurdian_dashboard"><button type="button" className="btn btn-secondary col-2 mx-5 " >Exit</button></Link>
                    {/* disabled={disable} */}
                    </div>
                </form>
            </section>
        </>
    )
}