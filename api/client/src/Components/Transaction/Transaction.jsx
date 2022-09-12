import React, { useContext, useState, useEffect } from 'react'
import TransactionHistory from '../History/TransactionHistory'
import Shortcut from '../Shortcuts/Shortcut'
import './Transaction.css'
import {BsArrowDownRight} from 'react-icons/bs'
import {BsArrowUpRight} from 'react-icons/bs'
import { Context } from '../../ContextApi/Context'
import moment from 'moment/moment'
import { axiosInstance } from '../../utils'



export default function Transaction() {

  const {user} = useContext(Context)
    const [history, setHistory] = useState([])
    const [balance, setBalance] = useState("")

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

  return (
    <div className='col-lg-4 ps-lg-5 pe-lg-5 mobile-container'>
      <div className='card mt-5 trans-card border-0 shadow-sm'>
        <div className='flex'>
          <h4 className='trans-text'>Transaction</h4>
          <h5 className='trans-view' data-bs-toggle="modal" data-bs-target="#viewModal">View All</h5>
        </div>
        <hr />
        <TransactionHistory />
      </div>
      <Shortcut />
        {/* Add Modal */}
        <div className="modal fade" id="viewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
    </div>
  )
}
