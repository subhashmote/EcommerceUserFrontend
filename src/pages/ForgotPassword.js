import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom';
import CustomInput from '../components/CustomInput';
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordToken } from '../features/users/userSlice';



const emailSchema = yup.object({
  email: yup.string().email("Email Should Be Valid").required("Email Address is required"),
});


function ForgotPassword() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const authState = useSelector((state) => state?.auth);


  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailSchema,
    onSubmit: values => {
      dispatch(forgotPasswordToken(values));
      // navigate("/");
    },
  });

  return (
    <>
      <Meta title={'Forgot Password'} />
      <BreadCrumb title='Forgot Password' />

      <div className='login-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='auth-card'>
                <h3 className='text-center mb-3'>Reset Your Password</h3>
                <p className='text-center mt-3 mb-3'>We will send you an email to reset your password</p>
                <form className='d-flex flex-column gap-15' onSubmit={formik.handleSubmit}>
                  <CustomInput className='form-control' name='email' placeholder='Email' type='email' onChange={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    value={formik.values.email} />
                  <div className='error'>
                    <p className='text-danger'>
                      {formik.touched.email && formik.errors.email}
                    </p>
                  </div>
                  <div>
                    <div className=' mt-3 d-flex flex-column align-items-center justify-content-center gap-15'>
                      <button className='button border-0' type='submit'>Submit</button>
                      <Link to={'/login'} className=''>Cancel</Link>
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

export default ForgotPassword