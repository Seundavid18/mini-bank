import React from 'react'
import NavbarDesktop from '../../Components/Navbar/NavbarDesktop'
import Card from '../../Components/Card/Card'
import Transaction from '../../Components/Transaction/Transaction'
import NavbarMobile from '../../Components/Navbar/NavbarMobile'

export default function Home() {
  return (
    <div>
        <NavbarMobile />
        <div className='d-lg-flex'>
          <NavbarDesktop />
          <Card />
          <Transaction />
        </div>
    </div>
  )
}
