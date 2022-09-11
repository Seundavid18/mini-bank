import React, { useContext, useState } from 'react'
import './Profile.css'
import {FaUserCircle} from 'react-icons/fa'
import { Context } from '../../ContextApi/Context'
import CircularProgress  from '@mui/material/CircularProgress'
import { axiosInstance } from '../../utils'

export default function Profile() {

    const {user, dispatch, isFetching} = useContext(Context)
    const [file, setFile] = useState(null)
    const [success, setSuccess] = useState(false)
    const DP = "https://chasebankapp.herokuapp.com/images/"

    const handleFile = (e) => {
        setFile(e.target.files[0])
      }
  

    const handleReload = () => {
      window.location.reload('/')
    }

    const handleSubmit = async (e) => {
        dispatch({type: "UPDATE_START"})
        e.preventDefault()
    
        const updatedUser = {
          userId: user._id,
        }
        if(file){
          const data = new FormData();
          const filename = Date.now() + file.name;
          data.append("name", filename)
          data.append("file", file)
          updatedUser.profilePicture = filename;
          try{
            await axiosInstance.post("/upload", data)
          } catch(error) {}
        }
        try{
          const res = await axiosInstance.put('/update/' + user._id, updatedUser)
          setSuccess(true)
          dispatch({type: "UPDATE_SUCCESS", payload: res.data})
        } catch(error) {
          dispatch({type: "UPDATE_FAILURE"})
        }
        
      }

  return (
    <>
        <img className="nav-item nav-dp" src={file ? URL.createObjectURL(file) : DP + user.profilePicture} alt="" data-bs-toggle="modal" data-bs-target="#addProfileModal"/>
        <h5 className='fs-6 fw-bold mt-2 ms-4 text-secondary nav-name'>{user.fullName}</h5>

         {/* Add Modal */}
                <div className="modal fade" id="addProfileModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleReload}></button>
                        </div>
                        <div className="modal-body">
                        {success && 
                            <div className="profileUpdate mb-4 d-flex mx-auto justify-content-center align-items-center">
                            <h4 className='text-center d-lg-flex justify-content-center align-items-center fs-6 mt-1' style={{color: 'green'}}>Profile Updated</h4>
                            </div>
                        }
                        <form id="addform" className='' onSubmit={handleSubmit}>
                            <div className="mb-3">
                             <div className='d-flex justify-content-center'>
                                <img className="nav-item nav-profile" src={file ? URL.createObjectURL(file) : DP + user.profilePicture} alt=""/>
                                <label htmlFor="fileInput">
                                <FaUserCircle className='settingsDpIcon mt-5'/>
                                </label>
                                <input type="file" id="fileInput" style={{display:'none'}} onChange={handleFile}/>
                             </div>
                            </div>
                            {/* <div className="mb-3 settingsForm">
                                <label>Fullname</label>
                                <input type="text" name="acc" id="addtask" required onChange={handleFullName}/>
                            </div> */}
                            <div className='d-flex justify-content-center'>
                                <button className='updateSubmit mt-3' type='submit' disabled={isFetching} >
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
