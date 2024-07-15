import React from 'react';
import Button from './Button';
import Link from 'next/link';

const Intro = () => {
  return (
    <section className='max-container padding-container flex flex-row gap-20 py-10'>
        <div className='relative z-20 flex flex-1 flex-col xl:w-1/2'>
            <h1 className='text-black bold-32 lg:bold-52 '>Welcome to <span className='text-red-500'>Fire-App</span> </h1>
             <p className="regular-16 mt-6 text-black xl:max-w-[520px]">
                See fire locations using the power of Remote Sensing Data.This app uses Sentinel-2 data to detect active fire locations and burnt area
                Open our web app to explore.
             </p>

             <div className='flex flex-col w-full gap-3 sm:flex-row py-5'>
                <Link href={'/fireapp'}>
                <Button type='button' title='Open the App' variant='btn_green' icon='/login.svg'/>
                </Link>
             </div>
        </div>

    </section>
  );
};

export default Intro;
