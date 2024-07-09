import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';

function SpecialProduct(props) {
    const {title,brand,totalrating,price,sold,quantity,image,id} = props;
    return (
        <div className='col-4'>
            <div className='special-product-card'>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <img src={image} alt='laptop'></img>
                    </div>
                    <div className='special-product-content'>
                        <h5 className='brand'>{brand}</h5>
                        <h5 className='title'>{title}</h5>
                        <ReactStars
                            count={5}
                            size={24}
                            value={totalrating}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p className='price'>
                            <span className='font-bold'>&#8377;{price}</span> &nbsp; 
                            <strike className='red-p'>&#8377;{price + 50}</strike>
                        </p>
                        <div className='discount-till d-flex align-items-center gap-10'>
                            <p className='mb-0'>
                                <b>5 </b> Days
                            </p>
                            <div className='d-flex gap-10 align-items-center'>
                                <span className='badge rounded-circle p-2 bg-warning'>1</span>
                                <span className='badge rounded-circle p-2 bg-warning'>1</span>
                                <span className='badge rounded-circle p-2 bg-warning'>1</span>
                            </div>
                        </div>
                        <div className='prod-count my-3'>
                            <p>Products:{quantity}</p>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{"width":"25%"}} aria-valuenow="25" aria-valuemin={quantity} aria-valuemax={sold + quantity}></div>
                            </div>
                        </div>
                        <Link className='button' to={'product/'+id}>View Product</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialProduct