
import { ChartBar } from '../components/ChartBar';
import { ChartDonut } from '../components/ChartDonut';
import { Navbar } from '../components/Navbar'

import { Table } from '../components/Table';



export const Home = () => {


  return (
    <>


      <div className='grid grid-cols-6 gap-4'>
        <div>
          <div className='col-span-1'> <Navbar /> </div>
        </div>
        <div className='col-span-5 mr-16'>
        <div className='flex'>
          <ChartBar title={'Titulo'} categories={'Categoria'} dataChar={undefined} />
          <ChartDonut /> 
        
        </div>

        <div className=''><Table /> </div>
        </div>
      </div>

    </>
  );
};
