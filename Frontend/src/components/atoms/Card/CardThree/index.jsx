import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataJabatan } from '../../../../config/redux/action';
import { FaUserTie } from 'react-icons/fa'

const CardThree = () => {
  const dispatch = useDispatch();
  const { dataJabatan } = useSelector((state) => state.dataJabatan);
  const jumlahDataJabatan = dataJabatan.length;

  useEffect(() => {
    dispatch(getDataJabatan());
  }, [dispatch]);

  return (
    <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
        <FaUserTie className="fill-primary dark:fill-white text-xl" />
      </div>

      <div className='mt-4 flex items-end justify-between'>
        <div>
          <h4 className='text-title-md font-bold text-black dark:text-white'>
            {jumlahDataJabatan}
          </h4>
          <span className='text-sm font-medium'>Data Jabatan</span>
        </div>
      </div>
    </div>
  )
}

export default CardThree;
