import React, { useState, useRef, useContext} from 'react'
import { Context } from '../../ContextApi/Context'
import { Link } from 'react-router-dom'
import './Login.css'
import { SiStarlingbank } from 'react-icons/si'
import {MdError} from 'react-icons/md'
import CircularProgress  from '@mui/material/CircularProgress'
import { axiosInstance } from '../../utils'

export default function Login() {

    const userRef = useRef()
    const passwordRef = useRef()
    const [errorMsg, setErrorMsg] = useState("")
    const { dispatch, isFetching } = useContext(Context)
    
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      dispatch({type: "LOGIN_START"});
      try{
        const res = await axiosInstance.post('/login', {
          email: userRef.current.value,
          password: passwordRef.current.value
        })
        setErrorMsg(res.data.msg)
        dispatch({type: "LOGIN_SUCCESS", payload: res.data.data})
      } catch(err){
        dispatch({type: "LOGIN_FAILURE"});
      }
    };
  return (
    <div className="flex">
        <div className='flex-1'>
            <div className="login">
                <div className='container'>
                <h4 className='bank-name mb-4'><SiStarlingbank color='#2c5da9' size={28} className="me-3"/>CHASE-BANK</h4>
                <hr />
                    <h1 className="fs-4 fw-bold loginText pt-3 pb-4">Login to your Account</h1>
                    {errorMsg && 
                        <div className="d-flex mx-auto justify-content-center align-items-center">
                            <div className='errBox mb-4'>
                            <h4 className="text-center text-danger d-flex justify-content-center align-items-center fs-6 mt-1"><MdError className="me-3" size={16} color="#ff0000"/>{errorMsg}</h4>
                            </div>
                        </div> 
                    }
                        <div className="row mx-auto justify-content-center align-items-center flex-column ">
                                        <form onSubmit={handleSubmit}>
                                            <div className="loginForm">
                                            <label className="mb-2 form-font fs-6">Email Address</label>
                                            <input 
                                            className="formInput mb-4" 
                                            type="text"   
                                            placeholder="Enter your Email Address" 
                                            required
                                            ref={userRef}
                                            />
                                            </div>

                                            <div className="loginForm">
                                            <label class="mb-2 form-font fs-6">Password</label>
                                            <input 
                                            className="formInput mb-4" 
                                            type="password"   
                                            placeholder="Enter your password" 
                                            required
                                            ref={passwordRef}
                                            />
                                            </div>                                   
                                            <button type="submit" className='loginButton mb-4' disabled={isFetching}>
                                              {isFetching ? (
                                                <CircularProgress size={18} className="mt-1"/>
                                              )  : ( 
                                                "Sign In" )}
                                            </button>
                                            <p className='text-center'>
                                            Don't have an account? 
                                            <button className='regBtn'>
                                                <Link className='link ms-1' to='/register'>
                                                  Sign Up
                                                </Link>
                                            </button>
                                            </p>
                                        </form>
                        </div>
                </div>      
            </div>
        </div>
        <div className="flex-2">
            <div className='loginImg'>
            <h5 className='desc ms-5 pt-5 fw-bold'>Make Transactions Super Fast And <br /> Reliable With Our Bank App</h5>
            <p className='desc1 ms-5 pt-4 fs-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Unde numquam molestias, labore repudiandae odit quam <br /> consequatur  nobis suscipit rem veritatis porro ad <br /> cupiditate</p>
            </div>
        </div>
    </div>
  )
}

