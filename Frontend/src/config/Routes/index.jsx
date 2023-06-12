import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../components/molecules/NotFound'
import FormDataPegawai from '../../components/molecules/Form/FormDataPegawai'
import FormDataJabatan from '../../components/molecules/Form/FormDataJabatan'
import FormSettingPotonganGaji from '../../components/molecules/Form/FormSettingPotonganGaji'
import { PrivateRouteAdmin, PrivateRoutePegawai } from '../../components';
import Login from '../../pages/Login';
import {
  DashboardAdmin,
  DataPegawai,
  DataJabatan,
  DataAbsensi,
  SettingPotonganGaji,
  DataGaji,
  LaporanGaji,
  LaporanAbsensi,
  SlipGaji,
  UbahPasswordAdmin,
  DashboardPegawai,
  DataGajiPegawai,
  UbahPasswordPegawai
} from '../../pages'

const AppRoutes = () => {

  return (
    <Routes>
      {/* Route Admin */}
      <Route path='/login' element={<Login />} />
      {/* <Route path='/admin/dashboard' element={<DashboardAdmin />} /> */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRouteAdmin>
            <DashboardAdmin />
          </PrivateRouteAdmin>} />
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
      <Route path='/admin/pengaturan/ubah-password' element={<UbahPasswordAdmin />} />

      {/* Route Pegawai */}
      {/* Login Pegawai */}
      <Route
        path='/pegawai/dashboard'
        element={
          <PrivateRoutePegawai>
            <DashboardPegawai />
          </PrivateRoutePegawai>} />
      {/* Dashboard Data Gaji Pegawai */}
      <Route exact path='/pegawai/data-gaji' element={<DataGajiPegawai />} />
      <Route exact path='/pegawai/pengaturan/ubah-password' element={<UbahPasswordPegawai />} />
      {/* Route Not Found/404 */}
      <Route exact path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes;
