import { useState,useEffect } from "react"
import { postData ,getData} from "../../utils/data_manage_service"
import Input from "./input_compent"
import Link from "next/link"
import { useRouter } from "next/router"
import { getLocalData } from "../../utils/storage_service"
import Script from "next/script";
import Head from "next/head"
export default function Gaurdian_details(props){
    let value="",isvalid=false
    const router=useRouter()
    const [message,setMessage]=useState("")
    const [status,setStatus]=useState(true)
    const application_number=getLocalData("application_id" ) || router.query.appication_id
    const [formValues,setFormValues]=useState({
        profession:{value,isvalid},
        annual_income:{value,isvalid},
        family_members:{value,isvalid},
        extra_allowance:{value,isvalid},
    })
    useEffect(()=>{
        if(!isNaN(application_number)){
            const getprofile=async()=>{
                console.log(application_number)
                const result=await getData(`https://test-api.brightlife.org/brightlife/get/application/details?page=1&page_size=5&application_id=${application_number}`);
                const disable=(Object.keys(formValues)).every((item)=>(Object.keys(result?.data?.response?.data[0])).includes(item))
                if(disable){
                    setFormValues({
                        profession:{value:result?.data?.response?.data[0].profession,isvalid:true},
                        annual_income:{value:result?.data?.response?.data[0].annual_income,isvalid:true},
                        family_members:{value:result?.data?.response?.data[0].family_members,isvalid:true},
                        extra_allowance:{value:result?.data?.response?.data[0].extra_allowance,isvalid:true},
                    })
                }
            }
            getprofile();
        }
    },[]);
    // console.log(application_number)
    const handleSubmit=async(e)=>
    {
        e.preventDefault()  
        console.log(application_number)
        const data = {
            application_id: application_number,
            profession: formValues.profession.value,
            annual_income: Number(formValues.annual_income.value),
            family_members: Number(formValues.family_members.value),
            extra_allowance: Number(formValues.extra_allowance.value)
        } 
        const result=await(postData('https://test-api.brightlife.org/brightlife/update/guardian/details',data,1))
        if(result?.data?.status){
            props.screenvalue()
        }
        else{
            setStatus(result?.data?.status)
            setMessage(result?.data?.error?.message)
        }            
    }
    const handleChange=(name,values,valid)=>{
        setMessage("")
        setStatus(true)
        setFormValues({...formValues,[name]:{value:values,isvalid:valid}})
    }
    const isFormValid=Object.keys(formValues).every((key)=>{
        return formValues[key].isvalid
    })
    let handleExit=()=>
    {
      props.handleExitButton();
    }
    return(
        <div>
            <Head>
                <title>Brightlife</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" />
            </Head>
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
                <div className="step1-wizard">
                <a>
                    <div className="step1">3</div>
                    <p>Education details</p>
                </a>
                </div>  
                <div className="step1-wizard">
                <a>
                    <div className="step1">4</div>
                    <p>Required Documents</p>
                </a>
                </div>  
                <div className="step1-wizard">
                <a>
                    <div className="step1">5</div>
                    <p>Bank details</p>
                </a>
                </div>                     
            </div>
            <div className="application-form-card">
                <form onSubmit={handleSubmit}> 
                    <div className="row sponsor-block bg-white">
                        <div className="col-lg-6">
                        <div className="form-group">
                            <label>Profession</label>
                            <Input type="text" className="form-control" name="profession" value={formValues.profession.value} onChange={handleChange}/>            
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="form-group">
                            <label>Annual Income</label>
                            <Input type="number" className="form-control" name="annual_income" value={formValues.annual_income.value} onChange={handleChange}/>            
                            {/* <select className="form-control">
                            <option />    
                            <option>less than 50000</option>
                            <option>less than 40000</option>
                            <option>less than 30000</option>
                            </select>   */}
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="form-group">
                            <label>Family Members</label>
                            <Input type="number" className="form-control" name="family_members" value={formValues.family_members.value} onChange={handleChange}/>            
                            {/* <select className="form-control">
                            <option />
                            <option>Member1</option>
                            <option>Member2</option>
                            <option>Member3</option>
                            </select>   */}
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="form-group">
                            <label>Extra Allowance</label>
                            <Input type="text" name="extra_allowance" className="form-control" value={formValues.extra_allowance.value} onChange={handleChange}/>
                        </div>
                        </div>
                        <span className="m-2">{status?<p className="text-sucess">{message}</p>:<p className="text-danger">{message}</p>}</span>
                        <div className="col-lg-12 application-btns">
                        <button type="submit" className="sponsor-save-btn " disabled={!isFormValid}>Save&Continue</button>
                        <button className="sponsor-exit-btn" onClick={handleExit}>Exit</button>
                        </div>
                    </div>
                </form>
             </div>
            <Script src="js/jquery.slim.min.js"></Script>
            <Script src="js/popper.min.js"></Script>
            <Script src="js/bootstrap.bundle.min.js"></Script>
            <Script src="js/custom.js"></Script>
            {/* <section className="form">
                <form className="bg-light px-5 pt-5" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-5 mx-4">
                            <label>Profession</label>
                            <Input type="text"  name="profession" className="form-control" value={formValues.profession.value} onChange={handleChange}/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>Annual Income</label>
                            <Input type="number" name="annual_income" className="form-control" value={formValues.annual_income.value} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Family members</label>
                            <Input type="number" name="family_members" className="form-control" value={formValues.family_members.value} onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Extra Allowances</label>
                            <Input type="number" name="extra_allowance" className="form-control" value={formValues.extra_allowance.value} onChange={handleChange}/>
                        </div>
                    </div>
                    <span className="m-2">{status?<p className="text-sucess">{message}</p>:<p className="text-danger">{message}</p>}</span>
                    <div className="row">
                        <button type="submit" className="btn btn-primary mx-5 col-2 " disabled={!isFormValid}>Save&Continue</button>
                        <Link href="/gaurdian/gaurdian_dashboard"><button type="button" className="btn btn-secondary col-2 mx-5 " >Exit</button></Link>
                    </div>
                </form>
            </section> */}
        </div>
    )
}