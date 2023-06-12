import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PegawaiPhoto from '../../../../assets/images/user/gilbert.png';
import { BiLogOut } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../config/redux/action';
import Swal from 'sweetalert2';

const DropdownPegawai = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const trigger = useRef(null);
    const dispatch = useDispatch();
    const dropdown = useRef(null);
    const navigate = useNavigate();

    const onLogout = () => {
        Swal.fire({
            title: 'Logout',
            text: 'Apakah Anda yakin ingin logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Logout',
            cancelButtonText: 'Batal',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logoutUser())
                    .then(() => {
                        Swal.fire({
                            title: 'Logout Succes',
                            icon: 'success',
                            text: 'Logout Berhasil',
                            timer: 1000,
                            showConfirmButton: false,
                        }).then(() => {
                            navigate('/login');
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: 'Logout Gagal',
                            text: 'Terjadi kesalahan saat logout.',
                            icon: 'error',
                        });
                        console.log(error);
                    });
            }
        });
    };

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [dropdownOpen]);

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    }, [dropdownOpen]);

    useEffect(() => {
        const logoutCleanup = () => {
            setDropdownOpen(false);
        };

        return logoutCleanup;
    }, []);

    return (
        <div className='relative'>
            <Link
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className='flex items-center gap-4'
                to='#'
            >
                <span className='hidden text-right lg:block'>
                    <span className='block text-sm font-medium text-black dark:text-white'>
                        Gilbert Hutapea
                    </span>
                    <span className='block text-xs'>Pegawai</span>
                </span>

                <span className='h-12 w-12'>
                    <img className='rounded-full' src={PegawaiPhoto} alt='Pegawai' />
                </span>

                <MdKeyboardArrowDown className='text-xl' />
            </Link>

            {/* <!-- Dropdown Start --> */}
            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? 'block' : 'hidden'
                    }`}
            >
                <ul className='flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark'>
                    <li>
                        <Link
                            to='/pegawai/pengaturan/ubah-password'
                            className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'
                        >
                            <FiSettings className='text-xl' />
                            Pengaturan
                        </Link>
                    </li>
                    <li>
                        <button
                            className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'
                            onClick={onLogout}
                        >
                            <BiLogOut className='text-xl' />
                            Log Out
                        </button>
                    </li>
                </ul>
            </div>
            {/* <!-- Dropdown End --> */}
        </div>
    );
};

export default DropdownPegawai;