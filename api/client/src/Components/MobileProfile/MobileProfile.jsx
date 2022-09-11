import React, { useContext, useState } from 'react'
import './MobileProfile.css'
import {FaUserCircle} from 'react-icons/fa'
import { Context } from '../../ContextApi/Context'
import CircularProgress  from '@mui/material/CircularProgress'
import { axiosInstance } from '../../utils'

export default function Profile() {

    const {user, dispatch, isFetching} = useContext(Context)
    const [mobileFile, setMobileFile] = useState(null)
    const [success, setSuccess] = useState(false)
    const PF = "https://chasebankapp.herokuapp.com/images/"

    const handleFile = (e) => {
        setMobileFile(e.target.files[0])
      }
    
    //   const handleFullName = (e) => {
    //     setFullName(e.target.value)
    //   }    

    const handleSubmit = async (e) => {
        dispatch({type: "UPDATE_START"})
        e.preventDefault()
    
        const updatedMobileUser = {
          userId: user._id,
        }
        if(mobileFile){
          const data = new FormData();
          const filename = Date.now() + mobileFile.name;
          data.append("name", filename)
          data.append("mobilefile", mobileFile)
          updatedMobileUser.profilePicture = filename;
          try{
            await axiosInstance.post("/mobile/upload", data)
          } catch(error) {}
        }
        try{
          const res = await axiosInstance.put('/update/' + user._id, updatedMobileUser)
          setSuccess(true)
          dispatch({type: "UPDATE_SUCCESS", payload: res.data})
        } catch(error) {
          dispatch({type: "UPDATE_FAILURE"})
        }
        
      }

  return (
    <>
        <img className="nav-item nav-mobiledp" src={mobileFile ? URL.createObjectURL(mobileFile) : PF + user.profilePicture} alt="" data-bs-toggle="modal" data-bs-target="#addProfileModal"/>
        <h5 className='fs-6 fw-bold mt-2 ms-4 text-secondary nav-mobilename'>{user.fullName}</h5>

         {/* Add Modal */}
                <div className="modal fade" id="addProfileModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        {success && 
                            <div className="profilemobileUpdate mb-4 d-flex mx-auto justify-content-center align-items-center">
                            <h4 className='text-center d-flex justify-content-center align-items-center fs-6 mt-1' style={{color: 'green'}}>Profile Updated</h4>
                            </div>
                        }
                        <form id="addform" className='' onSubmit={handleSubmit}>
                            <div className="mb-3">
                             <div className='d-flex justify-content-center'>
                                <img className="nav-item nav-mobileprofile" src={mobileFile ? URL.createObjectURL(mobileFile) : PF + user.profilePicture} alt=""/>
                                <label htmlFor="fileInput">
                                <FaUserCircle className='settingsmobileDpIcon mt-5'/>
                                </label>
                                <input type="file" id="fileInput" style={{display:'none'}} onChange={handleFile}/>
                             </div>
                            </div>
                            {/* <div className="mb-3 settingsForm">
                                <label>Fullname</label>
                                <input type="text" name="acc" id="addtask" required onChange={handleFullName}/>
                            </div> */}
                            <div className='d-flex justify-content-center'>
                                <button className='updatemobileSubmit mt-3' type='submit' disabled={isFetching} >
                                {isFetching ? (
                                    <CircularProgress size={18} className="mt-1"/>
                                    )  : ( 
                                    "Update"
                                )}
                                </button>
                            </div>  
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
    </>
  )
}
