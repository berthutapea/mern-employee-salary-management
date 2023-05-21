-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2023 at 04:14 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_penggajian3`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_jabatan`
--

CREATE TABLE `data_jabatan` (
  `id` int(11) NOT NULL,
  `id_jabatan` varchar(255) NOT NULL,
  `nama_jabatan` varchar(120) NOT NULL,
  `gaji_pokok` int(50) NOT NULL,
  `tj_transport` int(50) NOT NULL,
  `uang_makan` int(50) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `dataPegawaiId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_jabatan`
--

INSERT INTO `data_jabatan` (`id`, `id_jabatan`, `nama_jabatan`, `gaji_pokok`, `tj_transport`, `uang_makan`, `userId`, `createdAt`, `updatedAt`, `dataPegawaiId`) VALUES
(1, '090d8d1f-9031-41da-8e05-ff951a63cc4b', 'HRD', 6000, 4000, 3000, 1, '2023-05-21 13:55:40', '2023-05-21 13:55:40', NULL),
(2, '7aa1955a-d50e-4dff-9fe5-0fc5accf338f', 'Operator Produksi', 3000, 2000, 1000, 1, '2023-05-21 13:58:26', '2023-05-21 13:58:26', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `data_kehadiran`
--

CREATE TABLE `data_kehadiran` (
  `id` int(11) NOT NULL,
  `bulan` varchar(15) NOT NULL,
  `nik` varchar(16) NOT NULL,
  `nama_pegawai` varchar(100) NOT NULL,
  `jenis_kelamin` varchar(20) DEFAULT NULL,
  `nama_jabatan` varchar(50) DEFAULT NULL,
  `hadir` int(11) DEFAULT NULL,
  `sakit` int(11) DEFAULT NULL,
  `alpha` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_kehadiran`
--

INSERT INTO `data_kehadiran` (`id`, `bulan`, `nik`, `nama_pegawai`, `jenis_kelamin`, `nama_jabatan`, `hadir`, `sakit`, `alpha`, `createdAt`, `updatedAt`) VALUES
(1, 'April', '223344', 'Aldi', 'Laki-Laki', 'HRD', 2, 0, 1, '2023-05-21 13:56:47', '2023-05-21 13:56:47'),
(2, 'April', '3344556', 'Budi', 'Laki-Laki', 'Operator Produksi', 2, 1, 1, '2023-05-21 14:06:00', '2023-05-21 14:06:00');

-- --------------------------------------------------------

--
-- Table structure for table `data_pegawai`
--

CREATE TABLE `data_pegawai` (
  `id` int(11) NOT NULL,
  `id_pegawai` varchar(255) NOT NULL,
  `nik` varchar(16) NOT NULL,
  `nama_pegawai` varchar(100) NOT NULL,
  `username` varchar(120) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `jenis_kelamin` varchar(15) NOT NULL,
  `jabatan` varchar(50) NOT NULL,
  `tanggal_masuk` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `hak_akses` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_pegawai`
--

INSERT INTO `data_pegawai` (`id`, `id_pegawai`, `nik`, `nama_pegawai`, `username`, `password`, `jenis_kelamin`, `jabatan`, `tanggal_masuk`, `status`, `photo`, `url`, `hak_akses`, `createdAt`, `updatedAt`) VALUES
(1, 'fa2b8473-ddcd-4c5a-b985-391a6dc87920', '223344', 'Aldi', 'aldi', '$argon2id$v=19$m=65536,t=3,p=4$N9YlzB9yQo1n5rHsZUSkIA$afLOo5e7vkn1gPfpF3fCr9Skjv5cVD+KKAHvWwHbBBI', 'Laki-Laki', 'HRD', '01-02-23', 'karyawan tetap', '87e74cc6606ab4802b48d59acbbcff71.jpg', 'http://localhost:5000/images/87e74cc6606ab4802b48d59acbbcff71.jpg', 'admin', '2023-05-21 13:08:09', '2023-05-21 13:08:09'),
(2, 'f6001a36-d9a2-437f-b0e7-103f817c1c61', '334455', 'Budi', 'budi', '$argon2id$v=19$m=65536,t=3,p=4$1ScBJEZZgvxMIbYNRxhZDg$OAtL4BB+hufFV6MsYDKkb1TJ2BfABK74kweZrntw/dQ', 'Laki-Laki', 'Operator Produksi', '01-02-23', 'karyawan tetap', '87e74cc6606ab4802b48d59acbbcff71.jpg', 'http://localhost:5000/images/87e74cc6606ab4802b48d59acbbcff71.jpg', 'pegawai', '2023-05-21 14:04:35', '2023-05-21 14:04:35');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('0MLPCBnaz9ZGp2x_0-8wXkJbgbSigZKt', '2023-05-22 14:13:30', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"fa2b8473-ddcd-4c5a-b985-391a6dc87920\"}', '2023-05-21 13:03:24', '2023-05-21 14:13:30'),
('DoMQVih9vBWp7XmzMmSEl1WgyIYO6Uqn', '2023-05-22 14:04:37', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-05-21 13:08:09', '2023-05-21 14:04:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_jabatan`
--
ALTER TABLE `data_jabatan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `dataPegawaiId` (`dataPegawaiId`);

--
-- Indexes for table `data_kehadiran`
--
ALTER TABLE `data_kehadiran`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_pegawai`
--
ALTER TABLE `data_pegawai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_jabatan`
--
ALTER TABLE `data_jabatan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `data_kehadiran`
--
ALTER TABLE `data_kehadiran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `data_pegawai`
--
ALTER TABLE `data_pegawai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `data_jabatan`
--
ALTER TABLE `data_jabatan`
  ADD CONSTRAINT `data_jabatan_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `data_pegawai` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `data_jabatan_ibfk_2` FOREIGN KEY (`dataPegawaiId`) REFERENCES `data_pegawai` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
