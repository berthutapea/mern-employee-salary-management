import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../components/molecules/NotFound'
import FormSettingPotonganGaji from '../../components/molecules/Form/FormSettingPotonganGaji'
import {
  FormAddDataJabatan,
  FormEditDataJabatan,
  FormAddDataKehadiran,
  FormEditDataKehadiran,
  FormAddDataPegawai,
  FormEditDataPegawai
} from '../../components';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import {
  DataPegawai,
  DataJabatan,
  DataKehadiran,
  SettingPotonganGaji,
  DataGaji,
  LaporanGaji,
  LaporanAbsensi,
  SlipGaji,
  UbahPasswordAdmin,
  DataGajiPegawai,
  UbahPasswordPegawai
} from '../../pages'
import About from '../../pages/About';
import Contact from '../../pages/Contact';

const AppRoutes = () => {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/tentang' element={<About />} />
      <Route path='/kontak' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      {/* Route Admin */}

      {/* Master Data Admin */}
      <Route path='/data-pegawai' element={<DataPegawai />} />
      <Route path='/data-pegawai/form-data-pegawai/add' element={<FormAddDataPegawai />} />
      <Route path='/data-pegawai/form-data-pegawai/edit/:id' element={<FormEditDataPegawai />} />
      <Route path='/data-jabatan' element={<DataJabatan />} />
      <Route path='/data-jabatan/form-data-jabatan/add' element={<FormAddDataJabatan />} />
      <Route path='/data-jabatan/form-data-jabatan/edit/:id' element={<FormEditDataJabatan />} />

      {/* Transaksi Admin */}
      <Route path='/data-kehadiran' element={<DataKehadiran />} />
      <Route path='/data-kehadiran/form-data-kehadiran/add' element={<FormAddDataKehadiran />} />
      <Route path='/data-kehadiran/form-data-kehadiranedit/:id' element={<FormEditDataKehadiran />} />
      <Route path='/transaksi/setting-potongan-gaji' element={<SettingPotonganGaji />} />
      <Route path='/transaksi/setting-potongan-gaji/form-setting-potongan-gaji' element={<FormSettingPotonganGaji />} />
      <Route path='/transaksi/data-gaji' element={<DataGaji />} />

      {/* Laporan Admin */}
      <Route path='/laporan/laporan-gaji' element={<LaporanGaji />} />
      <Route path='/laporan/laporan-absensi' element={<LaporanAbsensi />} />
      <Route path='/laporan/slip-gaji' element={<SlipGaji />} />

      {/* Pengaturan Admin */}
      <Route path='/pengaturan/ubah-password' element={<UbahPasswordAdmin />} />

      {/* Route Pegawai */}
      {/* Dashboard Data Gaji Pegawai */}
      <Route exact path='/data-gaji' element={<DataGajiPegawai />} />
      <Route exact path='/pengaturan/ubah-password' element={<UbahPasswordPegawai />} />

      {/* Route Not Found/404 */}
      <Route exact path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes;
