import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import headphone from '../images/headphone.jpg'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteACartProduct, getAcart, updateACartProduct } from '../features/users/userSlice';


function Cart() {

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
    const [productUpdateDetail, setProductUpdateDetail] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const cartState = useSelector((state) => state?.auth?.cartProducts);
    // console.log(cartState);

    useEffect(() => {
        dispatch(getAcart(config2));
    }, []);

    useEffect(() => {
        if (productUpdateDetail !== null) {
            dispatch(updateACartProduct({
                cartItemId: productUpdateDetail?.cartItemId,
                quantity: productUpdateDetail?.quantity
            }));
            setTimeout(() => {
                dispatch(getAcart(config2));
            }, 200);
        }
    }, [productUpdateDetail]);

    const deleteCartProduct = (id) => {
        dispatch(deleteACartProduct({id:id,config2:config2}));
        setTimeout(() => {
            dispatch(getAcart(config2));
        }, 200);
    }

    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < cartState?.length; index++) {
            sum = sum + Number(cartState[index]?.quantity) * Number(cartState[index]?.price);
            setTotalAmount(sum);
        }
    }, [cartState]);


    return (
        <>
            <Meta title={'Cart'} />
            <BreadCrumb title='Cart' />
            <section className='cart-wrapper home-wrapper-2 py-5'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='d-flex justify-content-between align-items-center cart-header'>
                                <h4 className='cart-col-1'>Product</h4>
                                <h4 className='cart-col-2'>Price</h4>
                                <h4 className='cart-col-3'>Quantity</h4>
                                <h4 className='cart-col-4'>Total</h4>
                            </div>
                            {
                                cartState && cartState?.map((item, index) => {
                                    return (
                                        <div key={index} className='d-flex justify-content-between align-items-center cart-data'>
                                            <div className='cart-col-1 d-flex gap-15 align-items-center mt-4'>
                                                <div className='w-25'>
                                                    <img src={item?.productId?.images[0].url} className='img-fluid' alt='product image'></img>
                                                </div>
                                                <div className='w-75'>
                                                    <h5 className='title'>{item?.productId?.title}</h5>
                                                    <p className='brand'>{item?.productId?.brand}</p>
                                                </div>
                                            </div>
                                            <div className='cart-col-2'>
                                                <h5 className='price'>&#8377; {item?.productId?.price}</h5>
                                            </div>
                                            <div className='cart-col-3 d-flex  align-items-center'>
                                                <div>
                                                    <input type='number' min={1} max={10} name='' id='' className='form-control w-75'
                                                        value={item?.quantity}
                                                        onChange={(e) => {
                                                            setProductUpdateDetail({
                                                                cartItemId: item?._id,
                                                                quantity: e.target.value
                                                            })
                                                        }}
                                                    ></input>
                                                </div>
                                                <div className='delete-btn'>
                                                    <MdDelete onClick={() => { deleteCartProduct(item?._id) }} fontSize={18} />
                                                </div>
                                            </div>
                                            <div className='cart-col-4'>
                                                <h4 className='total-price'>&#8377; {item?.productId?.price * item?.quantity} </h4>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className='col-12 py-2 mt-4'>
                            <div className='d-flex justify-content-between align-items-baseline'>
                                <Link to={'/product'} className='button'>Continue To Shopping</Link>
                                {
                                    (totalAmount !== null || totalAmount !== 0) &&
                                    <div className='d-flex flex-column align-items-end'>
                                        <h4>SubTotal: &#8377; {totalAmount}</h4>
                                        <p>Taxes and Shipping Calculated at checkout</p>
                                        <Link to={'/checkout'} className='button'>Checkout</Link>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart