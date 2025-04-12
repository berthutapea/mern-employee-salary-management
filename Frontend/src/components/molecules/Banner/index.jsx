import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bannerImg from "../../../assets/images/bannerImg.png";
import { ButtonThree } from "../../atoms";
import "../../../shared/Shared.css";

const Banner = () => {
  return (
    <div className="parent flex min-h-[100vh] flex-col-reverse items-center justify-between pt-14 dark:bg-boxdark lg:flex-row ">
      <motion.div
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="mb-0 translate-y-[-30%] text-center text-3xl font-semibold text-primary sm:translate-y-[-0%] md:text-left">
          Sistem Penggajian Karyawan Online
          <br />
          PT. Humpuss Karbometil Selulosa
        </h1>
        <p className="mb-6 max-w-xl translate-y-[-60%] pt-8 text-center font-medium dark:text-white sm:translate-y-[-0%] md:text-left">
          Sebuah platform perusahaan untuk mengelola proses penggajian karyawan
          secara efisien dan terintegrasi melalui platform digital.
        </p>

        <div className="grid translate-y-[-170%] justify-center sm:flex sm:translate-y-[-0%] sm:justify-start">
          <Link to="/login" className="sm:py-0">
            <ButtonThree>
              <span>Login</span>
            </ButtonThree>
          </Link>
        </div>
      </motion.div>
      <motion.div
        className="w-full md:w-1/3"
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="order-1  sm:pt-0 md:pt-0 lg:order-3 lg:pt-0">
          <img src={bannerImg} title="Banner SiPeKa" alt="Banner SiPeKa" />
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
