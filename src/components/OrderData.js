import React from 'react'

function OrderData({orderState}) {

    // console.log(orderState);
    const orderItems = orderState;
    // console.log(orderItems);
  return (
    <>
        {
            orderState && orderState?.map((item,index)=>{
                return(
                    <tr key={index} className='active-row'>
                        <td>{item?._id}</td>
                        {/* <td>{item?.orderItems[0]?.product?.title}</td>
                        <td>{item?.orderItems[0]?.quantity}</td> */}
                        <td>{item?.totalPrice}</td>
                        <td>{item?.totalPriceAfterDiscount}</td>
                    </tr>
                )
            })
        }
    </>
  )
}

export default OrderData