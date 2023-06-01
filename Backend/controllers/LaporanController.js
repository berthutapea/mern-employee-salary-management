import {
    getDataGajiPegawai,
    viewDataGajiPegawaiByMonth,
    viewDataGajiPegawaiByName,
    viewDataGajiPegawaiByYear
} from "./TransaksiController.js"

// method untuk melihat laporan gaji pegawai
export const viewLaporanGajiPegawai = async(req, res) => {
    try {
        const laporanGajiPegawai = await getDataGajiPegawai(req, res);
        res.status(200).json(laporanGajiPegawai);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// method untuk melihat laporan gaji pegawai berdasarkan bulan
export const viewLaporanGajiPegawaiByMonth = async (req, res) => {
    try {
        const laporanGajiPegawaiByMonth = await viewDataGajiPegawaiByMonth(req, res);
        res.status(200).json(laporanGajiPegawaiByMonth);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// method untuk melihat laporan gaji pegawai berdasarkan tahun
export const viewLaporanGajiPegawaiByYear = async (req, res) => {
    try {
        await viewDataGajiPegawaiByYear(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// method untuk melihat laporan gaji pegawai berdasarkan nama
export const viewLaporanGajiPegawaiByName = async(req, res) => {
    try {
        const laporanGajiPegawaiByName = await viewDataGajiPegawaiByName(req, res);
        res.status(200).json(laporanGajiPegawaiByName);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// method untuk melihat laporan gaji pegawai berdasarkan jabatan
export const viewLaporanGajiPegawaiByJabatan = async() => {

}