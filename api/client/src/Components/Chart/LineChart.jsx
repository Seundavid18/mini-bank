import React, { useContext, useState, useEffect } from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import { Context } from '../../ContextApi/Context'
import moment from 'moment/moment'
import { axiosInstance } from '../../utils'


export default function LineChart() {

  const {user} = useContext(Context)
  const [history, setHistory] = useState([])
    
    useEffect(()=>{
        const getHistory = async () => {
          const res = await axiosInstance.get('/transactionhistory/' + user._id)
          setHistory(
            res.data.data.transactionHistory.sort((a, b) => {
                return new Date(b.timeStamps) - new Date(a.timeStamps)
            }))
          console.log(res.data.data.transactionHistory.sort((a, b) => {
            return new Date(b.timeStamps) - new Date(a.timeStamps)
        }))
        }
        getHistory()
      }, [setHistory])


  var data = {
    labels: history.slice(0,12).map(t => moment(t.timeStamps).format('dddd').slice(0,3)),
    datasets: [
      {
        label: 'Cash Deposit',
        data: history.slice(0,10).map(t => t.depositorName && t.amount),
        backgroundColor: ['#20e662'],
        borderColor: '#20e662',
        borderWidth: 2,
        tension: 0.4,
        spanGaps: true
      },

    {
      label: 'Credit',
      data: history.slice(0,12).map(t => t.transferFrom && t.amount),
      backgroundColor: ['#20e662'],
      borderColor: '#20e662',
      borderWidth: 2,
      tension: 0.4,
      spanGaps: true
    },

    {
      label: 'Debit',
      data: history.slice(0,12).map(t => t.transferTo && t.amount),
      backgroundColor: ['#f54343'],
      borderColor: '#f54343',
      borderWidth: 2,
      tension: 0.4,
      spanGaps: true
    }
  ]
}

    var options = {
      maintainAspectRatio: false,
      scales: {
          y: {
              beginAtZero: true
          }
      },
      legend: {
        labels: {
          fontSize: 22
        }
      }
    }

  return (

    <div className='mb-5'>
      <Line 
        data={data}
        height={400}
        options={options}
      />  
    </div>
  )
}
