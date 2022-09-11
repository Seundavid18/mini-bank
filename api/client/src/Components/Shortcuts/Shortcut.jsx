import React from 'react'
import './Shortcut.css'
import Apple from './AppleMusic/Apple'
import Netflix from './Netflix/Netflix'
import Power from './Paypal/Power'
import Steam from './Steam/Steam'
import Dribble from './Dribble/Dribble'
import Amazon from './Amazon/Amazon'

export default function Shortcut() {
  return (
    <>
    <h6 className='shortcut'>Pay Bills</h6>
        <div className='row row-cols-3 mb-4'>
            <div className='col'>
                <Apple />
            </div>
            <div className='col'>
                <Netflix />
            </div>
            <div className='col'>
                <Power />
            </div>
            <div className='col'>
                <Steam />
            </div>
            <div className='col'>
                <Dribble />
            </div>
            <div className='col'>
                <Amazon />
            </div>
        </div>
    </>
  )
}
