import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { config } from '../utils/axiosConfig';
import { createAnOrder, deleteAllCartProducts, resetState } from '../features/users/userSlice';

const shippingSchema = yup.object({
    firstname: yup.string().required("FirstName is required"),
    lastname: yup.string().required("LastName is required"),
    address: yup.string().required("Address is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    pincode: yup.number().required("Pincode is required"),
    country: yup.string().required("Country is required"),
});

function Checkout() {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state?.auth?.cartProducts);
    const authState = useSelector((state)=>state?.auth);
    const navigate = useNavigate();
    // console.log(authState);

    const [totalAmount, setTotalAmount] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState({ razorpayPaymentId: "", razorpayOrderId: "" });
    const [cartProductState, setCartProductState] = useState([]);

    useEffect(()=>{
        if(authState?.orderedProduct?.order !== null && authState?.orderedProduct?.success === true){
            navigate("/my-orders");
        }
    },[authState]);

    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < cartState?.length; index++) {
            sum = sum + Number(cartState[index]?.quantity) * Number(cartState[index]?.price);
            setTotalAmount(sum);
        }
    }, [cartState]);

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            address: "",
            state: "",
            city: "",
            pincode: "",
            country: "",
        },
        validationSchema: shippingSchema,
        onSubmit: values => {
            setShippingInfo(values);
            checkOutHandler(values);
        },
    });

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            }
            script.onerror = () => {
                resolve(false);
            }
            document.body.appendChild(script);
        });
    }

    useEffect(() => {
        let items = [];
        for (let index = 0; index < cartState?.length; index++) {
            items.push({ product: cartState[index]?.productId?._id, quantity: cartState[index]?.quantity, color: cartState[index]?.productId?.color[0], price: cartState[index]?.price })
        }
        setCartProductState(items);
    }, [cartState]);

    const checkOutHandler = async (shippingInfo) => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK Failed TO Load!");
            return;
        }

        const result = await axios.post("http://localhost:5000/api/user/order/checkout", { amount: totalAmount + 5 }, config);
        if (!result) {
            alert("Something Went Wrong!");
            return;
        }

        const { amount, id: order_id, currency } = result.data.order;
        const options = {
            key: "rzp_test_Vbu2AMBbOLvSOB",
            amount: amount,
            currency: currency,
            name: "Dev Ecommerce",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                };

                const paymentVerificationResult = await axios.post("http://localhost:5000/api/user/order/paymentVerification", data, config);

                setPaymentInfo({
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                });

                dispatch(createAnOrder({
                    totalPrice: totalAmount,
                    totalPriceAfterDiscount: totalAmount,
                    orderItems: cartProductState,
                    paymentInfo: {
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                    },
                    shippingInfo: shippingInfo
                }));

                dispatch(deleteAllCartProducts());

                dispatch(resetState());
            },
            prefill: {
                name: "Dev Ecom",
                email: "devecom@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Dev Ecom Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className='checkout-wrapper py-5 home-wrapper-2'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-7'>
                        <div className='checkout-left-data'>
                            <h3 className='website-name'>DevEcom</h3>
                            <nav style={{ "--bs-breadcrumb-divider": '>' }} aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to='/cart' className='text-dark'>Cart</Link></li>
                                    &nbsp; /
                                    <li className="breadcrumb-item active" aria-current="page">Information</li>
                                    &nbsp; /
                                    <li className="breadcrumb-item">Shipping</li>
                                    &nbsp; /
                                    <li className="breadcrumb-item active" aria-current="page">Payment</li>
                                </ol>
                            </nav>
                            <h4 className='title'>Contact Information</h4>
                            <p className='user-details'>
                                Subhash Mote (subhashmote@gmail.com)
                            </p>
                            <h3 className='mb-3'>Shipping Address</h3>
                            <form
                                onSubmit={formik.handleSubmit}
                                className='d-flex flex-wrap gap-15 justify-content-between'>
                                <div className='w-100'>
                                    <select name='country' className='form-control form-select' id='country' onChange={formik.handleChange("country")} onBlur={formik.handleBlur("country")} value={formik.values.country}>
                                        <option value='' selected disabled>
                                            Select Country
                                        </option>
                                        <option value='India'>India</option>
                                    </select>
                                    <div className='error text-danger mx-1'>
                                        {formik.touched.country && formik.errors.country}
                                    </div>
                                </div>
                                <div className='flex-grow-1'>
                                    <input
                                        type='text'
                                        placeholder='First Name'
                                        className='form-control'
                                        name='firstname'
                                        onChange={formik.handleChange("firstname")}
                                        onBlur={formik.handleBlur("firstname")}
                                        value={formik.values.firstname}
                                    ></input>
                                    <div className='error text-danger mx-1'>
                                        {formik.touched.firstname && formik.errors.firstname}
                                    </div>
                                </div>
                                <div className='flex-grow-1'>
                                    <input
                                        type='text'
                                        placeholder='Last Name'
                                        className='form-control'
                                        name='lastname'
                                        onChange={formik.handleChange("lastname")}
                                        onBlur={formik.handleBlur("lastname")}
                                        value={formik.values.lastname}
                                    ></input>
                                    <div className='error text-danger mx-1'>
                                        {formik.touched.lastname && formik.errors.lastname}
                                    </div>
                                </div>
                                <div className='w-100'>
                                    <input
                                        type='text'
                                        placeholder='Address'
                                        className='form-control'
                                        name='address'
                                        onChange={formik.handleChange("address")}
                                        onBlur={formik.handleBlur("address")}
                                        value={formik.values.address}
                                    ></input>
                                    <div className='error text-danger mx-1'>
                                        {formik.touched.address && formik.errors.address}
                                    </div>
                                </div>
                                <div className='w-100'>
                                    <input
                                        type='text'
                                        placeholder='Apartment, suite etc (optional)' className='form-control'
                                        name='other'
                                        onChange={formik.handleChange("other")}
                                        onBlur={formik.handleBlur("other")}
                                        value={formik.values.other}
                                    ></input>
                                </div>
                                <div className='flex-grow-1'>
                                    <input
                                        type='text'
                                        placeholder='City'
                                        className='form-control'
                                        name='city'
                                        onChange={formik.handleChange("city")}
                                        onBlur={formik.handleBlur("city")}
                                        value={formik.values.city}
                                    ></input>
                                    <div className='error text-danger mx-1'>
                                        {formik.touched.city && formik.errors.city}
                                    </div>
                                </div>
                                <div className='flex-grow-1'>
                                    <select name='state' className='form-control form-select' id=''
                                        onChange={formik.handleChange("state")}
                                        onBlur={formik.handleBlur("state")}
                                        value={formik.values.state}
                                    >
                                        <option value='' selected disabled>
                                            Select State
                                        </option>
                                        <option value='Maharashtra'>Maharashtra</option>
                                    </select>
                                    <div className='error text-danger mx-1'>
                                        {formik.touched.state && formik.errors.state}
                                    </div>
                                </div>
                                <div className='flex-grow-1'>
                                    <input
                                        type='text'
                                        placeholder='Zipcode'
                                        className='form-control'
                                        name='pincode'
                                        onChange={formik.handleChange("pincode")}
                                        onBlur={formik.handleBlur("pincode")}
                                        value={formik.values.pincode}
                                    ></input>
                                    <div className='error text-danger mx-1'>
                                        {formik.touched.pincode && formik.errors.pincode}
                                    </div>
                                </div>
                                <div className='w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <Link to={'/cart'} className='text-dark'> <IoIosArrowBack fontSize={20} /> Return To Cart</Link>
                                        <Link to={'/cart'} className='button'>Continue To Shipping</Link>
                                        <button className='button border-0' type='submit'>Place Order</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-5'>
                        <div className='border-bottom py-4'>
                            {cartState && cartState.map((item, index) => {
                                return (
                                    <div className='d-flex gap-10 align-items-center m-4 p-2' key={index}>
                                        <div className='w-75 d-flex gap-10'>
                                            <div className='w-25'>
                                                <img src={item?.productId?.images[0]?.url} className='img-fluid' alt='product'></img>
                                            </div>
                                            <div>
                                                <h6 className='title'>{item?.productId?.title}</h6>
                                                <p>{item?.productId?.brand}</p>
                                            </div>
                                        </div>
                                        <div className='flex-grow-1'>
                                            <h5>&#8377; {item?.price}</h5>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='border-bottom py-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p>SubTotal</p>
                                <p>&#8377; {totalAmount ? totalAmount : 0}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className='mb-0'>Shipping</p>
                                <p className='mb-0'>&#8377; 5</p>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
                            <h4>Total</h4>
                            <h5>&#8377; {totalAmount ? totalAmount + 5 : 0}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;
