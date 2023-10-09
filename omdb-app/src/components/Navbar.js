import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Navbar() {
  return (
    <>
    <nav>
      <ul className='list'>
        <li>
          <Link className='list-item' to="/home">Home</Link>
        </li>
        <li>
          <Link className='list-item' to="/about">About</Link>
        </li>
        <li>
          <Link className='list-item' to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>

    <Outlet />
  </>
  )
}

export default Navbar