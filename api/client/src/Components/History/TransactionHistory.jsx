import React, { useContext, useState, useEffect } from 'react'
import './TransactionHistory.css'
import {BsArrowDownRight} from 'react-icons/bs'
import {BsArrowUpRight} from 'react-icons/bs'
import { Context } from '../../ContextApi/Context'
import moment from 'moment/moment'
import { axiosInstance } from '../../utils'


export default function TransactionHistory() {
    const {user} = useContext(Context)
    const [history, setHistory] = useState([])
    
    useEffect(()=>{
        const getHistory = async () => {
          const res = await axiosInstance.get('/transactionhistory/' + user._id)
          setHistory(
            res.data.data.transactionHistory.sort((a, b) => {
                return new Date(b.timeStamps) - new Date(a.timeStamps)
            }))
        }
        getHistory()
      }, [setHistory])

       

    return (
    <>
        <div>    
            {history.slice(0,6).map((transaction, index) => {
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
    </>
    )
}
 