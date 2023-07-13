import {
    getDataGajiPegawai,
    getDataKehadiran,
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
        const { month } = req.params;
        const dataLaporanGajiByMonth = await getDataGajiPegawai(req, res);

        const filteredData = dataLaporanGajiByMonth.filter((data) => {
            return data.bulan.toLowerCase() === month.toLowerCase();
        });

        if (filteredData.length === 0) {
            res.status(404).json({ msg: 'Data tidak ditemukan' });
        } else {
            const formattedData = filteredData.map((data) => {
                return {
                    bulan: data.bulan,
                    nama_pegawai: data.nama_pegawai,
                    jabatan: data.jabatan_pegawai,
                    gaji_pokok: data.gaji_pokok,
                    tj_transport: data.tj_transport,
                    uang_makan: data.uang_makan,
                    potongan: data.potongan,
                    total_gaji: data.total
                };
            });
            res.json(formattedData);
        }
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
export const viewLaporanGajiPegawaiByName = async (req, res) => {
    try {
        const dataGajiPegawai = await getDataGajiPegawai(req, res);
        const name = req.params.name.toLowerCase();

        const foundData = dataGajiPegawai.filter((data) => {
          const formattedName = data.nama_pegawai.toLowerCase();
          const searchKeywords = name.split(" ");

          return searchKeywords.every((keyword) => formattedName.includes(keyword));
        });

        if (foundData.length === 0) {
          res.status(404).json({ msg: "Data not found" });
        } else {
          res.json(foundData);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
      }
  };

// method untuk melihat laporan absensi pegawai berdasarkan bulan (menggunakan DROP DOWN)
export const viewLaporanAbsensiPegawaiByMonth = async (req, res) => {
    try {
        const dataAbsensiByMonth = await getDataKehadiran();
        const { month } = req.params;

        const dataAbsensi = dataAbsensiByMonth.filter((absensi) => absensi.bulan.toLowerCase() === month.toLowerCase()).map((absensi) => {
            return {
                tahun: absensi.year,
                bulan: absensi.bulan,
                nik: absensi.nik,
                nama_pegawai: absensi.nama_pegawai,
                jabatan_pegawai: absensi.jabatan_pegawai,
                hadir: absensi.hadir,
                sakit: absensi.sakit,
                alpha: absensi.alpha
            };
        });

        if (dataAbsensi.length === 0) {
            res.status(404).json({ msg: 'Data tidak ditemukan' });
        } else {
            res.json(dataAbsensi);
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


// method untuk melihat laporan absensi pegawai berdasarkan tahun
export const viewLaporanAbsensiPegawaiByYear = async (req, res) => {
    try {
        const dataAbsensiByYear = await getDataKehadiran();
        const { year } = req.params;

        const dataAbsensi = dataAbsensiByYear.filter((absensi) => absensi.tahun.toString() === year.toString()).map((absensi) => {
            return {
                tahun: absensi.tahun,
                bulan: absensi.bulan,
                nik: absensi.nik,
                nama_pegawai: absensi.nama_pegawai,
                jabatan_pegawai: absensi.jabatan_pegawai,
                hadir: absensi.hadir,
                sakit: absensi.sakit,
                alpha: absensi.alpha
            };
        });

        if (dataAbsensi.length === 0) {
            res.status(404).json({ msg: 'Data tidak ditemukan' });
        } else {
            res.json(dataAbsensi);
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};



// method untuk melihat Slip Gaji Pegawai By Name
export const viewSlipGajiByName = async (req, res) => {
    try {
        const dataGajiPegawai = await getDataGajiPegawai(req, res);
        const name = req.params.name.toLowerCase();

        const foundData = dataGajiPegawai.filter((data) => {
          const formattedName = data.nama_pegawai.toLowerCase();
          const searchKeywords = name.split(" ");

          return searchKeywords.every((keyword) => formattedName.includes(keyword));
        });

        if (foundData.length === 0) {
          res.status(404).json({ msg: "Data not found" });
        } else {
          res.json(foundData);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
      }
}

// method untuk melihat Slip Gaji Pegawai By Month
export const viewSlipGajiByMonth = async (req, res) => {
    try {
        const { month } = req.params;
        const dataLaporanGajiByMonth = await getDataGajiPegawai(req, res);

        const filteredData = dataLaporanGajiByMonth.filter((data) => {
            return data.bulan.toLowerCase() === month.toLowerCase();
        });

        if (filteredData.length === 0) {
            res.status(404).json({ msg: `Data dengan bulan ${month} tidak ditemukan ` });
        } else {
            const formattedData = filteredData.map((data) => {
                return {
                    bulan: data.bulan,
                    tahun: data.tahun,
                    nama_pegawai: data.nama_pegawai,
                    jabatan: data.jabatan,
                    gaji_pokok: data.gaji_pokok,
                    tj_transport: data.tj_transport,
                    uang_makan: data.uang_makan,
                    potongan: data.potongan,
                    total_gaji: data.total
                };
            });
            res.json(formattedData);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// method untuk melihat Slip Gaji Pegawai By Year
export const viewSlipGajiByYear = async (req, res) => {
    try {
        await viewDataGajiPegawaiByYear(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}