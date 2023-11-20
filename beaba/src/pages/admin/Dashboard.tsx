import { Sidebar } from '../../components/sidebar/Sidebar'
import {
  Card,
  Grid,
  Title,

  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,

} from "@tremor/react";
// import { ChartDonut } from '../components/ChartDonut';
import { ChartBarEstados, ChartBarMaiorUploads, ChartBarRanking, ChartBarUploads } from '../../components/chart/ChartBar';
import { TemplatesTotal, UploadsTotal, UsuariosTotal } from '../../components/chart/InfoGerais';

import { useEffect, useState } from 'react';
import apiFastApi from '../../services/apiFastAPI';
import { TableArquivos } from '../../components/table/TableArquivos';



export const Dashboard = () => {

  const [, setTemplates] = useState([]);

  useEffect(() => {
    // Recuperar a lista de templates do servidor
    apiFastApi.get('apis/templates/', {

    }).then((response) => {

      setTemplates(response.data);
      console.log(setTemplates)
    }).catch((error) => {
      console.error('erro ao obter lista de templates', error)
    })
  }, []);


  return (
    <>
      <div className='flex h-screen font-sans'>
        <div className='fixed h-screen '>

          <Sidebar />
        </div>

        <main className=" flex-auto ml-64 p-4  ">
          <Title>
            <h1 className='text-2xl text-black'>Dashboard</h1>
          </Title>


          <TabGroup className="mt-6">
            <TabList>
              <Tab>Informações gerais</Tab>
              <Tab>Detalhes</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                  <Card>
                    <div className='flex text-center justify-center m-auto center'>
                      <TemplatesTotal />
                    </div>
                    <div className="h-22 " />
                  </Card>
                  <Card>

                    <div className='flex text-center justify-center m-auto center'>
                      <UploadsTotal />
                    </div>

                    <div className="h-22" />
                  </Card>
                  <Card>
                    <div className='flex text-center justify-center m-auto center'>
                      <UsuariosTotal />
                    </div>

                    <div className="h-22" />
                  </Card>
                </Grid>
                <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                  <Card>

                    <ChartBarMaiorUploads />
                    <div className="h-30" />
                  </Card>
                  <Card>

                    <ChartBarUploads />
                    <div className="h-30" />
                  </Card>
                  <Card>
                    <ChartBarRanking />

                    <div className="h-30" />
                  </Card>
                </Grid>

              </TabPanel>

              {/* detail */}
              <TabPanel>
                <Grid numItemsMd={3} numItemsLg={1} className="gap-6 mt-6">

                  <div className="mt-6 ">
                    <Card >

                      <div className='flex text-center justify-center m-auto center'>
                        <ChartBarEstados />
                      </div>


                      <div className='justify-center m-auto center w-full'>
                        <TableArquivos />
                      </div>
                    </Card>

                  </div>

                </Grid>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </main>
      </div >
    </>
  )
}
