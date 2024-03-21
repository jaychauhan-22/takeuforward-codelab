import React from 'react'
import "../App.css"
import { Outlet } from 'react-router'

export default function Navbar() {
    return (
        <>
        <div className='container'>
        <div class="navbar">
            <div class="navbar-title">takeUforward</div>
            <button class="navbar-button">Signup</button>
        </div>
        </div>
        <Outlet />
        </>
    )
}
