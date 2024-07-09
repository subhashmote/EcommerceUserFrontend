import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from '../components/CustomInput'

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/users/userSlice'

const loginSchema = yup.object({
  email: yup.string().email("Email Should Be Valid").required("Email Address is required"),
  password: yup.string().required("Password is Required"),
});


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const authState = useSelector((state) => state?.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      dispatch(loginUser(values));
    },
  });


  useEffect(()=>{
    if(authState?.user !== null && authState?.isError === false){
      navigate("/");
    }
  },[authState]);


  return (
    <>
      <Meta title={'Login'} />
      <BreadCrumb title='Login' />
      <div className='login-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='auth-card'>
                <h3 className='text-center mb-3'>Login</h3>
                <form className='d-flex flex-column gap-15' onSubmit={formik.handleSubmit}>
                  <CustomInput className='form-control' name='email' placeholder='Email' type='email'
                    onChange={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    value={formik.values.email}
                  />
                  <div className='error'>
                    <p className='text-danger'>
                      {formik.touched.email && formik.errors.email}
                    </p>

                  </div>
                  <CustomInput className='form-control' name='password' placeholder='Password' type='password'
                    onChange={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    value={formik.values.password} />
                  <div>
                    <div className='error'>
                      <p className='text-danger'>
                        {formik.touched.password && formik.errors.password}
                      </p>
                    </div>
                    <Link to={'/forgot-password'} className='mx-2'>Forgot Password?</Link>
                    <div className=' mt-3 d-flex align-items-center justify-content-center gap-15'>
                      <button className='button border-0' type='submit'>Login</button>
                      <Link to={'/signup'} className='button signup'>SignUp</Link>
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

export default Login