import React, { useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import BlogCard from '../components/BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blogs/blogSlice';
import moment from 'moment';

function Blog() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBlogs());
    }, [dispatch]);

    const blogState = useSelector((state) => state?.blog?.blog);

    return (
        <>
            <Meta title={'Blogs'} />
            <BreadCrumb title='Blogs' />
            <div className='blog-wrapper home-wrapper-2 py-5'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-3'>
                            <div className='filter-card mb-3'>
                                <h3 className='filter-title'>
                                    Find By Categories
                                </h3>
                                <div className=''>
                                    <ul className='ps-0'>
                                        <li>Watch</li>
                                        <li>TV</li>
                                        <li>Laptop</li>
                                        <li>Camera</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-9'>
                            <div className='row'>
                                {
                                    Array.isArray(blogState) ? blogState.map((item, index) => (
                                        <div className='col-6 ' key={index}>
                                            <BlogCard 
                                                id={item?._id}
                                                title={item?.title}
                                                description={item?.description}
                                                date={moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                                image={item?.images[0]?.url}
                                            />
                                        </div>
                                    )) : <p>No blogs available.</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Blog;
