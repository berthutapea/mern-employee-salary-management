import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { logoutUser } from '../../../../config/redux/action';
import { reset } from '../../../../config/redux/reducer/authReducer';
import axios from "axios";

const DropdownProfil = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [dataPegawai, setDataPegawai] = useState(null);

  const onLogout = () => {
    Swal.fire({
      title: 'Konfirmasi',
      text: 'Apakah Anda yakin ingin keluar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutUser());
        dispatch(reset());
        Swal.fire({
          title: 'Logout Berhasil',
          text: 'Anda telah berhasil keluar.',
          icon: 'success',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          navigate('/login');
        });
      }
    });
  };

  useEffect(() => {
    const getDataPegawai = async () => {
      try {
        if (user && user.nama_pegawai) {
          const response = await axios.get(
            `http://localhost:5000/data_pegawai/name/${user.nama_pegawai}`
          );
          const data = response.data;
          setDataPegawai(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDataPegawai();
  }, [user]);

  useEffect(() => {
    const clickHandler = (event) => {
      if (!dropdownOpen) return;
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target) &&
        trigger.current &&
        !trigger.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };

    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  return (
    <div className='relative'>
      {dataPegawai && (
        <Link
          ref={trigger}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className='flex items-center gap-4'
          to='#'
        >
          <span className='hidden lg:block'>
            <span className='block text-sm font-medium text-black dark:text-white'>
              {dataPegawai.nama_pegawai}
            </span>
            <span className='block text-xs'>{dataPegawai.hak_akses}</span>
          </span>

          <div className='h-12 w-12 rounded-full overflow-hidden'>
            <img
              className='h-full w-full object-cover'
              src={`http://localhost:5000/images/${dataPegawai.photo}`}
              alt='Profil'
            />
          </div>
          <MdKeyboardArrowDown className='text-xl' />
        </Link>
      )}

      {dropdownOpen && (
        <div
          ref={dropdown}
          className='absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'
        >
          <ul className='flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark'>
            <li>
              <Link
                to={user?.hak_akses === 'admin' ? '/ubah-password' : '/ubah-password-pegawai'}
                className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'
              >
                <FiSettings className='text-xl' />
                Pengaturan
              </Link>
            </li>
            <li>
              <button
                onClick={onLogout}
                className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'
              >
                <BiLogOut className='text-xl' />
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownProfil;
