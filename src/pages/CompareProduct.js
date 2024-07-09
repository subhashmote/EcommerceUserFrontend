import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'

function CompareProduct() {
    return (
        <>
            <Meta title={'CompareProducts'} />
            <BreadCrumb title='Compareproducts' />
            <div className='compare-product-wrapper py-5 home-wrapper-2'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-3'>
                            <div className='compare-product-card position-relative'>
                                <img className='position-absolute cross img-fluid' src='images/cross.svg' alt='cross'></img>
                                <div className='product-card-image'>
                                    <img src='images/watch.jpg' alt='watch'></img>
                                </div>
                                <div className='compare-product-details'>
                                    <h5 className='title'>fastrack</h5>
                                    <h6 className='price mb-3 mt-3'>$100.00</h6>
                                    <div>
                                        <div className='product-detail'>
                                            <h5>Brand:</h5>
                                            <p>Fastrack</p>
                                        </div>
                                        <div className='product-detail'>
                                            <h5>Type:</h5>
                                            <p>Watch</p>
                                        </div>
                                        <div className='product-detail'>
                                            <h5>Availability:</h5>
                                            <p>In Stock</p>
                                        </div>
                                        <div className='product-detail'>
                                            <h5>color:</h5>
                                            <p>Fastrack</p>
                                        </div>
                                        <div className='product-detail'>
                                            <h5>Size:</h5>
                                            <div className='d-flex gap-10'>
                                                <p>S</p>
                                                <p>M</p>
                                            </div>
                                        </div>
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

export default CompareProduct