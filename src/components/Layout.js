import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
        <ToastContainer/>
    </div>
  )
}

export default Layout