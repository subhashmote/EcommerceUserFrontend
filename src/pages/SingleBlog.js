import React, { useEffect } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { Link, useLocation } from 'react-router-dom'
import { FaLongArrowAltLeft } from "react-icons/fa";
import blog from '../images/blog-1.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { getAblog } from '../features/blogs/blogSlice';



function SingleBlog() {
    const dispatch = useDispatch();
    const location = useLocation();

    const blogId = location.pathname.split("/")[2];
    

    const blogState = useSelector((state)=>state?.blog?.singleBlog);

    useEffect(()=>{
        getBlog();
    },[]);

    const getBlog = () => {
        dispatch(getAblog(blogId));
    }


   
    return (
        <>
            <Meta title={blogState?.title} />
            <BreadCrumb title={blogState?.title}  />
            <div className='blog-wrapper home-wrapper-2 py-5'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='single-blog-card'>
                                <h3 className='title'>{blogState?.title} </h3>
                                <img src={blogState?.images[0]?.url ? blogState?.images[0]?.url : blog} className='img-fluid w-80 my-4' alt='blog'></img>
                                <p dangerouslySetInnerHTML={{ __html: blogState?.description }}></p>
                                <Link to={'/blogs'} className='d-flex align-items-center justify-content-start gap-15'>
                                    <FaLongArrowAltLeft fontSize={24} /> Back To Blogs
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleBlog