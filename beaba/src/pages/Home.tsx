
import { ChartDonut } from '../components/ChartDonut';
import { Navbar } from '../components/Navbar'

import { Table } from '../components/Table';



export const Home = () => {


  return (
    <>


      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-1'> <Navbar /> </div>
        <div className='col-span-2'><ChartDonut /> </div>
        <div className='col-span-3'><Table /> </div>
      </div>
    </>
  );
};
