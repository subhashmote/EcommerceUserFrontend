import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from 'react-image-zoom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiGitCompare } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { addRating, addToWishlist, getAProduct } from '../features/products/productSlice';
import { addProdToCart, getAcart } from '../features/users/userSlice';
import { toast } from 'react-toastify';

function SingleProduct() {

    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const [alreadyAdded, setalreadyAdded] = useState(false);
    const navigate = useNavigate();

    const productList = location.pathname.split("/");
    let productId;
    if (productList.length === 4) {
        productId = location.pathname.split("/")[3];
    } else {
        productId = location.pathname.split("/")[2];
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAProduct(productId));
        dispatch(getAcart());
    }, [dispatch, productId]);

    const productState = useSelector((state) => state?.product?.singleproduct);

   


    const uploadCart = () => {
        dispatch(addProdToCart({ productId: productState?._id, quantity, price: productState?.price }));
        // navigate("/cart");
    }

    const cartState = useSelector((state) => state?.auth?.cartProducts);

    useEffect(() => {
        if (Array.isArray(cartState)) {
            for (let index = 0; index < cartState?.length; index++) {
                if (productId === cartState[index]?.productId?._id) {
                    setalreadyAdded(true);
                }
            }
        }
    }, [cartState, productId]);

    const props = {
        width: 400,
        height: 500,
        zoomWidth: 550,
        img: Array.isArray(productState?.images) && productState?.images[0]?.url ? productState?.images[0]?.url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ8z6COdqAuSOZDxwftc8Lp0gw-bHdMrkHgwvN4H9YLQ&s",
    };

    const [orderedProduct, setorderedProduct] = useState(true);

    const addwishlist = (id) => {
        dispatch(addToWishlist(id));
    }



    const [star, setStar] = useState(null);
    const [comment, setComment] = useState(null);

    const addRatingToProduct = () => {
        if (star === null) {
            toast.error("Please Enter Star Ratings!")
            return false;
        } else if (comment === null) {
            toast.error("Plase Enter the Comment!")
            return false;
        }
        else {
            dispatch(addRating({ star: star, comment: comment, prodId: productId }))
        }
    }


    let starRating = productState?.totalrating;
    
    return (
        <>
            <Meta title={'Product Name'} />
            <BreadCrumb title={productState?.title} />
            <div className='main-product-wrapper py-5 home-wrapper-2'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-6'>
                            <div className='main-product-image'>
                                <div>
                                    <ReactImageZoom {...props} />
                                </div>
                            </div>
                            <div className='other-product-images d-flex flex-wrap gap-15'>
                                {
                                    Array.isArray(productState?.images) && productState.images.map((item, index) => (
                                        <div key={index}>
                                            <img src={item?.url} className='img-fluid'></img>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='main-product-details'>
                                <div className='border-bottom'>
                                    <h3 className='title'>{productState?.title}</h3>
                                </div>
                                <div className='border-bottom py-3'>
                                    <p className='price'>&#8377; {productState?.price}</p>
                                    <div className='d-flex gap-10 align-items-center'>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={starRating}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <p className='mb-0 t-review'>(2 Reviews)</p>
                                    </div>
                                    <a href='#review' className='review-btn'>Write a Review</a>
                                </div>
                                <div className='border-bottom py-3'>
                                    <div className='d-flex align-items-center gap-10 my-2'>
                                        <h2 className='product-heading'>Type:</h2>
                                        <p className='product-data'>{productState?.category}</p>
                                    </div>
                                    <div className='d-flex align-items-center gap-10 my-2'>
                                        <h2 className='product-heading'>Brand:</h2>
                                        <p className='product-data'>{productState?.brand}</p>
                                    </div>
                                    <div className='d-flex align-items-center gap-10 my-2'>
                                        <h2 className='product-heading'>Categories:</h2>
                                        <p className='product-data'>{productState?.category}</p>
                                    </div>
                                    <div className='d-flex align-items-center gap-10 my-2'>
                                        <h2 className='product-heading'>Tags:</h2>
                                        <p className='product-data'>{productState?.tags}</p>
                                    </div>
                                    <div className='d-flex align-items-center gap-10 my-2'>
                                        <h2 className='product-heading'>Availability:</h2>
                                        <p className='product-data'>In Stock</p>
                                    </div>
                                    <div className='d-flex flex-column gap-10 mt-2 mb-3'>
                                        <h2 className='product-heading'>Size:</h2>
                                        <div className='d-flex flex-wrap gap-15'>
                                            <span className='badge text-dark border border-1 border-secondary'>S</span>
                                            <span className='badge text-dark border border-1 border-secondary'>M</span>
                                            <span className='badge text-dark border border-1 border-secondary'>XL</span>
                                            <span className='badge text-dark border border-1 border-secondary'>XXL</span>
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center flex-row gap-15 mt-2 mb-3'>
                                        {
                                            !alreadyAdded && <>
                                                <h2 className='product-heading'>Quantity:</h2>
                                                <div>
                                                    <input
                                                        type='number'
                                                        name='quantity'
                                                        id='quantity'
                                                        min={1}
                                                        max={10}
                                                        style={{ width: "80px" }}
                                                        className='form-control'
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                    />
                                                </div>
                                            </>
                                        }
                                        <div className='d-flex align-items-center gap-30'>
                                            <button className='button border-0 mx-2' onClick={() => {
                                                alreadyAdded ? navigate("/cart") : uploadCart(productState?._id)
                                            }}>
                                                {
                                                    alreadyAdded ? "Go To Cart" : "Add To Cart"
                                                }
                                            </button>
                                            <button className='button signup border-0'>Buy It Now</button>
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center gap-15'>
                                        <div>
                                            <a href='#'>
                                                <BiGitCompare className='fs-5 me-2' /> Compare Products</a>
                                        </div>
                                        <div>
                                            <a href='#'  onClick={()=>addwishlist(productState?._id)}>
                                                <CiHeart className='fs-5 me-2'/> Add To Wishlist</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className='description-wrapper py-5 home-wrapper-2'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='p-3 bg-white'>
                                <h4>Description</h4>
                                <p dangerouslySetInnerHTML={{ __html: productState?.description }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section id='review' className='reviews-wrapper py-5 home-wrapper-2'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='review-inner-wrapper'>
                                <div className='review-head d-flex justify-content-between align-items-end mb-4'>
                                    <div>
                                        <h4 className='mb-2'>Customer Reviews</h4>
                                        <div className='d-flex gap-10 align-items-center justify-content-center'>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={'3'}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                            <p className='mb-0'>Based on 2 reviews</p>
                                        </div>
                                    </div>
                                    {
                                        orderedProduct && (
                                            <div>
                                                <a className='text-dark text-decoration-underline' href='#'>write a review</a>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='review-form'>
                                    <div>
                                        <h4 className='mb-2'>Write a Review</h4>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={'3'}
                                            edit={true}
                                            activeColor="#ffd700"
                                            onChange={(e) => {
                                                setStar(e);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            cols='30'
                                            className='w-100 form-control'
                                            rows='4'
                                            placeholder='Comments'
                                            onChange={(e) => {
                                                setComment(e.target.value);
                                            }} />
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='button border-0 mt-3' type='button' onClick={addRatingToProduct}>Submit Review</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleProduct;
