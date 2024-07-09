import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container';
import { services, carousel } from '../utils/Data';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../features/blogs/blogSlice';
import moment from 'moment';
import { getAllProducts } from '../features/products/productSlice';
import { addToWishlist } from '../features/products/productSlice';
import ReactStars from "react-rating-stars-component";

function Home() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs();
    getProducts();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs());
  }

  const getProducts = () => {
    dispatch(getAllProducts());
  }

  const blogState = useSelector((state) => state.blog.blog);
  const productState = useSelector((state) => state?.product?.product);
  

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  }

  return (
    <>
      {/* Main Container */}
      <Container class1='home-wrapper-1 py-5'>
        <div className='row'>

          <div className='col-6'>
            <div className='main-banner position-relative'>
              <img src='images/main-banner-1.jpg' className='img-fluid rounded-3' alt='main-banner'></img>
              <div className='main-banner-content position-absolute'>
                <h4>SUPERCHARGED FOR PROS</h4>
                <h5>iPad S13+ Pro</h5>
                <p>From &999.00 or $41.62/no.</p>
                <Link className='button'>Buy Now</Link>
              </div>
            </div>
          </div>

          <div className='col-6'>
            <div className='d-flex flex-wrap gap-10 justify-content-between align-items-center'>

              <div className='small-banner position-relative'>
                <img src='images/catbanner-01.jpg' className='img-fluid rounded-3' alt='main-banner'></img>
                <div className='small-banner-content position-absolute'>
                  <h4>SUPERCHARGED FOR PROS</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>From &999.00 <br></br> or $41.62/no.</p>
                </div>
              </div>

              <div className='small-banner position-relative'>
                <img src='images/catbanner-02.jpg' className='img-fluid rounded-3' alt='main-banner'></img>
                <div className='small-banner-content position-absolute'>
                  <h4>New Arrival</h4>
                  <h5>Buy iPad Air</h5>
                  <p>From &999.00 <br></br> or $41.62/no.</p>
                </div>
              </div>

              <div className='small-banner position-relative'>
                <img src='images/catbanner-03.jpg' className='img-fluid rounded-3' alt='main-banner'></img>
                <div className='small-banner-content position-absolute'>
                  <h4>SUPERCHARGED FOR PROS</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>From &999.00 <br></br> or $41.62/no.</p>
                </div>
              </div>

              <div className='small-banner position-relative'>
                <img src='images/catbanner-04.jpg' className='img-fluid rounded-3' alt='main-banner'></img>
                <div className='small-banner-content position-absolute'>
                  <h4>SUPERCHARGED FOR PROS</h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>From &999.00 <br></br> or $41.62/no.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>

      {/* Carousel Container  */}
      <Container class1='home-wrapper-1 m-4'>
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={carousel[4].image} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5 className='text-dark fw-bold'>SmartPhones Available On EMI</h5>
                  <p className='text-dark'>Latest smartphones on EMI Affordable, easy payments, zero interest.</p>
                </div>
            </div>
            <div className="carousel-item">
              <img src={carousel[1].image} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5 className='text-dark fw-bold'>HomeMake Over Days</h5>
                  <p className='text-dark'>Transform your space with HomeMakeover Days stylish, affordable, innovative</p>
                </div>
            </div>
            <div className="carousel-item">
              <img src={carousel[2].image} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5 className='text-dark fw-bold'>Minimum 50% Off</h5>
                  <p className='text-dark'>Minimum 50% off on stylish, affordable items.</p>
                </div>
            </div>
            <div className="carousel-item">
              <img src={carousel[3].image} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5 className='text-dark fw-bold'>Under 499 Toys For All</h5>
                  <p className='text-dark'>Toys for all, affordable fun for everyone.</p>
                </div>
            </div>
            <div className="carousel-item">
              <img src={carousel[0].image} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5 className='text-dark fw-bold'>Headphones Under &#8377; 1499</h5>
                  <p className='text-dark'>High-quality headphones under 1499: immersive sound, affordable, stylish, durable.</p>
                </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </Container>

      {/* <section className='home-wrapper-1 py-5'>
        <div className='container-xxl'>

        </div>
      </section> */}

      {/* Services */}
      <section className='home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='services d-flex align-items-center justify-content-between'>
                {
                  services?.map((i, j) => {
                    return (
                      <div className='d-flex align-items-center gap-15' key={j}>
                        <img src={i.image} alt='services'></img>
                        <div >
                          <h6>{i.title}</h6>
                          <p className='mb-0'>{i.tagline}</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className='home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='categories d-flex flex-wrap justify-content-between align-items-center'>

                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Lehanga</h6>
                    <p>5 Items</p>
                  </div>
                  <img src='https://res.cloudinary.com/dj2sat3px/image/upload/v1718600621/oeylpvn6ldhqcwqextm3.webp' alt='camera' className='img-fluid product-image'></img>
                </div>

                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Smart Tv</h6>
                    <p>10 Items</p>
                  </div>
                  <img src='images/tv.jpg' alt='camera' className='mx-4'></img>
                </div>

                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Smart Watches</h6>
                    <p>10 Items</p>
                  </div>
                  <img src='https://res.cloudinary.com/dj2sat3px/image/upload/v1716808797/ocmf2esowmpcsq4m14t0.webp' alt='camera' className='img-fluid product-image'></img>
                </div>

                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 Items</p>
                  </div>
                  <img src='images/headphone.jpg' alt='camera'></img>
                </div>

                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Lehanga</h6>
                    <p>10 Items</p>
                  </div>
                  <img src='https://res.cloudinary.com/dj2sat3px/image/upload/v1716613499/hpkvidsoaybo5s31bes3.webp' alt='camera' className='img-fluid product-image'></img>
                </div>

                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Smart Tv</h6>
                    <p>10 Items</p>
                  </div>
                  <img src='https://res.cloudinary.com/dj2sat3px/image/upload/v1716809263/wiynojwjc49xncwe4gyj.webp' alt='camera' className='img-fluid product-image'></img>
                </div>

                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Smart Watches</h6>
                    <p>10 Items</p>
                  </div>
                  <img src='images/watch.jpg' alt='camera'></img>
                </div>

                <div className='d-flex gap-30 align-items-center'>
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 Items</p>
                  </div>
                  <img src='https://res.cloudinary.com/dj2sat3px/image/upload/v1718599333/i6wtmuonk6rceyw6dpid.webp' alt='camera' className='img-fluid product-image mx-4'></img>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Container */}
      <section className='marquee-wrapper py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='marquee-inner-wrapper card-wrapper'>
                <Marquee className='d-flex'>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-01.png' alt='brand'></img>
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-02.png' alt='brand'></img>
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-03.png' alt='brand'></img>
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-04.png' alt='brand'></img>
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-05.png' alt='brand'></img>
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-06.png' alt='brand'></img>
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-07.png' alt='brand'></img>
                  </div>
                  <div className='mx-4 w-25'>
                    <img src='images/brand-08.png' alt='brand'></img>
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className='featured-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Featured Products</h3>
            </div>
          </div>
          <div className='row'>
            {
              productState && productState?.filter(item => item?.tags === "featured")
                .slice(0, 8)
                .map((item, index) => {
                  return (
                    <div key={index} className={'col-3 mt-4'}>

                      <div /*to={`/${item.id}`}*/ className='product-card position-relative'>
                        <div className='wishlist-icon position-absolute'>
                          <button className='border-0 bg-transparent' onClick={(e) => { addToWish(item?._id) }}>
                            <img src='images/wish.svg' alt='Wishlist icon' ></img>
                          </button>
                        </div>
                        <div className='product-image'>
                          <img src={item?.images[0]?.url || 'images/watch.jpg'} alt='Product'></img>
                        </div>
                        <div className='product-details'>
                          <h6 className='brand'>{item?.brand}</h6>
                          <h5 className='product-title'>{item?.title.substr(0, 20) + '...'}</h5>
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.totalrating || 3}
                            edit={false}
                            activeColor="#ffd700"
                          />

                          <p className='price p-price text-bold'>&#8377; {item?.price}</p>
                        </div>
                        <div className='action-bar position-absolute'>
                          <div className='d-flex flex-column gap-15'>
                            <button className='border-0 bg-transparent'>
                              <img src='images/prodcompare.svg' alt='Compare'></img>
                            </button>
                            <button className='border-0 bg-transparent'>
                              <img src='images/view.svg' alt='View' onClick={() => navigate("product/" + item?._id)}></img>
                            </button>
                            <button className='border-0 bg-transparent'>
                              <img src='images/add-cart.svg' alt='Add to cart'></img>
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  )

                })
            }
          </div>
        </div>
      </section>


      {/* Special Products */}
      <section className='special-wrapper home-wrapper-2 py-5'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Special Products</h3>
            </div>
          </div>
          <div className='row'>
            <div className='d-flex align-items-center justify-content-center gap-10'>
              {
                productState && productState?.filter(item => item?.tags === "special")
                  .slice(0, 3)
                  .map((item, index) => {
                    return <SpecialProduct
                      key={index}
                      id={item?._id}
                      brand={item?.brand}
                      title={item?.title}
                      totalrating={item?.totalrating.toString()}
                      price={item?.price}
                      sold={item?.sold}
                      quantity={item?.quantity}
                      image={item?.images[0]?.url}
                    />
                  })
              }
            </div>
          </div>
        </div>
      </section>


      {/* Our Popular Products */}
      <section className='popular-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Our Popular Products</h3>
            </div>
          </div>
          <div className='row'>
            {
              productState && productState?.filter(item => item?.tags === "popular")
                .slice(0, 8)
                .map((item, index) => {
                  return (
                    <div key={index} className={'col-3 mt-4'}>
                      <div /*to={`/${item.id}`}*/ className='product-card position-relative'>
                        <div className='wishlist-icon position-absolute'>
                          <button className='border-0 bg-transparent' onClick={(e) => { addToWish(item?._id) }}>
                            <img src='images/wish.svg' alt='Wishlist icon' ></img>
                          </button>
                        </div>
                        <div className='product-image'>
                          <img src={item?.images[0]?.url || 'images/watch.jpg'} alt='Product'></img>
                        </div>
                        <div className='product-details'>
                          <h6 className='brand'>{item?.brand}</h6>
                          <h5 className='product-title'>{item?.title?.substr(0, 20) + '...'}</h5>
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.totalrating || 3}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          {/* <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                          dangerouslySetInnerHTML={{ __html: item?.description }}
                        >
                        </p> */}
                          <p className='price p-price'>&#8377; {item?.price}</p>
                        </div>
                        <div className='action-bar position-absolute'>
                          <div className='d-flex flex-column gap-15'>
                            <button className='border-0 bg-transparent'>
                              <img src='images/prodcompare.svg' alt='Compare'></img>
                            </button>
                            <button className='border-0 bg-transparent'>
                              <img src='images/view.svg' onClick={() => navigate("product/" + item?._id)} alt='View'></img>
                            </button>
                            <button className='border-0 bg-transparent'>
                              <img src='images/add-cart.svg' alt='Add to cart'></img>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )

                })
            }
          </div>
        </div>
      </section>

      {/* Our Latest Blogs */}
      <section className='blog-wrapper py-5 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h3 className='section-heading'>Our Latest Blogs</h3>
            </div>
            {
              Array.isArray(blogState) ? blogState?.map((item, index) => (
                <div className='col-3' key={index}>
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
      </section>
    </>
  )
}

export default Home