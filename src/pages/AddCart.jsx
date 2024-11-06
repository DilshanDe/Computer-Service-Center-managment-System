import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import Footer from './Footer';

const navigation = [
  { name: 'Home', href: '/', current: false },
  
  { name: 'Contact Us', href: '/contactus', current: false },
  { name: 'About Us', href: '/aboutus', current: false }, 
  { name: 'Store', href: '/Storepage', current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const AddCart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialCart = location.state?.cart || [];
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Ensure every product in the cart has a quantity of at least 1
    const updatedCart = savedCart.map(product => ({
      ...product,
      quantity: product.quantity ? product.quantity : 1
    }));

    setCart(updatedCart);

    if (updatedCart.length === 0) {
      Swal.fire({
        title: 'Your cart is empty!',
        text: 'Please add items to your cart.',
        icon: 'warning',
        confirmButtonText: 'Shop Now'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/Storepage');
        }
      });
    }
  }, [navigate]);

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (index, change) => {
    const updatedCart = cart.map((product, i) => {
      if (i === index) {
        const newQuantity = product.quantity + change;
        return { ...product, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return product;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const handleCheckout = () => {
    const isLoggedIn = !!localStorage.getItem('user'); // Check if user is logged in

    if (isLoggedIn) {
      Swal.fire({
        title: 'Checkout successful!',
        text: 'Please Fill the Form.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/checkout', { state: { cart } });
        setCart([]);
        localStorage.removeItem('cart');
      });
    } else {
      Swal.fire({
        title: 'You need to log in!',
        text: 'Please log in to proceed with checkout.',
        icon: 'warning',
        confirmButtonText: 'Login'
      }).then(() => {
        navigate('/login');
      });
    }
  };

  const goToCartPage = () => {
    navigate('/cart', { state: { cart } });
  };

  const total = cart.reduce((sum, product) => {
    const price = parseFloat(product.price) || 0;
    const quantity = parseInt(product.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  const discount = 0; // 10% discount
  const discountedTotal = total - total * discount;

  return (
    <div className="relative flex flex-col min-h-screen">
      
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
                          src="https://i.postimg.cc/s1zW5CcB/download-7.jpg"
                          className="h-8 w-8 rounded-full"
                        />
                      </Menu.Button>
                    </div>
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => navigate('/login')}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign-In
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => navigate('/login')}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign-Out
                          </button>
                        )}
                      </Menu.Item>
                      
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
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

      <div className='flex-grow'>
        <h2 className="text-center text-2xl font-bold my-8">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-center text-xl">Your cart is empty</p>
        ) : (
          <div className="container mx-auto mt-5 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg p-4 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white table-auto">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">PRODUCT NAME</th>
                      <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">PRICE</th>
                      <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">QUANTITY</th>
                      <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">TOTAL</th>
                      <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">REMOVE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">
                          <div className="flex items-center">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="ml-3">
                              <h6 className="text-sm font-medium text-gray-900">{product.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-4 text-sm text-gray-700">RS. {parseFloat(product.price).toFixed(2)}</td>
                        <td className="py-2 px-4">
                          <div className="flex items-center">
                            <button 
                              className="px-2 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                              onClick={() => updateQuantity(index, -1)}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="mx-2 w-12 text-center border rounded-md focus:outline-none"
                              value={product.quantity}
                              readOnly
                            />
                            <button 
                              className="px-2 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                              onClick={() => updateQuantity(index, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-2 px-4 text-sm text-gray-700">RS. {(parseFloat(product.price) * product.quantity).toFixed(2)}</td>
                        <td className="py-2 px-4">
                          <button 
                            className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
                            onClick={() => removeFromCart(index)}
                          >
                            REMOVE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
              <h5 className="text-lg font-bold text-gray-900">
                TOTAL PRICE {/*(After 10% Discount)*/}: RS. {discountedTotal.toFixed(2)}
              </h5>
              <button 
                className="mt-4 sm:mt-0 px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none"
                onClick={handleCheckout}
              >
                CHECK OUT
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AddCart;
