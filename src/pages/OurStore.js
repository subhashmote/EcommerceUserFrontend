import React, { useEffect, useState, useCallback } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ReactStars from "react-rating-stars-component";
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/products/productSlice';
import debounce from 'lodash.debounce';

function OurStore() {
    const [grid, setGrid] = useState(4);
    const dispatch = useDispatch();
    const productState = useSelector((state) => state.product.product);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [randomNumber1, setRandomNumber1] = useState(null);
    const [randomNumber2, setRandomNumber2] = useState(null);

    useEffect(() => {
        setRandomNumber1(Math.floor(Math.random() * productState.length));
        setRandomNumber2(Math.floor(Math.random() * productState.length));
    }, [productState]);

    


    // Filter States
    const [category, setCategory] = useState(null);
    const [tag, setTag] = useState(null);
    const [brand, setBrand] = useState(null);
    const [minprice, setMinprice] = useState(null);
    const [maxprice, setMaxprice] = useState(null);
    const [sort, setSort] = useState(null);

    // Debounced getProducts function
    const debouncedGetProducts = useCallback(
        debounce(() => {
            dispatch(getAllProducts({ sort, category, brand, tag, minprice, maxprice }));
        }, 300),
        [sort, category, brand, tag, minprice, maxprice, dispatch]
    );

    useEffect(() => {
        debouncedGetProducts();
        return () => {
            debouncedGetProducts.cancel();
        };
    }, [sort, category, brand, tag, minprice, maxprice, debouncedGetProducts]);

    useEffect(() => {
        let newBrands = [];
        let newCategories = [];
        let newTags = [];
        for (let index = 0; index < productState?.length; index++) {
            const element = productState[index];
            newBrands.push(element?.brand);
            newCategories.push(element?.category);
            newTags.push(element?.tags);
        }
        setBrands([...new Set(newBrands)]);
        setCategories([...new Set(newCategories)]);
        setTags([...new Set(newTags)]);
    }, [productState]);

    return (
        <>
            <Meta title={'Our Store'} />
            <BreadCrumb title='Our Store' />
            <div className='store-wrapper home-wrapper-2 py-5'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-3'>
                            <div className='filter-card mb-3'>
                                <h3 className='filter-title'>Shop By Categories</h3>
                                <div>
                                    <ul className='ps-0'>
                                        {categories.map((item, index) => (
                                            <li key={index} onClick={() => setCategory(item)}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className='filter-card mb-3'>
                                <h3 className='filter-title'>Filter By</h3>
                                <div>
                                    <h5 className='sub-title'>Price</h5>
                                    <div className='d-flex align-items-center gap-10'>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="floatingInput"
                                                placeholder="From"
                                                onChange={(e) => setMinprice(e.target.value)}
                                            />
                                            <label htmlFor="floatingInput">From</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="floatingInput"
                                                placeholder="To"
                                                onChange={(e) => setMaxprice(e.target.value)}
                                            />
                                            <label htmlFor="floatingInput">To</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='filter-card mb-3'>
                                <h3 className='filter-title'>Product Tags</h3>
                                <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                                    {tags.map((item, index) => (
                                        <span
                                            key={index}
                                            onClick={() => setTag(item)}
                                            className='badge bg-light text-secondary px-3 py-2 rounded-3 text-capitalize'
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className='filter-card mb-3'>
                                <h3 className='filter-title'>Product Brands</h3>
                                <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                                    {brands.map((item, index) => (
                                        <span
                                            key={index}
                                            onClick={() => setBrand(item)}
                                            className='badge bg-light text-secondary px-3 py-2 rounded-3 text-uppercase'
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className='filter-card mb-3'>
                                <h3 className='filter-title'>Random Product</h3>
                                <div>
                                    <div className='random-products d-flex mt-4'>
                                        <div className='w-50 p-2'>
                                            <img src={productState[randomNumber1]?.images[0]?.url} className='img-fluid' alt='Headphones'></img>
                                        </div>
                                        <div className='w-50 p-2'>
                                            <h6>{productState[randomNumber1]?.title.substr(0,15)+"..."}</h6>
                                            <b className='text-success'>&#8377;
                                                {
                                                    productState[randomNumber1]?.price
                                                }
                                            </b>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={productState[randomNumber1]?.totalrating || 4}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                    </div>
                                    <div className='random-products d-flex mt-4'>
                                        <div className='w-50 p-2'>
                                            <img src={productState[randomNumber2]?.images[0]?.url} className='img-fluid' alt='Accessories'></img>
                                        </div>
                                        <div className='w-50 p-2'>
                                            <h6>{productState[randomNumber2]?.title.substr(0,15)+"..."}</h6>
                                            <b className='text-success'>&#8377;
                                                {productState[randomNumber2]?.price}
                                            </b>
                                            <ReactStars
                                                count={5}
                                                size={24}
                                                value={productState[randomNumber2]?.totalrating || 3}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-9'>
                            <div className='filter-sort-grid mb-4'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className='d-flex align-items-center gap-10'>
                                        <p className='mb-0 d-block' style={{ width: "100px" }}>Sort By:</p>
                                        <select
                                            className='form-control form-select'
                                            onChange={(e) => setSort(e.target.value)}
                                        >
                                            <option value='title'>Alphabetically, A-Z</option>
                                            <option value='-title'>Alphabetically, Z-A</option>
                                            <option value='price'>Price, low to high</option>
                                            <option value='-price'>Price, high to low</option>
                                            <option value='created'>Date, old to new</option>
                                            <option value='-created'>Date, new to old</option>
                                        </select>
                                    </div>
                                    <div className='d-flex align-items-center gap-10'>
                                        <p className='totalproducts mb-0'>21 Products</p>
                                        <div className='d-flex align-items-center gap-10 grid'>
                                            <img
                                                onClick={() => setGrid(3)}
                                                src='images/gr4.svg' className='img-fluid d-block' alt='grid'></img>
                                            <img
                                                onClick={() => setGrid(4)}
                                                src='images/gr3.svg' className='img-fluid d-block' alt='grid'></img>
                                            <img
                                                onClick={() => setGrid(6)}
                                                src='images/gr2.svg' className='img-fluid d-block' alt='grid'></img>
                                            <img
                                                onClick={() => setGrid(12)}
                                                src='images/gr.svg' className='img-fluid d-block' alt='grid'></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='products-list pb-5'>
                                <div className='d-flex flex-wrap gap-10'>
                                    <ProductCard data={productState} grid={grid} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OurStore;
