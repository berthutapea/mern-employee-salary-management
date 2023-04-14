import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import TableOne from '../components/Table/TableOne';
import TableTwo from '../components/Table/TableTwo';
import TableThree from '../components/Table/TableThree';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Tables' />

      <div className='flex flex-col gap-10'>
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </DefaultLayout>
  )
}

export default Tables;
