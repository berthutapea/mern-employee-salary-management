import DataPegawai from './DataPegawaiModel.js';
import DataJabatan from './DataJabatanModel.js';
import DataKehadiran from './DataKehadiranModel.js';

/* Method untuk mengambil Data Pegawai */

async function getDataPegawai() {
    try {
        const dataPegawai = await DataPegawai.findAll();
        const dataPegawaiMap = new Map();
        dataPegawai.forEach(pegawai => {
            const {nik, nama_pegawai, jabatan} = pegawai;
            dataPegawaiMap.set(nama_pegawai, {nik, jabatan});
        });

        const resultDataPegawai = [];
        dataPegawaiMap.forEach(({nik, jabatan}, nama_pegawai) => {
            resultDataPegawai.push({nik, nama_pegawai, jabatan});
        });

        const data_nama_pegawai = resultDataPegawai.map(pegawai => pegawai.nama_pegawai);
        const data_nik = resultDataPegawai.map(pegawai => pegawai.nik);
        const data_jabatan = resultDataPegawai.map(pegawai => pegawai.jabatan);

        return { data_nama_pegawai, data_nik, data_jabatan };
    } catch (error) {
        console.log(error);
    }
}

/* Method untuk mengambil Data Kehadiran */

async function getDataKehadiran() {
    try {
    const dataKehadiran = await DataKehadiran.findAll();
    const dataKehadiranMap = new Map();

    const { data_nama_pegawai } = await getDataPegawai();
    const { data_nik } = await getDataPegawai();

    dataKehadiran.forEach(kehadiran => {
        const { nik, bulan, jenis_kelamin, nama_jabatan, hadir, sakit, alpha } = kehadiran;
        const nama_pegawai = data_nama_pegawai.find(nama => nama === kehadiran.nama_pegawai) || "-";
        const nik_pegawai = data_nik.find(nik => nik === kehadiran.nik) || "-";
        dataKehadiranMap.set(nik_pegawai, { nama_pegawai, bulan, jenis_kelamin, nama_jabatan, hadir, sakit, alpha });
    });

    const resultDataKehadiran = [];
    dataKehadiranMap.forEach(({ nik, bulan, jenis_kelamin, nama_jabatan, hadir, sakit, alpha }, nikPegawai) => {
        const nama_pegawai = data_nama_pegawai.find(nama => nama === dataKehadiranMap.get(nikPegawai).nama_pegawai) || "-";
        resultDataKehadiran.push({ nama_pegawai, nik, bulan, jenis_kelamin, nama_jabatan, hadir, sakit, alpha });
    });

    console.log(resultDataKehadiran);

    } catch (error) {
    console.log(error);
    }
}

getDataKehadiran();



/* Method untuk mengambil Data Pegawai */

async function getDataJabatan() {
    const dataJabatan = await DataJabatan.findAll();
    const datajabatanMap = new Map();
    try {
        dataJabatan.forEach(jabatan => {
            const {nama_jabatan, gaji_pokok, tj_transport, uang_makan} = jabatan;
            datajabatanMap.set(nama_jabatan, {gaji_pokok, tj_transport, uang_makan});
        });

        const resultDatajabatan = [];
        datajabatanMap.forEach(({gaji_pokok, tj_transport, uang_makan}, nama_jabatan) => {
            resultDatajabatan.push({nama_jabatan, gaji_pokok, tj_transport, uang_makan});
        });

        return resultDatajabatan;
    } catch (error) {
        console.log(error);
    }
}