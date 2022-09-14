import React, { useContext, useEffect, useState } from 'react'
import './Transfer.css'
import { BiTransfer } from 'react-icons/bi'
import { Context } from '../../ContextApi/Context'
import {MdCancel} from 'react-icons/md'
import {BsCheckCircleFill} from 'react-icons/bs'
import CircularProgress  from '@mui/material/CircularProgress'
import { axiosInstance } from '../../utils'



export default function Transfer() {
  const {user} = useContext(Context)
  const [accountNumber, setAccountNumber] = useState("") 
  const [fullName, setFullName] = useState("")
  const [amount, setAmount] = useState("")
  const [pin, setPin] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [balance, setBalance] = useState("")
  const [loading, setLoading] = useState(false)
  



  const handleAccount = (e) => {
    setAccountNumber(e.target.value)
  }
  const handlefullName = (e) => {
    setFullName(e.target.value)
  }
  const handleAmount = (e) => {
    setAmount(e.target.value)
  }
  const handlePin = (e) => {
    setPin(e.target.value)
  }
  

  useEffect(() =>{
    const fetchBalance = async () => {
      const res = await axiosInstance.get('getaccount/'+ user._id)
      setBalance(res.data.data.balance)
    }
    fetchBalance()
  })

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
      balance: user.balance,
      userId: user._id
    }

    try{
      setLoading(true)
      const res = await axiosInstance.post('transfer/' + user._id, transfer)
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
        <div className='bal-box'>
            <h6 className='bal text-secondary'>Total Balance</h6>
            <span className='amount'>$ {balance}</span>
            <h6 className='bal text-secondary mt-4'>Currency</h6>
            <span className='amount'>US Dollar</span>
            <button className='withdraw mt-3' data-bs-toggle="modal" data-bs-target="#addModal"><BiTransfer size={20} color="#fff" className='me-2' />Transfer</button>
        </div>

        {/* Add Modal */}
      <div className="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="exampleModalLabel">Transfer</h5>
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
                      <input type="number" name="acc" id="addtask" className="form-control" required onChange={handleAccount} />
                  </div>
                  <div className="mb-3">
                      <label className='modal-label'>Beneficiary Name</label>
                      <input type="text" name="acc" id="addtask" className="form-control" required onChange={handlefullName} />
                  </div>
                  <div className="mb-3">
                      <label className='modal-label'>Amount</label>
                      <input type="number" name="acc" id="addtask" className="form-control" required onChange={handleAmount} />
                  </div>
                  <div className="mb-3">
                      <label className='modal-label'>Pin</label>
                      <input type="password" name="acc" id="addtask" className="form-control" required onChange={handlePin} />
                  </div>
                  <div className='d-flex justify-content-center'>
                    <button className='tranferSubmit mt-3' type='submit' disabled={loading}>
                      {loading ? (
                        <CircularProgress size={18} className="mt-1"/>
                        ) : (
                          "Transfer"
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


                  