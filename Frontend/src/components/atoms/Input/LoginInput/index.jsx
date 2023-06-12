import React, { useState, useEffect } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../../config/redux/action/authAction';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

function LoginInput() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const successMsg = useSelector((state) => state.auth.successMsg);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(username, password))
      .then(() => {
        Cookies.set('isLoggedIn', 'true', { expires: 7 });
        navigateAfterLogin();
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message,
        });
      });
  };

  const navigateAfterLogin = () => {
    if (user) {
      const role = user.hak_akses;
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'pegawai') {
        navigate('/pegawai/dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Role',
          text: 'Role is not valid',
        });
      }
    }
  };

  useEffect(() => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigateAfterLogin();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (successMsg) {
      Swal.fire({
        icon: 'success',
        title: 'Login Success',
        text: successMsg,
      });
    }
  }, [successMsg]);

  return (
    <form onSubmit={handleLogin}>
      <div className='mb-4'>
        <label className='mb-2.5 block font-medium text-black dark:text-white'>
          Username
        </label>
        <div className='relative'>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='off'
            required
            placeholder='Enter your username'
            className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
          />
          <FiUser className='absolute right-4 top-4 text-xl' />
        </div>
      </div>

      <div className='mb-6'>
        <label className='mb-2.5 block font-medium text-black dark:text-white'>
          Password
        </label>
        <div className='relative'>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Enter your password'
            className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
          />
          <FiLock className='absolute right-4 top-4 text-xl' />
        </div>
      </div>

      <div className='mb-5'>
        <input
          type='submit'
          value='Login'
          className='w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90'
        />
      </div>
    </form>
  );
}

export default LoginInput;
