import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import SidebarLinkGroup from '../SidebarLinkGroup'
import LogoSipeka from '../../../../assets/images/logo/logo-sipeka.png'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { RxDashboard } from 'react-icons/rx'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { logoutUser } from '../../../../config/redux/action'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { reset } from '../../../../config/redux/reducer/authReducer'

const SidebarPegawai = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trigger = useRef(null)
  const sidebar = useRef(null)

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  )

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
        dispatch(reset())
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

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded)
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded')
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded')
    }
  }, [sidebarExpanded])

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className='flex items-center justify-center px-6 py-5.5 lg:py-6.5 object-cover'>
        <NavLink to='/dashboard'>
          <img
            src={LogoSipeka}
            alt='Logo SiPeKa'
            className='w-50'
            title='Logo SiPeKa'
          />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls='sidebar'
          aria-expanded={sidebarOpen}
          className='block lg:hidden'
        >
          <AiOutlineArrowLeft className="text-xl" />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
        <nav className='mt-4 px-4 lg:mt-9 lg:px-6'>
          <div>

            <ul className='mb-6 flex flex-col gap-1.5'>
              {/* <!--Dashboard Pegawai--> */}
              <NavLink
                to='/dashboard'
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('dashboard') &&
                  'bg-graydark dark:bg-meta-4'
                  }`}
              >
                <RxDashboard />
                Dashboard
              </NavLink>
              {/* <!-- Dashboard Pegawai --> */}

              {/* <!-- Data Gaji Pegawai--> */}
              <li>
                <NavLink
                  to='/data-gaji-pegawai'
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('datagaji') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <FaRegMoneyBillAlt />
                  Data Gaji
                </NavLink>
              </li>
              {/* <!-- Data Gaji Pegawai --> */}

              {/* <!-- Pengaturan Pegawai --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/pengaturan' || pathname.includes('pengaturan')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to='#'
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/pengaturan' ||
                          pathname.includes('pengaturan')) &&
                          'bg-graydark dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault()
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}
                      >
                        <FiSettings />
                        Pengaturan
                        <MdKeyboardArrowDown className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current text-2xl ${open && 'rotate-180'
                          }`} />
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className='mt-4 mb-5.5 flex flex-col gap-2.5 pl-6'>
                          <li>
                            <NavLink
                              to='/ubah-password-pegawai'
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Ubah Password
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              onClick={onLogout}
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Log Out
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>
              {/* <!-- Pengaturan Pegawai --> */}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default SidebarPegawai;
