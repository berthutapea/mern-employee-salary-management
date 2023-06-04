import {
    getDataGajiPegawai,
    getDataKehadiran,
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

// method untuk melihat laporan absensi pegawai berdasarkan bulan (menggunakan DROP DOWN)
export const viewLaporanAbsensiPegawaiByMonth = async (req, res) => {
    try {
        const dataAbsensiByMonth = await getDataKehadiran();
        const { month } = req.params;

        const dataAbsensi = dataAbsensiByMonth.filter((absensi) => absensi.bulan.toLowerCase() === month.toLowerCase()).map((absensi) => {
            return {
                    tahun : absensi.year,
                    bulan : absensi.bulan,
                    nik : absensi.nik,
                    nama_pegawai : absensi.nama_pegawai,
                    jabatan_pegawai : absensi.jabatan_pegawai,
                    hadir : absensi.hadir,
                    sakit : absensi.sakit,
                    alpha : absensi.alpha
            }
        })
        res.json(dataAbsensi)
    } catch (error) {
        res.status(500).json({msg: 'Internal Server Error'});
    }
};

// method untuk melihat laporan absensi pegawai berdasarkan tahun
export const viewLaporanAbsensiPegawaiByYear = async (req, res) => {
    try {
        const dataAbsensiByYear = await getDataKehadiran();
        const { year } = req.params;

        const dataAbsensi = dataAbsensiByYear.filter((absensi) => absensi.year.toString() === year.toString()).map((absensi) => {
            return {
                    tahun : absensi.year,
                    bulan : absensi.bulan,
                    nik : absensi.nik,
                    nama_pegawai : absensi.nama_pegawai,
                    jabatan_pegawai : absensi.jabatan_pegawai,
                    hadir : absensi.hadir,
                    sakit : absensi.sakit,
                    alpha : absensi.alpha
            }
        })
        res.json(dataAbsensi)
    } catch (error) {
        res.status(500).json({msg: 'Internal Server Error'});
    }
};