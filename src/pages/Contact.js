import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { IoMdHome } from "react-icons/io";
import { MdCall } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { IoMdInformationCircle } from "react-icons/io";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { createQuery } from '../features/contact/contactSlice';



let contactSchema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  mobile: yup.string().required("Mobile Number is Required"),
  comment: yup.string().required("Comment is Required"),
});

function Contact() {
  const dispatch = useDispatch();



  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      email: '',
      comment:''
    },
    validationSchema:contactSchema,
    onSubmit: values => {
      dispatch(createQuery(values));
    },
  });
  return (
    <>
      <Meta title={'Contact'} />
      <BreadCrumb title='Contact' />
      <div className='contact-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120073.07855447168!2d75.222797968611!3d19.870238761575788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb9815a369bc63%3A0x712d538b29a2a73e!2sAurangabad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711868897267!5m2!1sen!2sin" width="600" height="450" className='border-0 w-100' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className='col-12 mt-5'>
              <div className='contact-inner-wrapper d-flex justify-content-between'>
                <div>
                  <h3 className='contact-title mb-4'>Contact</h3>
                  <form className='d-flex flex-column gap-15' onSubmit={formik.handleSubmit}>
                    <div>
                      <input
                       type='text' 
                       className='form-control' 
                       placeholder='Name' 
                       name='name'
                       onChange={formik.handleChange("name")}
                       onBlur={formik.handleBlur("name")}
                       value={formik.values.name}
                       />
                       <div className='errors text-danger p-1' >
                        {
                          formik.touched.name && formik.errors.name
                        }
                       </div>
                    </div>
                    <div>
                      <input 
                      type='email' 
                      className='form-control' 
                      placeholder='Email' 
                      name='email'
                       onChange={formik.handleChange("email")}
                       onBlur={formik.handleBlur("email")}
                       value={formik.values.email}
                      />
                      <div className='errors text-danger p-1'>
                        {
                          formik.touched.email && formik.errors.email
                        }
                       </div>
                    </div>
                    <div>
                      <input 
                      type='tel' 
                      className='form-control' 
                      placeholder='Mobile No' 
                      name='mobile'
                       onChange={formik.handleChange("mobile")}
                       onBlur={formik.handleBlur("mobile")}
                       value={formik.values.mobile}
                      />
                      <div className='errors text-danger p-1'>
                        {
                          formik.touched.mobile && formik.errors.mobile
                        }
                       </div>
                    </div>
                    <div>
                      <textarea 
                      cols='30' 
                      className='w-100 form-control' 
                      rows='4' 
                      placeholder='Comments' 
                      name='comment'
                       onChange={formik.handleChange("comment")}
                       onBlur={formik.handleBlur("comment")}
                       value={formik.values.comment}
                      />
                      <div className='errors text-danger p-1'>
                        {
                          formik.touched.comment && formik.errors.comment
                        }
                       </div>
                    </div>
                    <div>
                      <button className='button border-0'>Submit</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className='contact-title mb-4'>Get In Touch With Us</h3>
                  <div>
                    <ul className='ps-0'>
                      <li className='mb-0 d-flex gap-10'>
                        <IoMdHome fontSize={24} />
                        <address>
                          Home No:36
                          Chattrapati Sambhajinagar,Maharashtra 
                          PinCode:431001
                        </address>
                      </li>
                      <li className='mb-3 d-flex gap-10'>
                        <MdCall fontSize={24} />
                        <a href='tel:+91 9834946009'>+91 9834946009</a>
                        </li>
                      <li className='mb-3 d-flex gap-10'>
                        <IoIosMail fontSize={24} />
                        <a href='mailto:subhashmote94@gmail.com'>subhashmote94@gmail.com</a>
                        </li>
                      <li className='mb-3 d-flex gap-10'>
                        <IoMdInformationCircle fontSize={24} />
                        <p>Monday To Friday 10AM To 8PM</p>
                        </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact