import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginAdmin from './pages/Admin/LoginAdmin/LoginAdmin'
import LoginPegawai from './pages/Pegawai/LoginPegawai/LoginPegawai'
import DashboardAdmin from './pages/Admin/DashboardAdmin/DashboardAdmin'
import Calendar from './pages/Calender/Calendar'
import DataPegawai from './pages/Admin/MasterData/DataPegawai/DataPegawai'
import FormDataPegawai from './pages/Admin/Form/FormDataPegawai'
import DataJabatan from './pages/Admin/MasterData/DataJabatan/DataJabatan'
import FormDataJabatan from './pages/Admin/Form/FormDataJabatan'
import DataAbsensi from './pages/Admin/Transaksi/DataAbsensi/DataAbsensi'
import SettingPotonganGaji from './pages/Admin/Transaksi/SettingPotonganGaji/SettingPotonganGaji'
import DataGaji from './pages/Admin/Transaksi/DataGaji/DataGaji'
// 
import Profile from './pages/Profile'
import FormElements from './pages/Admin/Form/FormElements'
import Tables from './pages/Tables'
import Settings from './pages/Settings'
import Alerts from './pages/UiElements/Alerts'
import Buttons from './pages/UiElements/Buttons'

const App = () => {
  const [loading, setLoading] = useState(true)

  const preloader = document.getElementById('preloader')

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none'
      setLoading(false)
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    !loading && (
      <>
        <Routes>
          <Route exact path='/admin/login' element={<LoginAdmin />} />
          <Route exact path='/pegawai/login' element={<LoginPegawai />} />
          <Route exact path='/' element={<LoginAdmin />} />
          <Route exact path='/admin/dashboard' element={<DashboardAdmin />} />
          <Route path='/admin/calendar' element={<Calendar />} />
          <Route path='/admin/master-data/data-pegawai' element={<DataPegawai />} />
          <Route path='/admin/master-data/data-pegawai/form-data-pegawai' element={<FormDataPegawai />} />
          <Route path='/admin/master-data/data-jabatan' element={<DataJabatan />} />
          <Route path='/admin/master-data/data-jabatan/form-data-jabatan' element={<FormDataJabatan />} />
          <Route path='/admin/transaksi/data-absensi' element={<DataAbsensi />} />
          <Route path='/admin/transaksi/setting-potongan-gaji' element={<SettingPotonganGaji />} />
          <Route path='/admin/transaksi/data-gaji' element={<DataGaji />} />
          {/*  */}
          <Route path='/profile' element={<Profile />} />
          <Route path='/forms/form-elements' element={<FormElements />} />
          <Route path='/tables' element={<Tables />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/ui/alerts' element={<Alerts />} />
          <Route path='/ui/buttons' element={<Buttons />} />
        </Routes>
      </>
    )
  )
}

export default App
