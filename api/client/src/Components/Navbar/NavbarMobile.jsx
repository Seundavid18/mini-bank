import React, { useContext } from 'react'
import './NavbarMobile.css'
import { SiStarlingbank } from 'react-icons/si'
import { Context } from '../../ContextApi/Context'
import { IoIosLogOut } from 'react-icons/io'


export default function NavbarMobile() {

    const {user, dispatch} = useContext(Context)
    const handleLogout =() => {
        dispatch({type: "LOGOUT"})
    }

  return (
    <div className='nav-mobile mb-3'>
        <nav className="navbar navbar-expand-lg nav-bar">
            <div className="container">
                <a className="navbar-brand bank-nameNav"><SiStarlingbank color='#fff' size={28} className="me-2"/>CHASE-BANK</a>
                
                    
                
                <div onClick={handleLogout}>              
                    <IoIosLogOut color='#fff' size={26} className="ms-4" >{ user }</IoIosLogOut>
                </div>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                        <a className="nav-link" href="#">Features</a>
                        <a className="nav-link" href="#">Pricing</a>
                        <a className="nav-link disabled">Disabled</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}
