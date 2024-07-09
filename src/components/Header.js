import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import wishlist from '../images/wishlist.svg'
import user from '../images/user.svg'
import cart from '../images/cart.svg'
import menu from '../images/menu.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';


function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState(null);
  const [paginate, setPaginate] = useState(true);
  const [productOpt, setProductOpt] = useState([]);


  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const productState = useSelector((state) => state?.product?.product);
  const authState = useSelector((state) => state?.auth);

  

  useEffect(() => {
    const getCart = async () => {
      let sum = 0;
      for (let index = 0; index < cartState?.length; index++) {
        sum = sum + Number(cartState[index]?.quantity) * Number(cartState[index]?.price);
        setTotalAmount(sum);
      }
    }

    getCart();
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);



  const logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <>
      <header className='header-top-strip py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-6'>
              <p className='text-white mb-0'>Free Shopping Over &#8377;1000 & Free Returns</p>
            </div>
            <div className='col-6'>
              <p className='text-end text-white mb-0'>Hotline: <a className='text-white' href='tel:+91 9834946009'>+91 9834946009</a></p>
            </div>
          </div>
        </div>
      </header>
      <header className='header-upper py-3'>
        <div className='container-xxl'>
          <div className='row align-items-center'>
            <div className='col-2'>
              <h2>
                <Link className='text-white'>Dev Ecom</Link>
              </h2>
            </div>
            <div className='col-5'>
              <div className="input-group">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log('Results paginated')}
                  onChange={(selected) => {
                    navigate(`product/${selected[0]?.prod}`)
                  }}
                  options={productOpt}
                  paginate={paginate}
                  labelKey={"name"}
                  minLength={2}
                  placeholder="Search For Products..."
                />
                <span className="input-group-text p-2" id="basic-addon2"><BsSearch className='fs-6' /></span>
              </div>
            </div>
            <div className='col-5'>
              <div className='header-upper-links d-flex align-items-center justify-content-between'>
                <div>
                  {/* <Link to={'/compare-product'} className='d-flex align-items-center gap-10 text-white'>
                    <img src={compare} alt='compare'></img>
                    <p className='mb-0'>Compare <br></br> Products</p>
                  </Link> */}
                </div>
                <div>
                  <Link to={'/wishlist'} className='d-flex align-items-center gap-10 text-white'>
                    <img src={wishlist} alt='wishlist'></img>
                    <p className='mb-0'>Favourite <br></br>  Wishlist</p>
                  </Link>
                </div>
                <div>
                  <Link to={authState?.user === null ? '/login' : "/my-profile"} className='d-flex align-items-center gap-10 text-white'>
                    <img src={user} alt='user'></img>
                    {
                      authState?.user === null ? <p className='mb-0'>Login <br></br>  My Account</p> :
                        <p className='mb-0'>Welcome <br></br>{authState?.user?.firstname}</p>
                    }
                  </Link>
                </div>
                <div>
                  <Link to={'/cart'} className='d-flex align-items-center gap-10 text-white position-relative'>
                    <img src={cart} alt='cart'></img>
                    <div className='cart-div d-flex justify-content-center align-items-center'>{cartState?.length ? cartState?.length : 0}</div>
                    <div className='d-flex flex-column gap-10'>
                      {/* <span className='badge bg-white text-dark'>{cartState?.length ? cartState?.length : 0}</span> */}
                      <p className='mb-0'>&#8377; {totalAmount ? totalAmount : 0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className='header-bottom py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='menu-bottom d-flex align-items-center gap-30'>
                <div className='menu-links'>
                  <div className='d-flex align-items-center gap-15'>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/store'}>Our Store</NavLink>
                    <NavLink to={'/blogs'}>Blogs</NavLink>
                    <NavLink to={'/my-orders'}>My Orders</NavLink>
                    <NavLink to={'/contact'}>Contact</NavLink>
                    <button onClick={logoutHandler} className='button border-0 bg-transparent text-uppercase text-white'>Logout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header