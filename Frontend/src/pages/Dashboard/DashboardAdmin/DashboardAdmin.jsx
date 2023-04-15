import React from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import CardOne from '../../../components/Card/CardOne';
import CardTwo from '../../../components/Card/CardTwo';
import CardThree from '../../../components/Card/CardThree'
import CardFour from '../../../components/Card/CardFour';
import ChartOne from '../../../components/Chart/ChartOne';
import ChartTwo from '../../../components/Chart/ChartTwo';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';

const Analytics = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Dashboard' />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-6 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 sm:col-span-7">
          <ChartOne />
        </div>
        <div className="col-span-12 sm:col-span-5">
          <ChartTwo />
        </div>
      </div>


    </DefaultLayout>
  )
}

export default Analytics;
