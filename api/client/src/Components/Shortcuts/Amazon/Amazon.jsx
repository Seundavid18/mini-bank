import React, { useContext, useState } from 'react'
import './Amazon.css'
import amazonImg from '../../../Images/122-1229893_10-amazon-gift-card-amazon-logo-square.png'
import { Context } from '../../../ContextApi/Context'
import {MdCancel} from 'react-icons/md'
import {BsCheckCircleFill} from 'react-icons/bs'
import CircularProgress  from '@mui/material/CircularProgress'
import { axiosInstance } from '../../../utils'

export default function Amazon() {

  const {user} = useContext(Context)
  const [accountNumber, setAccountNumber] = useState("") 
  const [fullName, setFullName] = useState("")
  const [pin, setPin] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState("")
  const [showOption, setShowOption] = useState(false)

  const handleAccount = (e) => {
    setAccountNumber(e.target.value)
  }
  const handlefullName = (e) => {
    setFullName(e.target.value)
  }

  const handlePin = (e) => {
    setPin(e.target.value)
  }

  const handleAmount = (e) => {
    setAmount(e.target.value)
    if(e.target.value){
        setShowOption(true)
    }else{
        setShowOption(false)
    }
  }

  const handleReload = () => {
    window.location.reload('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const transfer ={
      accountNumber,
      fullName,
      amount,
      pin,
      userId: user._id
    }

    try{
      setLoading(true)
      const res = await axiosInstance.post('/transfer/' + user._id, transfer)
      if(res.data.success === true){
        setSuccessMsg(res.data.msg)
      }else{
        setErrorMsg(res.data.msg)
      }
      setLoading(false)
    }catch(error){}

  }

  return (
    <>
        <div className='shortcard' data-bs-toggle="modal" data-bs-target="#amazonModal">
            <div className='d-flex justify-content-center'>
                <img src={amazonImg} alt="" className='shortImg' />
            </div>
            <h6 className='short mt-4 text-center'>Amazon</h6>
        </div>

        {/* Add Modal */}
      <div className="modal fade" id="amazonModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="exampleModalLabel">Amazon</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleReload}></button>
            </div>
            <div className="modal-body">
            {successMsg ? (
              successMsg && 
              <div>
                <div className="d-flex mx-auto justify-content-center align-items-center">
                  <BsCheckCircleFill size={60} color="#65e965"/>
                </div>
                <h4 className='text-center d-flex justify-content-center align-items-center successMsg mt-2'>{successMsg}</h4>
              </div>
            ) : (
              errorMsg && 
              <div>
                <div className="d-flex mx-auto justify-content-center align-items-center">
                  <MdCancel size={60} color="#eb5151"/>
                </div>
                <h4 className='text-center d-flex justify-content-center align-items-center errorMsg mt-2'>{errorMsg}</h4>
              </div>
            )}
              <form id="addform" onSubmit={handleSubmit}>
                  <div className="mb-3">
                      <label className='modal-label'>Account Number</label>
                        <select className="modal-bank-apple form-control" required onChange={handleAccount}>
                            <option>Select Account Number--</option>
                            <option value="130931">130931</option>
                        </select>
                  </div>
                  <div className="mb-3">
                      <label className='modal-label'>Beneficiary Name</label>
                        <select className="modal-bank-apple form-control" required onChange={handlefullName}>
                            <option>Select Account Name--</option>
                            <option value="Amazon">Amazon</option>
                        </select>
                  </div>
                  <div className="mb-3">
                      <label className='modal-label'>Type</label>
                        <select className='modal-bank-apple form-control' required onChange={handleAmount}>
                            <option>Select Plan--</option>
                            <option value="2000">Amazon Card - $2000</option>
                            <option value="200">AWS Exam - $200</option>
                            <option value="340">Amazon Tutorial Plan - $340</option>
                        </select>
                  </div>
                    {showOption &&
                        <div className="mb-3">
                            <label className='modal-label'>Amount</label>
                            <input type="number" name="acc" id="addtask" className="form-control" disabled required value={amount} onChange={handleAmount} />
                        </div>
                    }
                  <div className="mb-3">
                      <label className='modal-label'>Pin</label>
                      <input type="password" name="acc" id="addtask" className="form-control" required onChange={handlePin} />
                  </div>
                  <div className='d-flex justify-content-center'>
                    <button className='tranferSubmit mt-3' type='submit' disabled={loading}>
                      {loading ? (
                        <CircularProgress size={18} className="mt-1"/>
                        ) : (
                          "Pay"
                        )
                      }
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
