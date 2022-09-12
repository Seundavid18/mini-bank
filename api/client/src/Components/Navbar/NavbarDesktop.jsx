import React, { useContext } from 'react'
import './NavbarDesktop.css'
import { SiStarlingbank } from 'react-icons/si'
import { RiDashboardFill } from 'react-icons/ri'
import { BsWallet2 } from 'react-icons/bs'
import { BiMessageMinus } from 'react-icons/bi'
import { IoIosLogOut } from 'react-icons/io'
import { Context } from '../../ContextApi/Context'


export default function NavbarDesktop() {

  const {user, dispatch} = useContext(Context)
  const handleLogout = () => {
    dispatch({type: "LOGOUT"})
  }



  return (
    <div className='col nav-card'>
      <h4 className='bank-name mt-4'><SiStarlingbank color='#2c5da9' size={28} className="ms-3 mt-1 me-3"/>CHASE-BANK</h4>
      <div>
        <hr />

      </div>
      <div className='nav-items'>
        <ul>
          <li style={{color: "#2c5da9"}} className="fw-bold nav-icon"><RiDashboardFill color='#0278b5' size={26} className="me-3"/> Dashboard</li>
          <li><BsWallet2 color='#5a5a5a' size={26} className="me-3 nav-icon"/> 
          Payments
          <span className='nav-not ms-3'>13</span>
          </li>
          <li><BiMessageMinus color='#5a5a5a' size={26} className="me-3"/> 
          Messages
          <span className='nav-not2 ms-3'>5</span>
          </li>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          {/* <li><AiOutlineSetting color='#5a5a5a' size={26} className="me-3"/> Settings</li> */}
          <li onClick={handleLogout}>              
            <IoIosLogOut color='#5a5a5a' size={26} className="me-3" /> { user && "Logout" } 
          </li>
        </ul>
      </div>
    </div>
  )
}
