import { useState ,useEffect} from "react"
import { getLocalData } from "../../utils/storage_service";
import { getData,postData } from "../../utils/data_manage_service";
import My_Profile_Child from "../sponser/My_Profile_Child";
export default function Gaurdian_Profile(){
    const user_id=getLocalData("user_id")
    const[id,setId]=useState()
    const[role,setRole]=useState("")
    const [status,setStatus]=useState(true)
    const [message,setMessage]=useState("")
    const [data,setData]=useState({
        fname:{value:""},
        lname:{value:""},
        email:{value:""},
        organization:{value:""},
        mobile:{value:""},
        source:{value:""},
        address:{value:""},
        city:{value:""},
        state:{value:""},
        country:{value:""},
        postcode:{value:""},
    });
    useEffect(()=>{
        const getprofile=async()=>{
            const result=await getData(`https://test-api.brightlife.org/brightlife/get/guardian/profile?user_id=${user_id}`);
            setId(result?.data?.response?.sponsor?.id)
            setRole(result?.data?.response?.sponsor?.user?.role)
            setData({
                fname:{value:result?.data?.response?.sponsor?.user?.name},
                lname:{value:""},
                email:{value:result?.data?.response?.sponsor?.user?.email},
                organization:{value:result?.data?.response?.sponsor?.organization},
                mobile:{value:result?.data?.response?.sponsor?.mobile},
                source:{value:result?.data?.response?.sponsor?.source},
                address:{value:result?.data?.response?.sponsor?.address},
                city:{value:result?.data?.response?.sponsor?.city},
                state:{value:result?.data?.response?.sponsor?.state},
                country:{value:result?.data?.response?.sponsor?.country},
                postcode:{value:result?.data?.response?.sponsor?.postal_code},
            })
        }
        getprofile();
    },[]);
    const handleData=(name,value)=>{
        setStatus(true)
        setMessage("")
        setData({
            ...data,
            [name]:{
                ...value.name,
                value:value,
            }
        })
    }
    const updateProfile=async(e)=>
    {
        const user_data={
            user: {
                id:user_id,
                name: data.fname.value,
                email:data.email.value,
                role: role
            },
            id:id,
            mobile:data.mobile.value,
            organization: data.organization.value,
            source:data.source.value,
            address:data.address.value,
            city:data.city.value,
            state:data.state.value,
            country:data.country.value,
            postal_code:data.postcode.value
        }
        const result=await(postData("https://test-api.brightlife.org/brightlife/update/guardian/profile",user_data))
        console.log(result)
        setStatus(result?.data?.status)
        if(result?.data?.status==true)
        {
            setMessage("Details Updated Successfully");
        }
        else
        {
            setMessage(result?.data?.error)
        }
    }
    return(
        <>
            <section className="form">
                <form className="bg-light px-5 pt-5" onSubmit={updateProfile}>
                    <div className="row">
                        <div className="col-5 mx-4">
                            <label>First Name</label>
                            <My_Profile_Child type="text"  name="fname" className="form-control"  value={data.fname.value}  handleChange={handleData}/> 
                        </div>
                        <div className="col-5 mx-4">
                            <label>LastName</label>
                            <My_Profile_Child type="text" name="lname" className="form-control" value={data.lname.value}  handleChange={handleData}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Organization</label>
                            <My_Profile_Child type="text" name="organization" className="form-control" value={data.organization.value}  handleChange={handleData}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Email Address</label>
                            <My_Profile_Child type="email" name="email" className="form-control" value={data.email.value}  handleChange={handleData}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Mobile Number</label>
                            <My_Profile_Child type="tel" name="mobile" className="form-control" value={data.mobile.value}  handleChange={handleData}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>How did you hear about us</label>
                            <My_Profile_Child type="tel" name="source" className="form-control" value={data.source.value}  handleChange={handleData}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Address</label>
                            <My_Profile_Child type="text" name="address" className="form-control" value={data.address.value}  handleChange={handleData}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>City</label>
                            <My_Profile_Child type="text" name="city" className="form-control" value={data.city.value}  handleChange={handleData}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>State</label>
                            <My_Profile_Child type="text" name="state" className="form-control" value={data.state.value}  handleChange={handleData}/>
                        </div>
                        <div className="col-5 m-4">
                            <label>Country</label>
                            <My_Profile_Child type="text" name="country" className="form-control" value={data.country.value}  handleChange={handleData}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 m-4">
                            <label>Postal code</label>
                            <My_Profile_Child type="number" name="postcode" className="form-control" value={data.postcode.value}  handleChange={handleData}/>
                        </div>
                    </div>
                    {status?<p className="text-success">{message}</p>:<p className="text-danger">{message}</p>}
                    <div className="row">
                        <button type="submit" className="btn btn-primary mx-5 col-2" >Update</button>
                    </div>
                </form>
            </section>
        </>
    )
}