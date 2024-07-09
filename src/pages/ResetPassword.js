import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import CustomInput from '../components/CustomInput'

function ResetPassword() {
  return (
    <>
      <Meta title={'Reset Password'} />
      <BreadCrumb title='Reset Password' />

      <div className='login-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='auth-card'>
                <h3 className='text-center mb-3'>Reset Password</h3>
                <form className='d-flex flex-column gap-15'>
                  <CustomInput className='form-control' name='password' placeholder='Password' type='password' />
                  <CustomInput className='form-control' name='password' placeholder='Confirm Password' type='password' />
                  <div>
                    <div className=' mt-3 d-flex align-items-center justify-content-center gap-15'>
                      <button className='button border-0'>OK</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword