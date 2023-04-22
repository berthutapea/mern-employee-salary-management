import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
// Import Admin

//  Import login Admin
import LoginAdmin from './pages/Admin/LoginAdmin/LoginAdmin'
//  Import Dashboard Admin
import DashboardAdmin from './pages/Admin/DashboardAdmin/DashboardAdmin'
//  Import Master Data Admin
import DataPegawai from './pages/Admin/MasterData/DataPegawai/DataPegawai'
import FormDataPegawai from './pages/Admin/Form/FormDataPegawai/FormDataPegawai'
import DataJabatan from './pages/Admin/MasterData/DataJabatan/DataJabatan'
import FormDataJabatan from './pages/Admin/Form/FormDataJabatan/FormDataJabatan'
//  Import Transaksi Admin
import DataAbsensi from './pages/Admin/Transaksi/DataAbsensi/DataAbsensi'
import SettingPotonganGaji from './pages/Admin/Transaksi/SettingPotonganGaji/SettingPotonganGaji'
import FormSettingPotonganGaji from './pages/Admin/Form/FormSettingPotonganGaji/FormSettingPotonganGaji'
import DataGaji from './pages/Admin/Transaksi/DataGaji/DataGaji'
//  Import laporan Admin
import LaporanGaji from './pages/Admin/Laporan/LaporanGaji/LaporanGaji'
import LaporanAbsensi from './pages/Admin/Laporan/LaporanAbsensi/LaporanAbsensi'
import SlipGaji from './pages/Admin/Laporan/SlipGaji/SlipGaji'
//  Import Pengaturan Admin
import UbahPassword from './pages/Admin/Pengaturan/UbahPassword/UbahPassword'

// Import Pegawai
import LoginPegawai from './pages/Pegawai/LoginPegawai/LoginPegawai'
//  Import Dashboard Pegawai
import DashboardPegawai from './pages/Pegawai/DashboardPegawai/DashboardPegawai'
//  Import Data Gaji Pegawai Pegawai
import DataGajiPegawai from './pages/Pegawai/DataGajiPegawai/DataGajiPegawai'

// 
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
          {/* Route Admin */}
          {/* Login Admin */}
          <Route exact path='/admin/login' element={<LoginAdmin />} />
          <Route exact path='/' element={<LoginAdmin />} />
          {/* Dashboard Admin */}
          <Route exact path='/admin/dashboard' element={<DashboardAdmin />} />
          {/* Master Data Admin */}
          <Route path='/admin/master-data/data-pegawai' element={<DataPegawai />} />
          <Route path='/admin/master-data/data-pegawai/form-data-pegawai' element={<FormDataPegawai />} />
          <Route path='/admin/master-data/data-jabatan' element={<DataJabatan />} />
          <Route path='/admin/master-data/data-jabatan/form-data-jabatan' element={<FormDataJabatan />} />
          {/* Transaksi Admin */}
          <Route path='/admin/transaksi/data-absensi' element={<DataAbsensi />} />
          <Route path='/admin/transaksi/setting-potongan-gaji' element={<SettingPotonganGaji />} />
          <Route path='/admin/transaksi/setting-potongan-gaji/form-setting-potongan-gaji' element={<FormSettingPotonganGaji />} />
          <Route path='/admin/transaksi/data-gaji' element={<DataGaji />} />
          {/* Laporan Admin */}
          <Route path='/admin/laporan/laporan-gaji' element={<LaporanGaji />} />
          <Route path='/admin/laporan/laporan-absensi' element={<LaporanAbsensi />} />
          <Route path='/admin/laporan/slip-gaji' element={<SlipGaji />} />
          {/* Pengaturan Admin */}
          <Route path='/admin/pengaturan/ubah-password' element={<UbahPassword />} />

          {/* Route Pegawai */}
          {/* Login Pegawai */}
          <Route exact path='/pegawai/login' element={<LoginPegawai />} />
          {/* Dashboard Pegawai */}
          <Route exact path='/pegawai/dashboard' element={<DashboardPegawai />} />
          {/* Dashboard Data Gaji Pegawai */}
          <Route exact path='/pegawai/data-gaji' element={<DataGajiPegawai />} />


          {/*  */}
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
