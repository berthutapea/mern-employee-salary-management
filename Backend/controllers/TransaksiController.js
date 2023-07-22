import DataKehadiran from "../models/DataKehadiranModel.js";
import DataPegawai from "../models/DataPegawaiModel.js";
import DataJabatan from "../models/DataJabatanModel.js";
import PotonganGaji from "../models/PotonganGajiModel.js";
import moment from "moment";
import "moment/locale/id.js";

// method untuk menampilkan semua Data Kehadiran
export const viewDataKehadiran = async (req, res) => {
  let resultDataKehadiran = [];
  try {
    // Get data kehadiran
    const data_Kehadiran = await DataKehadiran.findAll({
      attributes: [
        "id",
        "bulan",
        "nik",
        "nama_pegawai",
        "jenis_kelamin",
        "nama_jabatan",
        "hadir",
        "sakit",
        "alpha",
        "createdAt",
      ],
      distinct: true,
    });

    resultDataKehadiran = data_Kehadiran.map((kehadiran) => {
      const id = kehadiran.id;
      const createdAt = new Date(kehadiran.createdAt);
      const tahun = createdAt.getFullYear();
      const bulan = kehadiran.bulan;
      const nik = kehadiran.nik;
      const nama_pegawai = kehadiran.nama_pegawai;
      const jabatan_pegawai = kehadiran.nama_jabatan;
      const jenis_kelamin = kehadiran.jenis_kelamin;
      const hadir = kehadiran.hadir;
      const sakit = kehadiran.sakit;
      const alpha = kehadiran.alpha;

      return {
        id,
        bulan,
        tahun,
        nik,
        nama_pegawai,
        jabatan_pegawai,
        jenis_kelamin,
        hadir,
        sakit,
        alpha,
      };
    });
    res.json(resultDataKehadiran);
  } catch (error) {
    console.log(error);
  }
};

// method untuk menampilkan Data Kehadiran by ID
export const viewDataKehadiranByID = async (req, res) => {
  try {
    const dataKehadiran = await DataKehadiran.findOne({
      attributes: [
        "id",
        "bulan",
        "nik",
        "nama_pegawai",
        "jenis_kelamin",
        "nama_jabatan",
        "hadir",
        "sakit",
        "alpha",
        "createdAt",
      ],
      where: {
        id: req.params.id,
      }
    });
    res.json(dataKehadiran);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// method untuk menambah data kehadiran
export const createDataKehadiran = async (req, res) => {
  const {
    nik,
    nama_pegawai,
    nama_jabatan,
    jenis_kelamin,
    hadir,
    sakit,
    alpha,
  } = req.body;

  try {
    const data_nama_pegawai = await DataPegawai.findOne({
      where: {
        nama_pegawai: nama_pegawai,
      },
    });

    const data_nama_jabatan = await DataJabatan.findOne({
      where: {
        nama_jabatan: nama_jabatan,
      },
    });

    const data_nik_pegawai = await DataPegawai.findOne({
      where: {
        nik: nik,
      },
    });

    const nama_sudah_ada = await DataKehadiran.findOne({
      where: {
        nama_pegawai: nama_pegawai,
      },
    });

    if (!data_nama_pegawai) {
      return res.status(404).json({ msg: "Data nama pegawai tidak ditemukan" });
    }

    if (!data_nama_jabatan) {
      return res.status(404).json({ msg: "Data nama jabatan tidak ditemukan" });
    }

    if (!data_nik_pegawai) {
      return res.status(404).json({ msg: "Data nik tidak ditemukan" });
    }

    if (!nama_sudah_ada) {
      const month = moment().locale("id").format("MMMM");
      await DataKehadiran.create({
        bulan: month.toLowerCase(),
        nik: nik,
        nama_pegawai: data_nama_pegawai.nama_pegawai,
        jenis_kelamin: jenis_kelamin,
        nama_jabatan: data_nama_jabatan.nama_jabatan,
        hadir: hadir,
        sakit: sakit,
        alpha: alpha,
      });
      res.json({ msg: "Tambah Data Kehadiran Berhasil" });
    } else {
      res.status(400).json({ msg: "Data nama sudah ada" });
    }
  } catch (error) {
    console.log(error);
  }
};

// method untuk update data kehadiran
export const updateDataKehadiran = async (req, res) => {
  try {
    await DataKehadiran.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Data kehadiran berhasil diupdate" });
  } catch (error) {
    console.log(error.msg);
  }
};

// method untuk delete data kehadiran
export const deleteDataKehadiran = async (req, res) => {
  try {
    await DataKehadiran.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Delete data berhasil" });
  } catch (error) {
    console.log(error.msg);
  }
};

// method untuk create data potongan gaji
export const createDataPotonganGaji = async (req, res) => {
  const { id, potongan, jml_potongan } = req.body;
  try {
    const nama_potongan = await PotonganGaji.findOne({
      where: {
        potongan: potongan,
      },
    });
    if (nama_potongan) {
      res.status(400).json({ msg: "Data potongan sudah ada !" });
    } else {
      await PotonganGaji.create({
        id: id,
        potongan: potongan,
        jml_potongan: jml_potongan.toLocaleString(),
      });
      res.json({ msg: "Tambah Data Potongan Gaji Berhasil" });
    }
  } catch (error) {
    console.log(error);
  }
};

// method untuk menampilkan semua Data Potongan
export const viewDataPotongan = async (req, res) => {
  try {
    const dataPotongan = await PotonganGaji.findAll({
      attributes: ["id", "potongan", "jml_potongan"],
    });
    res.json(dataPotongan);
  } catch (error) {
    console.log(error);
  }
};

// method untuk menampilkan Data Potongan By ID
export const viewDataPotonganByID = async (req, res) => {
  try {
    const dataPotongan = await PotonganGaji.findOne({
      attributes: ["id", "potongan", "jml_potongan"],
      where: {
        id: req.params.id,
      },
    });
    res.json(dataPotongan);
  } catch (error) {
    console.log(error);
  }
};

// method untuk update Data Potongan
export const updateDataPotongan = async (req, res) => {
  try {
    await PotonganGaji.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Data Potongan berhasil diupdate" });
  } catch (error) {
    console.log(error.message);
  }
};

// method untuk delete data potongan
export const deleteDataPotongan = async (req, res) => {
  try {
    await PotonganGaji.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Delete data berhasil" });
  } catch (error) {
    console.log(error.message);
  }
};

// method untuk mengambil data gaji pegawai (data pegawai + data jabatan + data kehadiran + data potongan)

// method untuk mengambil data pegawai :
export const getDataPegawai = async () => {
  let resultDataPegawai = [];

  try {
    // Get data pegawai:
    const data_pegawai = await DataPegawai.findAll({
      attributes: ["id", "nik", "nama_pegawai", "jenis_kelamin", "jabatan"],
      distinct: true,
    });

    resultDataPegawai = data_pegawai.map((pegawai) => {
      const id = pegawai.id;
      const nik = pegawai.nik;
      const nama_pegawai = pegawai.nama_pegawai;
      const jenis_kelamin = pegawai.jenis_kelamin;
      const jabatan_pegawai = pegawai.jabatan;

      return { id, nik, nama_pegawai, jenis_kelamin, jabatan_pegawai };
    });
  } catch (error) {
    console.error(error);
  }

  return resultDataPegawai;
};

// method untuk mengambil data jabatan :
export const getDataJabatan = async () => {
  let resultDataJabatan = [];
  try {
    // get data jabatan :
    const data_jabatan = await DataJabatan.findAll({
      attributes: ["nama_jabatan", "gaji_pokok", "tj_transport", "uang_makan"],
      distinct: true,
    });

    resultDataJabatan = data_jabatan.map((jabatan) => {
      const nama_jabatan = jabatan.nama_jabatan;
      const gaji_pokok = jabatan.gaji_pokok;
      const tj_transport = jabatan.tj_transport;
      const uang_makan = jabatan.uang_makan;

      return { nama_jabatan, gaji_pokok, tj_transport, uang_makan };
    });
  } catch (error) {
    console.error(error);
  }
  return resultDataJabatan;
};

// method untuk mengambil data kehadiran :
export const getDataKehadiran = async () => {
  try {
    // Get data kehadiran
    const data_Kehadiran = await DataKehadiran.findAll({
      attributes: [
        "bulan",
        "nik",
        "nama_pegawai",
        "jenis_kelamin",
        "nama_jabatan",
        "hadir",
        "sakit",
        "alpha",
        "createdAt",
      ],
      distinct: true,
    });

    const resultDataKehadiran = data_Kehadiran.map((kehadiran) => {
      const createdAt = new Date(kehadiran.createdAt);
      const tahun = createdAt.getFullYear();
      const bulan = kehadiran.bulan;
      const nik = kehadiran.nik;
      const nama_pegawai = kehadiran.nama_pegawai;
      const jabatan_pegawai = kehadiran.nama_jabatan;
      const hadir = kehadiran.hadir;
      const sakit = kehadiran.sakit;
      const alpha = kehadiran.alpha;

      return {
        bulan,
        tahun,
        nik,
        nama_pegawai,
        jabatan_pegawai,
        hadir,
        sakit,
        alpha,
      };
    });
    return resultDataKehadiran;
  } catch (error) {
    console.error(error);
  }
};

export const getDataPotongan = async () => {
  let resultDataPotongan = [];
  try {
    // get data potongan :
    const data_potongan = await PotonganGaji.findAll({
      attributes: ["id", "potongan", "jml_potongan"],
      distinct: true,
    });
    resultDataPotongan = data_potongan.map((potongan) => {
      const id = potongan.id;
      const nama_potongan = potongan.potongan;
      const jml_potongan = potongan.jml_potongan;

      return { id, nama_potongan, jml_potongan };
    });
  } catch (error) {
    console.error(error);
  }
  return resultDataPotongan;
};

// Logika matematika
export const getDataGajiPegawai = async () => {
  try {
    // Gaji Pegawai :
    const resultDataPegawai = await getDataPegawai();
    const resultDataJabatan = await getDataJabatan();

    const gaji_pegawai = resultDataPegawai
      .filter((pegawai) =>
        resultDataJabatan.some(
          (jabatan) => jabatan.nama_jabatan === pegawai.jabatan_pegawai
        )
      )
      .map((pegawai) => {
        const jabatan = resultDataJabatan.find(
          (jabatan) => jabatan.nama_jabatan === pegawai.jabatan_pegawai
        );
        return {
          id: pegawai.id,
          nik: pegawai.nik,
          nama_pegawai: pegawai.nama_pegawai,
          jabatan: pegawai.jabatan_pegawai,
          gaji_pokok: jabatan.gaji_pokok,
          tj_transport: jabatan.tj_transport,
          uang_makan: jabatan.uang_makan,
        };
      });

    // Potongan Pegawai :
    const resultDataKehadiran = await getDataKehadiran();
    const resultDataPotongan = await getDataPotongan();

    const potongan_pegawai = resultDataKehadiran.map((kehadiran) => {
      const potonganAlpha = kehadiran.alpha > 0 ?
        resultDataPotongan
          .filter((potongan) => potongan.nama_potongan.toLowerCase() === "alpha")
          .reduce((total, potongan) => total + potongan.jml_potongan * kehadiran.alpha, 0) : 0;

      const potonganSakit = kehadiran.sakit > 0 ?
        resultDataPotongan
          .filter((potongan) => potongan.nama_potongan.toLowerCase() === "sakit")
          .reduce((total, potongan) => total + potongan.jml_potongan * kehadiran.sakit, 0) : 0;

      return {
        tahun: kehadiran.tahun,
        bulan: kehadiran.bulan,
        nama_pegawai: kehadiran.nama_pegawai,
        hadir: kehadiran.hadir,
        sakit: kehadiran.sakit,
        alpha: kehadiran.alpha,
        potonganSakit: potonganSakit,
        potonganAlpha: potonganAlpha,
        total_potongan: potonganSakit + potonganAlpha
      };
    });

    // Total Gaji Pegawai :
    const total_gaji_pegawai = gaji_pegawai.map((pegawai) => {
      const id = pegawai.id;
      const kehadiran = resultDataKehadiran.find(
        (kehadiran) => kehadiran.nama_pegawai === pegawai.nama_pegawai
      );
      const potongan = potongan_pegawai.find(
        (potongan) => potongan.nama_pegawai === pegawai.nama_pegawai
      );
      const total_gaji =
      (pegawai.gaji_pokok +
      pegawai.tj_transport +
      pegawai.uang_makan -
      (potongan ? potongan.total_potongan : 0)).toLocaleString();

      return {
        tahun: potongan ? potongan.tahun : kehadiran ? kehadiran.tahun : 0,
        bulan: potongan ? potongan.bulan : kehadiran ? kehadiran.bulan : 0,
        id: id,
        nik: pegawai.nik,
        nama_pegawai: pegawai.nama_pegawai,
        jabatan: pegawai.jabatan,
        gaji_pokok: pegawai.gaji_pokok.toLocaleString(),
        tj_transport: pegawai.tj_transport.toLocaleString(),
        uang_makan: pegawai.uang_makan.toLocaleString(),
        hadir: kehadiran.hadir,
        sakit: kehadiran.sakit,
        alpha: kehadiran.alpha,
        potongan: potongan ? potongan.total_potongan.toLocaleString() : 0,
        total: total_gaji,
      };
    });
    return total_gaji_pegawai;
  } catch (error) {
    console.error(error);
  }
};

// method untuk melihat data gaji pegawai
export const viewDataGajiPegawai = async (req, res) => {
  try {
    const dataGajiPegawai = await getDataGajiPegawai();
    res.status(200).json(dataGajiPegawai);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const viewDataGajiPegawaiByName = async (req, res) => {
  try {
    const dataGajiPegawai = await getDataGajiPegawai();
    const { name } = req.params;

    const dataGajiByName = dataGajiPegawai
      .filter((data_gaji) => {
        return data_gaji.nama_pegawai
          .toLowerCase()
          .includes(name.toLowerCase().replace(/ /g, ""));
      })
      .map((data_gaji) => {
        return {
          tahun: data_gaji.tahun,
          bulan: data_gaji.bulan,
          id: data_gaji.id,
          nik: data_gaji.nik,
          nama_pegawai: data_gaji.nama_pegawai,
          jabatan: data_gaji.jabatan,
          jenis_kelamin: data_gaji.jenis_kelamin,
          jabatan_pegawai: data_gaji.jabatan_pegawai,
          gaji_pokok: data_gaji.gaji_pokok,
          tj_transport: data_gaji.tj_transport,
          uang_makan: data_gaji.uang_makan,
          potongan: data_gaji.potongan,
          total_gaji: data_gaji.total,
        };
      });

    if (dataGajiByName.length === 0) {
      return res.status(404).json({ msg: 'Data tidak ditemukan' });
    }
    return res.json(dataGajiByName);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// method untuk melihat data gaji pegawai berdasarkan ID
export const viewDataGajiById = async (req, res) => {
  try {
    const dataGajiPegawai = await getDataGajiPegawai(req, res);
    const id = parseInt(req.params.id);

    const foundData = dataGajiPegawai.find((data) => data.id === id);

    if (!foundData) {
      res.status(404).json({ msg: "Data not found" });
    } else {
      res.json(foundData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// method untuk melihat data gaji pegawai berdasarkan Name
export const viewDataGajiByName = async (req, res) => {
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



// method untuk mencari data gaji pegawai berdasarkan bulan
export const viewDataGajiPegawaiByMonth = async (req, res) => {
  try {
    const dataGajiPegawai = await getDataGajiPegawai();
    const response = await DataKehadiran.findOne({
      attributes: ["bulan"],
      where: {
        bulan: req.params.month,
      },
    });

    if (response) {
      const dataGajiByMonth = dataGajiPegawai
        .filter((data_gaji) => {
          return data_gaji.bulan === response.bulan;
        })
        .map((data_gaji) => {
          return {
            bulan: response.bulan,
            id: data_gaji.id,
            nik: data_gaji.nik,
            nama_pegawai: data_gaji.nama_pegawai,
            jenis_kelamin: data_gaji.jenis_kelamin,
            jabatan_pegawai: data_gaji.jabatan_pegawai,
            gaji_pokok: data_gaji.gaji_pokok,
            tj_transport: data_gaji.tj_transport,
            uang_makan: data_gaji.uang_makan,
            potongan: data_gaji.potongan,
            total_gaji: data_gaji.total,
          };
        });
      return res.json(dataGajiByMonth);
    }

    res
      .status(404)
      .json({ msg: `Data untuk bulan ${req.params.month} tidak ditemukan` });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// method untuk mencari data gaji pegawai berdasarkan tahun
export const viewDataGajiPegawaiByYear = async (req, res) => {
  try {
    const dataGajiPegawai = await getDataGajiPegawai();
    const { year } = req.params;

    const dataGajiByYear = dataGajiPegawai
      .filter((data_gaji) => {
        const gajiYear = data_gaji.tahun;
        return gajiYear === parseInt(year);
      })
      .map((data_gaji) => {
        return {
          tahun: data_gaji.tahun,
          id: data_gaji.id,
          nik: data_gaji.nik,
          nama_pegawai: data_gaji.nama_pegawai,
          jenis_kelamin: data_gaji.jenis_kelamin,
          jabatan_pegawai: data_gaji.jabatan,
          hadir: data_gaji.hadir,
          sakit: data_gaji.sakit,
          alpha: data_gaji.alpha,
          gaji_pokok: data_gaji.gaji_pokok,
          tj_transport: data_gaji.tj_transport,
          uang_makan: data_gaji.uang_makan,
          potongan: data_gaji.potongan,
          total_gaji: data_gaji.total,
        };
      });

    if (dataGajiByYear.length === 0) {
      return res
        .status(404)
        .json({ msg: `Data tahun ${year} tidak ditemukan` });
    }
    res.json(dataGajiByYear);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// method untuk mencari data gaji pegawai berdasarkan tahun
export const dataLaporanGajiByYear = async (req, res) => {
  try {
    const dataGajiPegawai = await getDataGajiPegawai();
    const { year } = req.params;

    const dataGajiByYear = dataGajiPegawai
      .filter((data_gaji) => {
        const gajiYear = data_gaji.tahun;
        return gajiYear === parseInt(year);
      })
      .map((data_gaji) => {
        return {
          tahun: data_gaji.tahun,
          id: data_gaji.id,
          nik: data_gaji.nik,
          nama_pegawai: data_gaji.nama_pegawai,
          jenis_kelamin: data_gaji.jenis_kelamin,
          jabatan_pegawai: data_gaji.jabatan_pegawai,
          gaji_pokok: data_gaji.gaji_pokok,
          tj_transport: data_gaji.tj_transport,
          uang_makan: data_gaji.uang_makan,
          potongan: data_gaji.potongan,
          total_gaji: data_gaji.total,
        };
      });

    if (dataGajiByYear.length === 0) {
      return res
        .status(404)
        .json({ msg: `Data tahun ${year} tidak ditemukan` });
    } else {
      const laporanByYear = dataGajiByYear.map((data) => data.tahun)
      console.log(laporanByYear)
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};