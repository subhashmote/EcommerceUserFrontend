import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


function Footer() {
  return (
    <>
    <footer className='py-4'>
      <div className='container-xxl'>
        <div className='row align-items-center'>
          <div className='col-5'>
            <div className='footer-top-data d-flex gap-30 align-items-center '>
              <img src='images/newsletter.png' alt='newsletter'></img>
              <h2 className='text-white mb-0'>Sign For News Letter</h2>
            </div>
          </div>
          <div className='col-7'>
          <div className="input-group">
                <input type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address.. "
                  aria-label="Your Email Address.. "
                  aria-describedby="basic-addon2" />
                <span className="input-group-text p-2" id="basic-addon2">Subscribe</span>
              </div>
          </div>
        </div>
      </div>
    </footer>
    <footer className='py-4'>
      <div className='container-xxl'>
        <div className='row'>
          <div className='col-4'>
            <h4 className='text-white mb-4'>Contact Us</h4>
            <div>
              <address className='text-white fs-6'>Home No:36 Near Railway Station, <br></br>
                Chattrapati Sambhajinagar,Maharashtra <br></br>
                PinCode:431001
              </address>
              <a href='tel:+91 9834946009' className='mt-4 d-block mb-2 text-white'>
                +91 9834946009
              </a>
              <a href='mailto:subhashmote94@gmail.com' className='mt-4 d-block mb-2 text-white'>
                subhashmote94@gmail.com
              </a>
              <div className='social-icons d-flex align-items-center gap-30 mt-4'>
                 <a className='text-white' href=''>
                  <FaGithub className='fs-4'/>
                 </a>
                 <a className='text-white' href=''>
                  <FaYoutube className='fs-4'/>
                 </a>
                 <a className='text-white' href=''>
                  <FaInstagramSquare className='fs-4'/>
                 </a>
                 <a className='text-white' href=''>
                  <FaLinkedin className='fs-4'/>
                 </a>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <h4 className='text-white mb-4'>Information</h4>
            <div className='footer-links d-flex flex-column'>
              <Link className='text-white py-2 mb-1' to={'/privacy-policy'}>Privacy Policy</Link>
              <Link className='text-white py-2 mb-1' to={'/refund-policy'}>Refund Policy</Link>
              <Link className='text-white py-2 mb-1' to={'/shipping-policy'}>Shipping Policy</Link>
              <Link className='text-white py-2 mb-1' to={'/termandconditions'}>Terms & Conditions</Link>
              <Link className='text-white py-2 mb-1'>Blogs</Link>
            </div>
          </div>
          <div className='col-3'>
            <h4 className='text-white mb-4'>Account</h4>
            <div className='footer-links d-flex flex-column'>
              <Link className='text-white py-2 mb-1'>About US</Link>
              <Link className='text-white py-2 mb-1'>Faq</Link>
              <Link className='text-white py-2 mb-1'>Contact</Link>
              {/* <Link className='text-white py-2 mb-1'></Link> */}
            </div>
          </div>
          <div className='col-2'>
            <h4 className='text-white mb-4'>Quick Links</h4>
            <div className='footer-links d-flex flex-column'>
              <Link className='text-white py-2 mb-1'>Laptop</Link>
              <Link className='text-white py-2 mb-1'>Headphones</Link>
              <Link className='text-white py-2 mb-1'>Tablets</Link>
              <Link className='text-white py-2 mb-1'>Watches</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <footer className='py-4'>
      <div className='container-xxl'>
        <div className='row'>
          <div className='col-12'>
            <p className='text-center text-white mb-0'>&copy; {new Date().getFullYear()}:Powered By Dev Ecom</p>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer