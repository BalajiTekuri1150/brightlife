import React from "react";
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import style from '../../styles/register.module.css';
import Child_Card from "./Child_Card";
import Child_Card1 from "./Child_Card1";
// import dynamic from 'next/dynamic'
// const Child_Card1 = dynamic(() => import("./Child_Card"), {
// ssr: false,
// });
import Router from "next/router";
import { getLocalData } from "../../utils/storage_service";
import { setLocalData } from "../../utils/storage_service";
import { getData1 } from "../../utils/data_manage_service";
import { store } from "../_app";
import { useContext } from 'react';
import Link from 'next/link'
const Final=()=>
{
    const {datas,setDatas}=useContext(store)
    const router = useRouter()
    // const{name,email,pass,role,id}=router.query;
    const [coun,setCoun]=useState([]);
    const [country,setCountry]=useState("")
    const [conid,setconId]=useState(' ');
    const [st,setSt]=useState([]);
    const [mon,setMon]=useState(" ");
    const [gen,setGen]=useState("");
    const [state,setState]=useState(" ");
    const [age,setAge]=useState();
    const [region,setRegion]=useState(" ");
    const [income,setIncome]=useState("");
    const [posts,setPosts]=useState([]);
    const [count,setCount]=useState(0);
    const [page,setPage]=useState(6);
    const [set_search,setSearch]=useState([]);
    const [pageNumber,setPagenumber]=useState(1);
    const [disable1,setDisable1]=useState(false);
    useEffect(()=>{
        const getCountry=async()=>{
            const res=await fetch("https://test-api.brightlife.org/brightlife/list/countries",{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getcon=await res.json();
            console.log(getcon);
            console.log(getcon.response.data);
            setCoun(getcon.response.data);
        }
        getCountry();
    },[]);

    const id1=getLocalData("id");
    
    useEffect(()=>{
        const getprofile=async()=>{
            const res2=await fetch(`https://test-api.brightlife.org/brightlife/get/sponsor/profile?user_id=${id1}`,{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getpofiledata=await res2.json();
            setLocalData("sponser_id",getpofiledata.response?.sponsor?.id);
        }
        getprofile();
    },[]);

    useEffect(()=>{
      const getprofile1=async()=>{
          const res1=await fetch("https://test-api.brightlife.org/brightlife/get/application/details?page=1&page_size=6",{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
          const getpofiledata=await res1.json();
          setSearch(getpofiledata.response.data);
      }
      getprofile1();
   },[]);

    const handleCountry=(e)=>
    {
        const getCountryid=e.target.value;
        // console.log(getCountryid);
        setconId(getCountryid);
    }

    useEffect(()=>{
        const getState=async()=>{
            const resst=await fetch(`https://test-api.brightlife.org/brightlife/get/states/by/country?country_id=${conid}`,{headers:{"Authorization":"token 2d21e847092508ace5f534ac492bf03cd742145a"}});
            const getst=await resst.json();
            if(getst.response?.data)
            {
                setSt(getst.response.data);
            }
        }
        getState();
    },[conid]);

    const handleMonth=(e)=>
    {
        setMon(e.target.value);
    }
    const handleGender=(e)=>
    {
        console.log(gen)
        if(e.target.value==="1"){
          setGen(1);
        }
        if(e.target.value==="2"){
          setGen(2);
        }
        // setGen(e.target.value);
    }
    const handleAge=(e)=>
    {
        setAge(e.target.value);
    }
    const handleState=(e)=>
    {
        setState(e.target.value);
    }
    const handleRegion=(e)=>
    {
        setRegion(e.target.value);
    }
    const handleIncome=(e)=>
    {
        setIncome(e.target.value);
    }
    const handleProfile=()=>
    {
        Router.push({
            pathname:'/sponser/My_Profile',
        })
    }
    const handleClear=async(e)=>
    {
        e.preventDefault()
        const result=await(getData1(`https://test-api.brightlife.org/brightlife/get/application/details?page=${pageNumber}&page_size=6`));
        if(result.data?.status)
        {
            console.log("posts is:")
            console.log(result.data?.response?.data);
            setPosts([])
            setSearch(result?.data?.response?.data);
        }
        setCount(0);
        setState(" ");
        setGen("");
        setAge(" ");
        setIncome(" ");
        setMon(" ");
    }
    const handleSubmit=async(e)=>
    {
        e.preventDefault();
        const result=await(getData1(`https://test-api.brightlife.org/brightlife/get/application/details?page=${pageNumber}&page_size=6&gender=${gen}&family_income=${income}`));
        if(result.data?.status)
        {
            // setPosts([])
            setSearch(result.data?.response?.data)
        }
        // setCount(2)
        if(count==0)
        {
            setCount(count+2);
        }
        else{
            setCount(count+1);
        }
    }
    const handleCount=()=>
    {
        console.log(1);
        setCount(1);
        setState(" ");
        setGen(" ");
        setAge(" ");
        setIncome(" ");
        setMon(" ");
    }
    const handleLogout=()=>
    {
      console.log("Hello")
      localStorage.clear();
      localStorage.removeItem("profile");
      Router.push({
        pathname:'/',
      })
    }
    const handlePageNumber=async(pageNumber)=>
    {
      setPagenumber(pageNumber);
      console.log("hello",pageNumber);
      const result=await(getData1(`https://test-api.brightlife.org/brightlife/get/application/details?page=${pageNumber}&page_size=6`));
      if(result.data?.status)
      {
          console.log("posts is:")
          console.log(result.data?.response?.data);
          // setPosts([])
          setSearch(result?.data?.response?.data);
      }
      else{
        alert("Student List Ended");
        // setMessage("No student Data");
        setDisable1(true);
      }
      setCount(0);
        setState(" ");
        setGen("");
        setAge(" ");
        setIncome(" ");
        setMon(" ");
    }
    // console.log(datas)
    const name=getLocalData("name");
    return( 
        <div>
        {/* header start */}
        <header>
          <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between solid">
            <div className="custom-container border_bottom">
              <div>
                <a className="navbar-toggler" type="button" onclick="toggleSidebar()">
                  <i className="fa fa-bars" aria-hidden="true" />
                </a>
                <a className="navbar-brand" href="/">
                  <img className="logo" src="/img/logo.png" alt="Brightlife" />
                </a>
              </div>
              <div className=" navbar-collapse " id="mobilesidemenu">
                <ul className="navbar-nav mr-auto ">
                  <li className="nav-item ">
                    <Link className="nav-link" href="/home_files/our_team"> Our Team</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="/home_files/how_works"> How it works </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " href="/home_files/donate">
                      <button className="btn signin-button" type="submit">
                        <span className="Donate" style={{color:'white'}}> Donate </span>
                      </button>
                    </Link>
                  </li>
                  {datas!=="undefined" ?
                    <>
                      <li className="nav-item user-image dropdown">
                          <div className="nav-link">
                            <img className="user-image-header" src={datas} />{name}<i className="fa fa-angle-down" aria-hidden="true" />
                          </div>
                          <ul className="dropdown-nav">
                            <Link href="/sponser/my_profile1">
                              <li>
                                <img src="/img/user.svg" /><span style={{color:'black'}}>My profile</span>
                              </li>
                            </Link>
                            <Link href="/sponser/my_profile1">
                              <li>
                                <img src="/img/sponsored.svg" /><span style={{color:'black'}}>Sponsored children</span>
                              </li>
                            </Link>
                            <a onClick={handleLogout}>
                              <li style={{color:'black'}}>
                                <img src="/img/signout.svg"/>Sign out
                              </li>
                            </a>
                          </ul>
                      </li>
                    </>:
                    <>
                      <li className="nav-item user-image dropdown">
                          <a className="nav-link " href>
                            <img className="user-image-header" src="/img/profile.png" />{name}<i className="fa fa-angle-down" aria-hidden="true" />
                          </a>
                          <ul className="dropdown-nav">
                            <Link href="/sponser/My_Profile">
                              <li>
                                <img src="/img/user.svg" /><span style={{color:'black'}}>My profile</span>
                              </li>
                            </Link>
                            <Link href="/sponser/My_Profile">
                              <li>
                                <img src="/img/sponsored.svg" /><span style={{color:'black'}}>Sponsored children</span>
                              </li>
                            </Link>
                            <a onClick={handleLogout} >
                              <li>
                                <img src="/img/signout.svg"/><span style={{color:'black'}}>Sign out</span>
                              </li>
                            </a>
                          </ul>
                      </li>
                    </>
                  }
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div id="sidebaroverlay-id" onclick="outsideclick()" />
        <div className="page_start_warpper">      
          <section className="make-donation-bg">   
            <div className="custom-container">     
              <div className="makedonation-ban">  
                <div className="make-title">Sponsor  <span>a child</span></div>
                <p>Transforming Children’s Lives when you become a sponsor show God’s love to a child in need.</p>
              </div>  
            </div>       
          </section>   
          <section className="make-donate-form">   
            <div className="custom-container">     
              <div className="donateform-card"> 
                <form>             
                  <div className="row">
                    <p className="doante-q col-lg-12">Search</p>                    
                    <div className="col-lg-3">
                      <div className="form-group">
                        {/* <select className="form-control" onChange={(e)=>handleCountry(e)}>
                        <option value=" ">-----Select Country-----</option>
                        {
                            coun.length>0 &&
                            coun.map((countryget)=>{
                                return <option key={countryget.id} value={countryget.id}>{countryget.name}</option>
                            })
                        }

                        </select> */}
                        <Form.Control as="select" className="form-control"  onChange={(e)=>handleCountry(e)}>
                             <option value=" ">-----Select Country-----</option>

                            {
                                coun.length>0 &&
                                coun.map((countryget)=>{
                                    return <option key={countryget.id} value={countryget.id}>{countryget.name}</option>
                                })
                            }

                        </Form.Control>
                      </div>                           
                    </div>  
                    <div className="col-lg-3">
                      <div className="form-group">
                        <select className="form-control" onChange={handleMonth} value={mon}>
                            <option value=" ">SELECT MONTH</option>
                            <option value="JAN">JANUARY</option>
                             <option value="feb">FEBRUARY</option>
                             <option value="mar">MARCH</option>
                            <option value="APR">APRIL</option>
                             <option value="MAY">MAY</option>
                             <option value="JUN">JUNE</option>
                             <option value="JUL">JULY</option>
                             <option value="AUG">AUGUST</option>
                             <option value="SEP">SEPTEMBER</option>
                             <option value="OCT">OCTOBER</option>
                             <option value="NOV">NOVEMBER</option>
                             <option value="DEC">DECEMBER</option>  
                        </select>
                      </div>                           
                    </div>  
                    <div className="col-lg-3">
                      <div className="form-group">
                        {/* <select className="form-control">
                          <option>Gender</option>
                          <option>Male</option>                                     
                          <option>Female</option>   
                          <option>transgender</option>   
                        </select> */}
                        <Form.Control as="select" value={gen} className={style.sponser_input} onChange={handleGender}>
                             <option value="0">SELECT GENDER</option>
                             <option value="1">MALE</option>
                             <option value="2">FEMALE</option>
                             {/* <option>transgender</option>    */}
                         </Form.Control>
                      </div>                           
                    </div>  
                    <div className="col-lg-3">
                      <div className="form-group">
                        <select className="form-control" onChange={handleAge} value={age}>
                          <option>Age</option>
                          <option>10</option>                                     
                          <option>20</option>   
                        </select>
                      </div>                           
                    </div>  
                    <div className="col-lg-3">
                      <div className="form-group">
                        <select className="form-control" value={state} onChange={handleState}>
                        <option value="">-----SELECT STATE-------</option>
                           {
                                st.length>0 &&
                                st.map((resst)=>{
                                    return <option key={resst.name} value={resst.name}>{resst.name}</option>
                                })
                            } 
                        </select>
                      </div>                           
                    </div> 
                    {/* <div className="col-lg-3">
                      <div className="form-group">
                        <select className="form-control">
                          <option>Region</option>
                          <option>Region1</option>                                     
                          <option>Region2</option>   
                        </select>
                      </div>                           
                    </div>  */}
                    <div className="col-lg-3">
                      <div className="form-group">
                        {/* <select className="form-control">
                          <option>Family income</option>
                          <option>Below 50,000</option> 
                          <option>Below 10,000</option>
                          <option>Below 5,000</option>                                    
                        </select> */}
                       <Form.Control as="input" className={style.sponser_input} placeholder="FAMILY INCOME" value={income} onChange={handleIncome}/>
                      </div>                           
                    </div> 
                    <div className="col-lg-3">
                      <div className="form-check form-control orphan-input">
                        <input className="form-check-input" type="checkbox" defaultValue id="defaultCheck1" />
                        <label className="form-check-label" htmlFor="defaultCheck1">
                          Orphan Kids
                        </label>
                      </div>                          
                    </div> 
                    <div className="col-lg-12 search-btns">                      
                      <div className="search-main">
                        <button href className="searc-btn" onClick={handleSubmit}>Search</button>
                      </div>
                      <div className="clearall">
                        <button href className="clearall-btn" onClick={handleClear}>Clearall</button>
                      </div>
                    </div>                              
                  </div>
                </form>                
              </div>
            </div>       
          </section>  
          </div>
          <section className="search-content">
            <div className="search-headline">Children in need of a sponsorship</div>
            <div className="custom-container">
              {/* <Child_Card count={count} HandleSort={handleCount} posts={posts} gen={gen} income={income} mon={mon} state={state} handlePageNumber={handlePageNumber} set_search={set_search}/> */}
              <Child_Card1 handlePageNumber={handlePageNumber} set_search={set_search} disable1={disable1}/>
            </div>
          </section>
        <footer id="footer">
          <div className="footer-top">
            <div className="custom-container">
              <div className="row">
                <div className="col-lg-3 col-md-6 footer-contact">
                  <a href="index.html">
                    <img className="logo" src="/img/logo.png" alt="Brightlife" />
                  </a>
                  <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                </div>
                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>OUR SERVICES</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Services</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Terms of service</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Privacy policy</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>QUICK LINKS</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Web Design</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Web Development</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Product Management</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Marketing</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right" />
                      <a href="#">Graphic Design</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>GET IN TOUCH</h4>
                  <div>Lorem ipsum Lorem ipsum Lorem ipsum 19801</div>
                  <div>Email: Lorem ipsum@gmail.com</div>
                  <div>Phone: +00 000 000 1234</div>
                  <div className="social-links mt-3">
                  <a href="#" className>
                    <i className="fa fa-skype" aria-hidden="true" />
                  </a>
                  <a href="#" className>
                    <i className="fa fa-twitter" aria-hidden="true" />
                  </a>
                  <a href="#" className>
                    <i className="fa fa-whatsapp" aria-hidden="true" />
                  </a>
                  <a href="#" className>
                    <i className="fa fa-vimeo" aria-hidden="true" />
                  </a>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className="custom-container footer-bottom clearfix">
            <div className="copyright">© 2019 brightlife.com </div>
            <div className="credits">
              <a href>FAQ’s</a>
              <a href>Deposit</a>
            </div>
          </div>
        </footer>
      </div>
        // <div>
        //     <div className="container">
        //         <div className="row bg-black">
        //         <div className="col-sm text-light"></div>
        //             <div className="col-sm text-light"></div>
        //             <button className="col-sm text-secondary"><Link href="/home_files/how_works"><button>how it works</button></Link></button>
        //             <button className="col-sm text-secondary"><Link href="/home_files/donate"><button>donate</button></Link></button>
        //             <button className="col-sm btn btn-secondary" onClick={handleProfile}>My Profile</button>
        //         </div>
        //     </div>
        //     <div style={{backgroundColor:'white',marginLeft:'200px',width:'1000px',height:'300px',marginTop:'100px',borderRadius:'10px'}}>
        //     <Form>
        //         <Form.Group><br/>
        //             <h3 style={{marginLeft:'10px'}}>Search</h3>
        //             <div style={{display:'flex',marginTop:'30px'}}>
        //                 <Form.Control as="select" style={{width:'300px',marginLeft:'10px',marginRight:'10px'}} onChange={(e)=>handleCountry(e)}>
        //                     <option value=" ">-----Select Country-----</option>

        //                     {
        //                         coun.length>0 &&
        //                         coun.map((countryget)=>{
        //                             return <option key={countryget.id} value={countryget.id}>{countryget.name}</option>
        //                         })
        //                     }

        //                 </Form.Control>
        //                 <Form.Control as="select" value={mon} className={style.sponser_input} placeholder="Birth Month" onChange={handleMonth}>
        //                     <option value=" ">SELECT MONTH</option>
        //                     <option value="JAN">JANUARY</option>
        //                     <option value="feb">FEBRUARY</option>
        //                     <option value="mar">MARCH</option>
        //                     <option value="APR">APRIL</option>
        //                     <option value="MAY">MAY</option>
        //                     <option value="JUN">JUNE</option>
        //                     <option value="JUL">JULY</option>
        //                     <option value="AUG">AUGUST</option>
        //                     <option value="SEP">SEPTEMBER</option>
        //                     <option value="OCT">OCTOBER</option>
        //                     <option value="NOV">NOVEMBER</option>
        //                     <option value="DEC">DECEMBER</option>
        //                 </Form.Control>
        //                 <Form.Control as="select" value={gen} className={style.sponser_input} onChange={handleGender}>
        //                     <option value=' '>SELECT GENDER</option>
        //                     <option value="Male">MALE</option>
        //                     <option value="Female">FEMALE</option>
        //                 </Form.Control>
        //                 <label style={{marginTop:'8px'}}>AGE:</label><Form.Control as="input" className={style.sponser_input} value={age} placeholder="AGE" onChange={handleAge}/>
        //             </div>
        //         </Form.Group><br/>
        //         <Form.Group>
        //             <div style={{display:'flex'}}>
        //                 <Form.Control as="select" value={state} style={{width:'300px',marginLeft:'10px',marginRight:'10px'}} onChange={handleState}>
        //                     <option value="">-----SELECT STATE-------</option>
        //                     {
        //                         st.length>0 &&
        //                         st.map((resst)=>{
        //                             return <option key={resst.name} value={resst.name}>{resst.name}</option>
        //                         })
        //                     }
        //                 </Form.Control>
        //                 <Form.Control as="input" className={style.sponser_input} placeholder="REGION" onChange={handleRegion}/>
        //                 <label style={{marginTop:'8px'}}>INCOME:</label><Form.Control as="input" className={style.sponser_input} placeholder="FAMILY INCOME" value={income} onChange={handleIncome}/>
        //             </div>
        //         </Form.Group><br/>
        //         <Form.Group style={{marginLeft:'350px'}}>
        //             <Button variant="primary" type="submit" style={{marginRight:'50px'}} size="lg" onClick={handleSubmit}>Search</Button>{' '}
        //             <Button variant="secondary" type="submit" size="lg" onClick={handleClear}>Clear All</Button>
        //         </Form.Group>
        //     </Form><br/><br/>
        //     {/* <button className="btn btn-success" onClick={handleCount}>Sort By Oldest</button> */}
        //     <Child_Card count={count} HandleSort={handleCount}/>
        //     </div>
        // </div>
    )
}


export default Final;