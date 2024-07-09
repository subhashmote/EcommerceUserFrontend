import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { addToWishlist } from '../features/products/productSlice';
import { FcLike } from "react-icons/fc";

function ProductCard(props) {
  const { grid, data = [] } = props;
  let location = useLocation();
  const dispatch = useDispatch();

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  if (!Array.isArray(data)) {
    console.error("Expected data to be an array, but got:", typeof data);
    return null; 
  }

  return (
    <>
      {data.map((item, index) => (
        <div key={index} className={`${location.pathname === '/store' ? `gr-${grid}` : 'col-3'}`}>
          <div className='product-card position-relative'>
            <div className='wishlist-icon position-absolute'>
              <button
                className='border-0 bg-transparent'
                onClick={(e) => {
                  e.preventDefault();
                  addToWish(item?._id);
                }}
              >
                 <img src='images/wish.svg' alt='Wishlist icon' />
              </button>
            </div>
            <Link to={`/${item.id}`} className='product-card-inner'>
              <div className='product-image'>
                <img src={item?.images[0]?.url || 'images/watch.jpg'} alt='Product' />
              </div>
              <div className='product-details'>
                <h6 className='brand mt-2 font-bold'>{item?.brand}</h6>
                <h5 className='product-title'>{item?.title?.substr(0, 20) + " ..."}</h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={item?.totalrating.toString() || 3}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                >
                </p>
                <p className='price p-price'>&#8377; {item?.price}</p>
              </div>
              <div className='action-bar position-absolute'>
                <div className='d-flex flex-column gap-15'>
                  <button className='border-0 bg-transparent'>
                    <img src='images/prodcompare.svg' alt='Compare' />
                  </button>
                  <Link to={'product/' + item?._id}>
                    <img src='images/view.svg' alt='View' />
                  </Link>
                  <button className='border-0 bg-transparent'>
                    <img src='images/add-cart.svg' alt='Add to cart' />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductCard;
