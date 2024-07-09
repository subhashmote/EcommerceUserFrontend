import React, { useEffect } from 'react'
import Container from '../components/Container';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/users/userSlice';
import OrderData from '../components/OrderData';

function Orders() {
    const dispatch = useDispatch();

    const orderState = useSelector((state) => state?.auth?.getorderedProduct?.orders);
    // console.log(orderState);

    useEffect(() => {
        dispatch(getOrders());
    }, []);


    return (
        <>
            <Meta title={'My Orders'} />
            <BreadCrumb title='My Orders' />
            <Container class1='cart-wrapper home-wrapper-2 py-2'>
                <div className='row'>
                    <table className='styled-table'>
                        <thead>
                            <tr>
                                <th>Product Id</th>
                                {/* <th>Product Name</th>
                                <th>Quantity</th> */}
                                <th>Total Amount</th>
                                <th>Total Amount After Discount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <OrderData orderState={orderState} />
                        </tbody>
                    </table>
                </div>

            </Container>
        </>
    )
}

export default Orders