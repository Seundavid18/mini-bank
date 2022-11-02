import React, {useState, useEffect, useContext} from 'react'
import './Services.css'
import { RiLuggageDepositFill } from 'react-icons/ri'
import {BsArrowDownRight} from 'react-icons/bs'
import { VscHistory } from 'react-icons/vsc'
import {BsArrowUpRight} from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'
import {BsCheckCircleFill} from 'react-icons/bs'
import CircularProgress  from '@mui/material/CircularProgress'
import { Context } from '../../ContextApi/Context'
import moment from 'moment/moment'
import { axiosInstance } from '../../utils'


export default function Services() {


  const [accountNumber, setAccountNumber] = useState("") 
  const [fullName, setFullName] = useState("")
  const [amount, setAmount] = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [balance, setBalance] = useState("")
  const {user} = useContext(Context)

  useEffect(() =>{
    const fetchBalance = async () => {
      const res = await axiosInstance.get('/getaccount/'+ user._id)
      setBalance(res.data.data.balance)
    }
    fetchBalance()
  })

  
  useEffect(()=>{
      const getHistory = async () => {
        const res = await axiosInstance.get('/transactionhistory/' + user._id)
        setHistory(
          res.data.data.transactionHistory.sort((a, b) => {
              return new Date(b.timeStamps) - new Date(a.timeStamps)
          }))
      }
      getHistory()
    })

  const handleAccount = (e) => {
    setAccountNumber(e.target.value)
  }
  const handlefullName = (e) => {
    setFullName(e.target.value)
  }
  const handleAmount = (e) => {
    setAmount(e.target.value)
  }

  const handleReload = () => {
    window.location.reload('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const deposit ={
      accountNumber,
      fullName,
      amount,
    }

    try{
      setLoading(true)
      const res = await axiosInstance.post('/deposit', deposit)
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
        <div className='row row-col-lg row-col-2'>
            <div className='col'>
              <div className='trans' data-bs-toggle="modal" data-bs-target="#addHistModal">
                <VscHistory size={30} color="#222"/>
                <h6 className='tra mt-3'>History</h6>
              </div>
            </div>
            {/* Add Modal */}
        <div className="modal fade" id="addHistModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="exampleModalLabel">Transaction History</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body container">
            <h5 className='amount mb-4'>Balance: $ {balance}</h5>
              <div>    
                {history.map((transaction, index) => {
                    return (
                        <div key={index} className="history">
                            <div  className='d-flex'>
                                <div className='col-2'>
                                    {transaction.transferFrom || transaction.depositorName ? (
                                        <div className='icon'>
                                            <BsArrowDownRight size={17} color="#20e662"/>
                                        </div> 
                                        ) : (
                                            <div className='icon'>
                                                <BsArrowUpRight size={17} color="#f54343"/>
                                            </div>
                                        ) 
                                    }   
                                </div>
                                <div className='col-6 mt-2'>
                              
                                {transaction.transferFrom || transaction.depositorName ? (
                                    <>
                                    <p className='history-name'>{transaction.transferFrom || transaction.depositorName}</p>
                                    <p className='time-date'>{moment(transaction.timeStamps).format().slice(0, 16).replace('T', ' ')}</p>
                                    </>
                                    ) : (
                                        <>
                                        <p className='history-name'>{transaction.transferTo}</p>
                                        <p className='time-date'>{moment(transaction.timeStamps).format().slice(0, 16).replace('T', ' ')}</p>
                                        </>
                                    )
                                }
                                    
                                </div>
                                <div className='col-4 mt-2'>
                                {transaction.transferFrom || transaction.depositorName ? (
                                    <p className='amounts float-end'style={{color: '#20e662'}}>+ ${transaction.amount}</p>
                                    ) : (
                                        <p className='amounts float-end'style={{color: '#f54343'}}>- ${transaction.amount}</p>
                                    )
                                }
                                    
                                </div>
                            </div>
                        </div>
                    )}
                    )
                }   
              </div>
            </div>
          </div>
        </div>
      </div>
            <div className='col'>
              <div className='trans' data-bs-toggle="modal" data-bs-target="#addDepositModal">
                  <RiLuggageDepositFill size={25} color="#222"/>
                  <h6 className='tra mt-3'>Deposit</h6>
              </div>
            </div>
                    {/* Add Modal */}
                <div className="modal fade" id="addDepositModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                        <h5 className="modal-title" id="exampleModalLabel">Deposit</h5>
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
                                <label className='modal-label-deposit'>Account Number</label>
                                <input type="number" name="acc" id="addtask" className="form-control" required onChange={handleAccount}/>
                            </div>
                            <div className="mb-3">
                                <label className='modal-label-deposit'>Beneficiary Name</label>
                                <input type="text" name="acc" id="addtask" className="form-control" required onChange={handlefullName}/>
                            </div>
                            <div className="mb-3">
                                <label className='modal-label-deposit'>Amount</label>
                                <input type="number" name="acc" id="addtask" className="form-control" required onChange={handleAmount}/>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button className='depositSubmit mt-3' type='submit' disabled={loading}>
                                  {loading ? (
                                    <CircularProgress size={18} className="mt-1"/>
                                    ) : (
                                      "Deposit"
                                    )
                                  }
                                </button>
                            </div>  
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            <div className='col'>
            
            </div>
        </div>
    </>
  )
}
