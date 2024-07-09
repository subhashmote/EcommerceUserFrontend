import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/users/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';


const signUpSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup.string().email("Email Should Be Valid").required("Email Address is required"),
  mobile: yup.string().required("Mobile Number is Required"),
  password: yup.string().required("Password is Required"),
});

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: values => {
      dispatch(registerUser(values))
    },
  });

  






  return (
    <>
      <Meta title={'Signup'} />
      <BreadCrumb title='Signup' />

      <div className='login-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='auth-card'>
                <h3 className='text-center mb-3'>Sign Up</h3>
                <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                  <CustomInput className='form-control'
                    name='firstname'
                    placeholder='First Name'
                    type='text'
                    value={formik.values.firstname}
                    onChange={formik.handleChange('firstname')}
                    onBlur={formik.handleBlur('firstname')}
                  />
                  <div className='error'>
                    <p className='text-danger'>
                      {formik.touched.firstname && formik.errors.firstname}
                    </p>
                  </div>
                  <CustomInput className='form-control'
                    name='lastname'
                    placeholder='Last Name'
                    type='text'
                    value={formik.values.lastname}
                    onChange={formik.handleChange('lastname')}
                    onBlur={formik.handleBlur('lastname')}
                  />
                  <div className='error'>
                    <p className='text-danger'>
                      {
                        formik.touched.lastname && formik.errors.lastname
                      }
                    </p>

                  </div>
                  <CustomInput className='form-control'
                    name='email'
                    placeholder='Email'
                    type='email'
                    value={formik.values.email}
                    onChange={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                  />
                  <div className='error'>
                    <p className='text-danger'>
                      {
                        formik.touched.email && formik.errors.email
                      }
                    </p>

                  </div>
                  <CustomInput className='form-control'
                    name='mobile'
                    placeholder='Mobile No'
                    type='tel'
                    value={formik.values.mobile}
                    onChange={formik.handleChange('mobile')}
                    onBlur={formik.handleBlur('mobile')}
                  />
                  <div className='error'>
                    <p className='text-danger'>
                      {
                        formik.touched.mobile && formik.errors.mobile
                      }
                    </p>

                  </div>
                  <CustomInput className='form-control'
                    name='password'
                    placeholder='Password'
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                  />
                  <div className='error'>
                    <p className='text-danger'>
                      {
                        formik.touched.password && formik.errors.password
                      }
                    </p>
                  </div>
                  <div>
                    <div className=' mt-3 d-flex align-items-center justify-content-center gap-15'>
                      <button className='button border-0'>Signup</button>
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

export default Signup