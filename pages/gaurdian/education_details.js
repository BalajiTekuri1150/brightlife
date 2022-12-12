import { useState,useEffect } from "react"
import { postData ,getData} from "../../utils/data_manage_service"
import Input from "./input_compent"
import Link from "next/link"
import { useRouter } from "next/router"
import { getLocalData } from "../../utils/storage_service"
import Script from "next/script"
import Head from "next/head"
export default function Education_details(props){
    let value="",isvalid=false
    const [message,setMessage]=useState("")
    const [status,setStatus]=useState(true)
    const router=useRouter()
    const application_number=router.query.appication_id || getLocalData("appication_id")
    const [formValues,setFormValues]=useState({
        grade:{value,isvalid},
        school:{value,isvalid},
        school_address:{value,isvalid},
        hobbies:{value,isvalid},
        aspirations:{value,isvalid},
        achievements:{value,isvalid}
    })
    const handleChange=(name,values,valid)=>{
        setStatus(true)
        setMessage("")
        setFormValues({...formValues,[name]:{value:values,isvalid:valid}})
    }
    useEffect(()=>{
        if(!isNaN(application_number)){
            const getprofile=async()=>{
                const result=await getData(`https://test-api.brightlife.org/brightlife/get/application/details?page=1&page_size=5&application_id=${application_number}`);
                const disable=(Object.keys(formValues)).every((item)=>(Object.keys(result?.data?.response?.data[0])).includes(item))
                if(disable){
                    setFormValues({
                        grade:{value:result?.data?.response?.data[0].grade,isvalid:true},
                        school_address:{value:result?.data?.response?.data[0].school_address,isvalid:true},
                        school:{value:result?.data?.response?.data[0].school,isvalid:true},
                        hobbies:{value:result?.data?.response?.data[0].hobbies,isvalid:true},
                        aspirations:{value:result?.data?.response?.data[0].aspirations,isvalid:true},
                        achievements:{value:result?.data?.response?.data[0].achievements,isvalid:true},
                    })
                }
            }
            getprofile();
        }
    },[]);
    const handleSubmit=async(e)=>{
        e.preventDefault()  
        const data = {
            application_id: application_number,
            grade:formValues.grade.value ,
            school:formValues.school.value ,
            school_address: formValues.school_address.value ,
            hobbies: formValues.hobbies.value ,
            aspirations:formValues.aspirations.value ,
            achievements: formValues.achievements.value 
        }
        const result=await(postData('https://test-api.brightlife.org/brightlife/update/education/details',data,1))
        if(result?.data?.status){
            props.screenvalue()
        }
        else{
            setStatus(result?.data?.status)
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
                <div className="step1-wizard step-active">
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
                        <label>Class</label>
                        <Input type="text"  name="grade" className="form-control" value={formValues.grade.value} onChange={handleChange}/>
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="form-group">
                        <label>School Name</label>
                        <Input type="text" name="school" className="form-control" value={formValues.school.value} onChange={handleChange}/>
                        {/* <select className="form-control">
                        <option />    
                        <option>School1</option>
                        <option>School2</option>
                        <option>School3</option>
                        </select>   */}
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="form-group">
                        <label>School Area/address</label>
                        <Input type="text" name="school_address" className="form-control" value={formValues.school_address.value} onChange={handleChange}/>
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="form-group">
                        <label>Hobbies</label>
                        <Input type="text" name="hobbies" className="form-control" value={formValues.hobbies.value} onChange={handleChange}/>
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="form-group">
                        <label>What are the child’s aspirations/dream?</label>
                        <Input type="text-area" name="aspirations" className="form-control" value={formValues.aspirations.value} onChange={handleChange}/>
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="form-group">
                        <label>Any achievements or prizes won by the child? (Upload any supporting documents/photos)</label>
                        {/* <textarea name="achievements" rows={4} className="form-control" placeholder="Explain in 50 words" value={formValues.achievements.value} onChange={handleChange}/> */}
                        <Input type="text-area" name="achievements" className="form-control" value={formValues.achievements.value} onChange={handleChange}/>
                    </div>
                    </div>
                    <div >
                        <div style={{display:'flex'}}>
                            <input className="form-check" type="checkbox"/>
                            <label style={{marginTop:'12px'}}>Improve kids physical health</label>
                        </div>
                        <div style={{display:'flex'}}>
                            <input className="form-check" type="checkbox" />
                            <label style={{marginTop:'12px'}}>Cover basic school needs</label>
                        </div>
                        <div style={{display:'flex'}}>
                            <input className="form-check" type="checkbox"/>
                            <label style={{marginTop:'12px'}}>Increase Kids confidence/social acceptance</label>
                        </div>
                    </div>
                    
                    {/* <div className="col-lg-6">
                    <div className="form-group dream-checkbox">
                        <label>What are the child’s aspirations/dream?</label>
                        <div className="form-check" style={{display:'flex'}}>
                            <Input className="form-check-input" type="checkbox"/>
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Improve kids physical health.
                            </label>
                        </div>
                        <div className="form-check" style={{display:'flex'}}>
                            <Input className="form-check-input" type="checkbox" defaultValue id="defaultCheck2" />
                            <label className="form-check-label" htmlFor="defaultCheck2">
                                cover basic school needs
                            </label>
                        </div>
                        <div className="form-check" style={{display:'flex'}}>
                            <Input className="form-check-input" type="checkbox" defaultValue id="defaultCheck2" />
                            <label className="form-check-label" htmlFor="defaultCheck2">
                                increase kids confidence/ social acceptance
                            </label>
                        </div>
                    </div>
                    </div> */}
                    
                    <span className="m-2">{status?<p className="text-sucess">{message}</p>:<p className="text-danger">{message}</p>}</span>
                    <div className="col-lg-12 application-btns">
                    <button type="submit" className="btn btn-primary mx-5 col-2 " disabled={!isFormValid}>Save&Continue</button>
                    <a><div className="sponsor-exit-btn" onClick={handleExit}>Exit</div></a>
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
                            <label>Class</label>
                            <Input type="text"  name="grade" className="form-control" value={formValues.grade.value} onChange={handleChange}/>
                        </div>
                        <div className="col-5 mx-4">
                            <label>School name</label>
                            <Input type="text" name="school" className="form-control" value={formValues.school.value} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>School Area/Address</label>
                            <Input type="text" name="school_address" className="form-control" value={formValues.school_address.value} onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Hobbies</label>
                            <Input type="text" name="hobbies" className="form-control" value={formValues.hobbies.value} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>What are the child's aspiration or Dream?</label>
                            <Input type="text-area" name="aspirations" className="form-control" value={formValues.aspirations.value} onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Any achievment or prizes won by the child?</label>
                            <Input type="text" name="achievements" className="form-control" value={formValues.achievements.value} onChange={handleChange}/>
                        </div>
                    </div>
                    <label>Keyoutcome I hope will be achieved?</label>
                    <div >
                        <input className="form-check" type="checkbox"/>
                        <label>Improve kids physical health</label>
                        <input className="form-check" type="checkbox" />
                        <label >Cover basic school needs</label>
                        <input className="form-check" type="checkbox"/>
                        <label >Increase Kids confidence/social acceptance</label>
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