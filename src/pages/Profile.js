import React, { useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import Container from '../components/Container'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/users/userSlice';
import { FaRegEdit } from "react-icons/fa";



const profileSchema = yup.object({
    firstname: yup.string().required("FirstName is Required"),
    lastname: yup.string().required("LastName is Required"),
    email: yup.string().email("Email Should Be Valid").required("Email Address is required"),
    mobile: yup.number().required("Mobile Number is Required"),
});



function Profile() {

    const getTokenFromLocalStorage = localStorage.getItem("customer")
        ? JSON.parse(localStorage.getItem("customer"))
        : null;

    const config2 = {
        headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
                }`,
            Accept: "application/json",
        },
    };









    const dispatch = useDispatch();

    const userState = useSelector((state) => state?.auth?.user);
    const [edit, setEdit] = useState(true);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: userState?.firstname,
            lastname: userState?.lastname,
            email: userState?.email,
            mobile: userState?.mobile,
        },
        validationSchema: profileSchema,
        onSubmit: values => {
            dispatch(updateProfile({data:values,config2:config2}));
            setEdit(true);
        },
    });
    return (
        <>
            <Meta title={'Profile'} />
            <BreadCrumb title='Profile' />
            <Container class1='cart-wrapper home-wrapper-2 py-2'>
                <div className='row'>
                    <div className='col-12 d-flex justify-content-between align-items-center my-2'>
                        <h3>Update Profile</h3>
                        <FaRegEdit fontSize={22} className='mx-3' onClick={() => setEdit(false)} />
                    </div>
                    <div className='col-12'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="example1" className="form-label">First Name</label>
                                <input type="text" className="form-control" disabled={edit} id="example1" name='firstname'
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange("firstname")}
                                    onBlur={formik.handleBlur("firstname")}
                                />
                                <div className='error text-danger'>
                                    {
                                        formik.touched.firstname && formik.errors.firstname
                                    }
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="example2" className="form-label">Last Name</label>
                                <input type="text" className="form-control" disabled={edit} id="example2" name='lastname'
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange("lastname")}
                                    onBlur={formik.handleBlur("lastname")}
                                />
                                <div className='error text-danger'>
                                    {
                                        formik.touched.lastname && formik.errors.lastname
                                    }
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" disabled={edit} id="exampleInputEmail1" aria-describedby="emailHelp" name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                />
                                <div className='error text-danger'>
                                    {
                                        formik.touched.email && formik.errors.email
                                    }
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="example3" className="form-label">Mobile Number</label>
                                <input type="text" className="form-control" disabled={edit} id="example3" name='mobile'
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                />
                                <div className='error text-danger'>
                                    {
                                        formik.touched.mobile && formik.errors.mobile
                                    }
                                </div>
                            </div>
                            {
                                edit === false && <button type="submit" className="btn btn-primary">Save Changes</button>
                            }
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Profile