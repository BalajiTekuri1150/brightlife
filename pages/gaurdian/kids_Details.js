import { useState,useEffect} from "react"
import { useRouter } from "next/router"
import { getLocalData, setLocalData } from "../../utils/storage_service"
import { postData,getData} from "../../utils/data_manage_service"
import Input from "./input_compent"
import Link from "next/link"
export default function Kids_details(props){
    let value="",isvalid=false,result
    const router=useRouter()
    const [message,setMessage]=useState("")
    const [status,setStatus]=useState(true)
    const [new_application,setNew_application]=useState(true)
    const application_number=router.query.application_id || getLocalData("application_id")
    const guardian_id=getLocalData("guardian_id")
    const [formValues,setFormValues]=useState({
        // profile:{value,isvalid},
        username:{value,isvalid},
        birthday:{value,isvalid},
        mobile:{value,isvalid},
        email:{value,isvalid},
        child:{value,isvalid},
        gender:{value,isvalid}
    })
    const [selectedFile1,setSelectedFile1]=useState(null);
    const [selectedImage,setSelectedImage]=useState(null);
    let genderStatus=false;
    let childStatus=false;
    // console.log(application_number)
    useEffect(()=>{
      if(application_number!==null){
        if(!isNaN(application_number)){
            setNew_application(false)
            const getprofile=async()=>{
                const result=await getData(`https://test-api.brightlife.org/brightlife/get/application/details?page=1&page_size=5&application_id=${application_number}`);
                setFormValues({
                    // profile:{value:result?.data?.response?.data[0].profile,isvalid:true},
                    username:{value:result?.data?.response?.data[0].name,isvalid:true},
                    birthday:{value:result?.data?.response?.data[0].birthday,isvalid:true},
                    mobile:{value:result?.data?.response?.data[0].mobile,isvalid:true},
                    email:{value:result?.data?.response?.data[0].email,isvalid:true},
                    gender:{value:result?.data?.response?.data[0].gender.id,isvalid:true},
                    child:{value:result?.data?.response?.data[0].child_type.id,isvalid:true}
                })
                setSelectedImage(result?.data?.response?.data[0].profile)
            }
            getprofile();
        }
      }
    },[]);
    console.log(selectedImage)
    const handleSubmit=async(e)=>
    {
        e.preventDefault()  
        const formData = new FormData()
        formData.append("profile",selectedFile1);
        formData.append("name", formValues.username.value);
        formData.append("birthday",formValues.birthday.value);
        formData.append("gender_id",formValues.gender.value);
        formData.append("email",formValues.email.value); 
        formData.append("mobile",formValues.mobile.value); 
        formData.append("child_type_id", formValues.child.value); 
        if(new_application){
            formData.append(" guardian_id",guardian_id); 
            result=await(postData('https://test-api.brightlife.org/brightlife/add/application/profile',formData,1,1))
            application_number=result?.data?.response?.data?.id
            setLocalData("application_id",result?.data?.response?.data?.id)
        }
        else{
            formData.append("id",application_number)
            result=await(postData('https://test-api.brightlife.org/brightlife/update/application/profile',formData,1,1))
        }
        if(result?.data?.status){
            props.screenvalue()
        }
        else{
            setLocalData("application_id",null)
            setStatus(result?.data?.status)
            setMessage(result?.data?.error?.message)
        }           
    }
    const handleChange=(name,values,valid)=>{
        setStatus(true)
        setMessage("")
        setFormValues({...formValues,[name]:{value:values,isvalid:valid}})
    }
    console.log(formValues.gender.value)
    console.log(formValues.child.value)
    const handleRadio=(e)=>{
      
        setFormValues({...formValues,[e.target.name]:{value:e.target.value,isvalid:true}})
    }
    const isFormValid=Object.keys(formValues).every((key)=>{
        return formValues[key].isvalid
    })
    let handleExit=()=>
    {
      props.handleExitButton();
    }
    const fileChange1=async(e)=>{
      setSelectedFile1(e.target.files[0]);
  }
    return(
        <div>
        <div className="steps-wizard">
            <div className="step1-wizard">
              <a>
                  <div className="step">1</div>
                  <p style={{color: '#2a2a2a'}}>Kids details</p>
              </a>
            </div>  
            <div className="step1-wizard">
              <a>
                <div className="step1">2</div>
                <p>Gaurdian_details</p>
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
        <form onSubmit={handleSubmit}> 
        <div className="row sponsor-block bg-white">
        {/* <div className="application-form-card">
            <div className="image-upload-sec">
            <div className="image-upload">
                <label htmlFor="file-input">
                {!selectedFile1 && 
                  <img src="/img/browse-thumbnail.svg" />
                }
                {selectedFile1 && (
                          <div>
                          <img alt="not fount" src={URL.createObjectURL(selectedFile1)} className="left-pro-icon"/>
                          <br />
                          </div>
                      )}
                </label>
                <input type="file" name="profile1" className="form-control" onChange={fileChange1}/>
            </div>
            <div>
                <h4>Upload Kid’s Picture</h4>
                <p>100KB - 200KB</p>
            </div>
            </div>
        </div> */}
        {/* <input type="file"  name="profile" className="form-control" onChange={handleRadio}/> */}
          {!selectedFile1 && 
              <>
                { !selectedImage && (<>
                    <img src="/img/browse-thumbnail.svg" className="left-pro-icon"/>
                    </>
                )} 
                { selectedImage && (<>
                    <img src={selectedImage} alt="child image"/>
                    </>
                )}
              </>
          }
          {selectedFile1 && (
                    <div>
                    <img alt="not fount" src={URL.createObjectURL(selectedFile1)} className="left-pro-icon"/>
                    <br />
                    </div>
                )}
          {/* </label> */}
          <input type="file" name="profile1" className="form-control" onChange={fileChange1}/>
        
          <div className="col-lg-6">
            <div className="form-group">
              <label>Name</label>
              <Input type="text"  name="username"  className="form-control" value={formValues.username.value} onChange={handleChange}/> 
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Birthday</label>
              <Input type="date" name="birthday" className="form-control" value={formValues.birthday.value} onChange={handleChange}/>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Age</label>
              <Input type="number" name="age"  className="form-control" onChange={handleChange}/>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Email Address</label>
              <Input type="email" name="email"  className="form-control" value={formValues.email.value} onChange={handleChange}/>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Mobile number</label>
              <Input type="tel" name="mobile" className="form-control"  value={formValues.mobile.value} onChange={handleChange}/>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group radio-btn-size">
                <div>
                  <label>Is the child</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="child"  value="1" onChange={handleRadio} checked={formValues.child.value=="1"}/>
                  <label className="form-check-label" htmlFor="payment1">
                    Orphan
                  </label>
              </div>   
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="child" value="2" onChange={handleRadio} checked={formValues.child.value=="2"}/>
                  <label className="form-check-label" htmlFor="payment1">
                    Lives with parents
                  </label>
                </div> 
            </div>
          </div>
          <label>Gender</label>
          <div className="form-check">
                <label><input className="form-check-input" type="radio" name="gender" value="2" onChange={handleRadio} style={{marginLeft:'-11px'}} checked={formValues.gender.value=="2"}/>female</label>
                <label><input className="form-check-input m-1" type="radio" name="gender" value="1" onChange={handleRadio} checked={formValues.gender.value=="1"}/>male</label>
          </div>
          <span className="m-2">{status?<p className="text-sucess">{message}</p>:<p className="text-danger">{message}</p>}</span>
          <div className="col-lg-12 application-btns">
          <button type="submit" className="btn btn-primary mx-5 col-2 " disabled={!isFormValid}>Save&Continue</button>
            <div><button className="sponsor-exit-btn" onClick={handleExit}>Exit</button></div>
          </div>
        </div>
      </form>
            {/* <section className="form">
                <form className="bg-light px-5 pt-5" onSubmit={handleSubmit}>
                <input type="file"  name="profile" className="form-control" onChange={handleRadio}/>
                <label className="m-2">Upload Kids picture</label>
                    <div className="row">
                        <div className="col-5 mx-4">
                            <label>Name</label>
                            <Input type="text"  name="username"  className="form-control" value={formValues.username.value} onChange={handleChange}/> 
                        </div>
                        <div className="col-5 mx-4">
                            <label>Birthday</label>
                            <Input type="date" name="birthday" className="form-control" value={formValues.birthday.value} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Age</label>
                            <Input type="number" name="age"  className="form-control" onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Email Address</label>
                            <Input type="email" name="email"  className="form-control" value={formValues.email.value} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Mobile Number</label>
                            <Input type="tel" name="mobile" className="form-control"  value={formValues.mobile.value} onChange={handleChange}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Is the child</label>
                            <div className="form-check">
                                <label><input className="form-check-input" type="radio" name="child" value="1" onChange={handleRadio}/>orphan</label>
                                <label><input className="form-check-input m-1" type="radio" name="child" value="2" onChange={handleRadio}/>Live with parents</label>
                            </div>
                        </div>
                        <div className="col-5 m-4">
                            <label>Gender</label>
                            <div className="form-check">
                                <label><input className="form-check-input" type="radio" name="gender" value="2" onChange={handleRadio}/>female</label>
                                <label><input className="form-check-input m-1" type="radio" name="gender" value="1" onChange={handleRadio}/>male</label>
                            </div>
                        </div>
                    </div>
                    <span className="m-2">{status?<p className="text-sucess">{message}</p>:<p className="text-danger">{message}</p>}</span>
                    <div className="row">
                        <button type="submit" className="btn btn-primary mx-5 col-2 " disabled={!isFormValid}>Save&Continue</button>
                        <Link href={{pathname:"/gaurdian/gaurdian_dashboard"}}><button type="button" className="btn btn-secondary col-2 mx-5 " >Exit</button></Link>
                    </div>
                </form>
            </section> */}
        </div>
    )
}