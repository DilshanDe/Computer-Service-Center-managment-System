import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import ProductCard from './ProductCard';
import Footer from './Footer';

import axios from 'axios';
import Swal from 'sweetalert2';

const navigation = [
  { name: 'Home', href: '/', current: false },

  { name: 'Contact Us', href: '/contactus', current: false },
  { name: 'About Us', href: '/aboutus', current: false },
  { name: 'Store', href: '/storepage', current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const StorePage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null); // Initialize user state
  const productsPerPage = 18;
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);

    // Load user information from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');

    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have been successfully logged out.',
      confirmButtonText: 'OK',
    }).then(() => {
      window.location.href = '/';
      window.location.reload();
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      const isProductInCart = cart.find((cartItem) => cartItem.name === product.name);

      if (isProductInCart) {
        Swal.fire({
          title: 'Product already in the cart!',
          text: `${product.name} is already in your cart.`,
          icon: 'info',
          confirmButtonText: 'OK',
        });
      } else {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        Swal.fire({
          title: 'Added to Cart!',
          text: `${product.name} has been added to your cart.`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    } else {
      Swal.fire({
        title: 'Not Logged In',
        text: 'Please log in to add items to your cart.',
        icon: 'warning',
        confirmButtonText: 'Login',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    }
  };

  const goToCartPage = () => {
    navigate('/cart', { state: { cart } });
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div>
      {/* First Navigation Bar */}
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0">
                    <a href="/">
                      <img
                        alt="BEEZ"
                        src="https://i.postimg.cc/Rq0FjC98/Whats-App-Image-2024-08-10-at-23-56-32-084c5e4a-removebg-preview.png"
                        className="h-8 w-auto"
                      />
                    </a>
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={goToCartPage}
                  >
                    <span className="sr-only">View cart</span>
                    <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {cart.length}
                    </span>
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt="User Profile"
                          src={user?.profilePicture || 'https://i.postimg.cc/s1zW5CcB/download-7.jpg'}
                          className="h-8 w-8 rounded-full"
                        />
                      </Menu.Button>
                    </div>
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {user ? (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <div className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                <p><b>{user.name}</b></p>
                              </div>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => navigate('/profile')}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Profile
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleSignOut}
                                className={classNames(active ? 'bg-gray-100' : '', 'block w-full px-4 py-2 text-left text-sm text-gray-700')}
                              >
                                Log out
                              </button>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleSignIn}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Log in
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Second Navigation Bar */}
      <nav className="bg-gray-800 p-4 w-full">
        <div className="container mx-auto flex justify-between items-center flex-wrap">
          <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
            <form className="flex w-full">
              <input
                className="form-input w-full px-2 py-1 border border-gray-300 rounded"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="bg-white text-gray-600 px-3 py-1 rounded ml-2"
                type="submit"
              >
                <b>Search</b>
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span className="text-white">Total: RS {totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </nav>

      {/* Products Section */}
      <div className="container mx-auto mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {currentProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} addToCart={addToCart} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`px-3 py-1 border ${index + 1 === currentPage ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'}`}

              >
                <button
                  className="focus:outline-none"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Footer />
    </div>
  );
};

export default StorePage;
