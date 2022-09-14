import React, { useContext } from 'react'
import './Card.css'
import { SiStarlingbank } from 'react-icons/si'
import Transfer from '../Transfer/Transfer'
import Services from '../Services/Services'
import LineChart from '../Chart/LineChart'
import { Context } from '../../ContextApi/Context'



export default function Card() {

  
    const {user} = useContext(Context)
    const date = new Date();
    const hours = date.getHours();

  return (
    <div className='col-lg-6 ps-lg-5 pe-lg-5 mobile-container'>
      {hours >= 12 ? hours >=16 ? (
        <h4 className='mt-lg-5 card-greeting'>Good Evening, {user.fullName}</h4>
      ) : (
        <h4 className='mt-lg-5 card-greeting'>Good Afternoon, {user.fullName}</h4>
      ) : (
        <h4 className='mt-lg-5 card-greeting'>Good Morning, {user.fullName}</h4>
      )
        }
      <h5 className='card-heading mt-5'>My Card</h5>
      <div className='row row-cols-lg'>
        <div className="col-lg-8">
          <div className="card-box mt-3">
            <div className='mastercard-icon float-end me-3'></div>
            <SiStarlingbank size={35} color="#fff"/>
            <h6 className='holders mt-4'>Holder's Name</h6>
            <span className='holders-name'>{user.fullName}</span>
            <div className='float-end mt-5 d-flex gap-1'>
              <span>
                <div className='activeCircle'></div>
              </span>
              <h6 className='activeText'>Active</h6>
            </div>
            <div className='mt-4'>
              <h6 className='holders'>Account Number</h6>
              <span className='holders-name'>{user.accountNumber}</span>
            </div>
          </div>
        </div>
        <div className='col-lg-4'>
          <Transfer />
        </div>
      </div>
        <Services />
        <div className='mt-5'>
          <span className='float-end'>
            <div className='activity-box'>
              <p>Past 12 Transactions</p>
            </div>
          </span>
          <h6 className='card-heading'>Money Flow</h6>
        </div>

        <LineChart />

    </div>
  )
}
