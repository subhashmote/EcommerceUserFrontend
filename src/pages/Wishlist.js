import React, { useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { getUserWishlist } from '../features/users/userSlice';
import { addToWishlist } from '../features/products/productSlice';

function Wishlist() {
    const dispatch = useDispatch();

    useEffect(() => {
        getWishlistFromDb();
    }, [dispatch]);

    const getWishlistFromDb = () => {
        dispatch(getUserWishlist());
    };

    const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);
    // console.log(wishlistState);

    const removeFromWishlist = (id) => {
        dispatch(addToWishlist(id));
        setTimeout(() => {
            dispatch(getUserWishlist());
        }, 300);
    };

    return (
        <>
            <Meta title={'Wishlist'} />
            <BreadCrumb title='Wishlist' />
            <div className='wishlist-wrapper home-wrapper-2 py-5'>
                <div className='container-xxl'>
                    <div className='row'>
                        {
                            (!Array.isArray(wishlistState) || wishlistState.length === 0) ? (
                                <div className='text-center fs-3'>No Data Found</div>
                            ) : (
                                wishlistState.map((item, index) => (
                                    <div className='col-3' key={index}>
                                        <div className='wishlist-card position-relative'>
                                            <img
                                                onClick={() => { removeFromWishlist(item?._id) }}
                                                className='position-absolute cross img-fluid' src='images/cross.svg' alt='cross' />
                                            <div className='wishlist-card-image'>
                                                <img src={item?.images[0]?.url} className='w-100' alt='watch' />
                                            </div>
                                            <div className='px-2 py-3'>
                                                <h5 className='title'>{item?.title}</h5>
                                                <h6 className='price'>&#8377; {item?.price}</h6>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wishlist;
