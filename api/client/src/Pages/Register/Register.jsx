import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import { SiStarlingbank } from 'react-icons/si'
import {MdError} from 'react-icons/md'
import CircularProgress  from '@mui/material/CircularProgress'
import { axiosInstance } from '../../utils'
export default function Login() {

const [fullName, setFullName] = useState("")
  const [pin, setPin] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFullname = (e) => {
    setFullName(e.target.value)
  }

  const handlePin = (e) => {
    setPin(e.target.value)
  };

  const handleEmail = (e) => {
    setEmail(e.target.value)
  };

  const handlePassword = (e) => {
    setPassword(e.target.value)
  };



  const handleSubmit =  (e) => {
    e.preventDefault()

      const signin = {
        fullName: `${fullName}`,
        email: `${email}`,
        password: `${password}`,
        pin: `${pin}`
    }
    setLoading(true)
    axiosInstance.post('/createaccount', signin)
    .then(response => {
      if (response.data.success === true) {
        response.data && window.location.replace("/login") 
      } else {
        setErrorMsg(response.data.message)
      }
      setLoading(false)
    })
  };

   

  return (
    <div className="flex">
        <div className='flex-1'>
            <div className="login">
                <div className='container'>
                <h4 className='bank-name mb-4'><SiStarlingbank color='#2c5da9' size={28} className="me-3"/>CHASE-BANK</h4>
                <hr />
                    <h1 className="text-center fs-4 fw-bold loginText pt-3 pb-4">Join us today</h1>
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
                                            <label className="mb-2 form-font fs-6">Full Name</label>
                                            <input 
                                            className="formInput mb-3"
                                            type="text"   
                                            placeholder="Enter your full name" 
                                            required
                                            onChange={handleFullname}
                                            />
                                            </div>
                                            
                                            <div className="loginForm">
                                            <label className="mb-2 form-font fs-6">Email</label>
                                            <input 
                                            className="formInput mb-3" 
                                            type="email"   
                                            placeholder="Enter your email address" 
                                            required
                                            onChange={handleEmail}
                                            />
                                            </div>

                                            <div className="loginForm">
                                            <label class="mb-2 form-font fs-6">Password</label>
                                            <input 
                                            className="formInput mb-4" 
                                            type="password"   
                                            placeholder="Enter your password (6+ characters)" 
                                            required
                                            onChange={handlePassword}
                                            />
                                            </div>   
                                            <div className="loginForm">
                                            <label className="mb-2 form-font fs-6">Pin</label>
                                            <input 
                                            className="formInput mb-4" 
                                            type="password"   
                                            placeholder="Enter your Pin (4 number characters)" 
                                            required
                                            onChange={handlePin}
                                            />
                                            </div>    
                                            <button type="submit" className='loginButton mb-4' disabled={loading}>
                                              {loading ? (
                                                  <CircularProgress size={18} className="mt-1"/>
                                                  ) : (
                                                    "Sign Up"
                                                  )
                                              }
                                            </button>
                                            <p className='text-center'>
                                            Already have an account?
                                            <button className='regBtn'>
                                                <Link className='link ms-1' to='/login'>
                                                Sign In
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

