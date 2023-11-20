
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

import { SidebarUser } from "../../components/sidebar/SidebarUser";
import { TableArquivosUser } from "../../components/tableUser/TableArquivosUser";
import { TemplatesPendenteUser, TemplatesTotalUser, UploadsTotalUser } from "../../components/chartUser/InfoGeraisUser";







export const DashboardUser = () => {
  return (
    <>
      <div className='flex h-screen font-sans'>
        <div className='fixed h-screen '>

          <SidebarUser />
        </div>

        <main className=" flex-auto ml-64 p-4  ">
          <Title>
            <h1 className='text-2xl text-black'>Dashboard</h1>
          </Title>


          <TabGroup className="mt-6">
            <TabList>
              <Tab>Informações gerais</Tab>
              
            </TabList>

            <TabPanels>
              <TabPanel>
                <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                  <Card>
                    <div className='flex text-center justify-center m-auto center'>
                      <TemplatesTotalUser />
                    </div>
                    <div className="h-22 " />
                  </Card>
                  <Card>
                    <div className='flex text-center justify-center m-auto center'>
                      <TemplatesPendenteUser />
                    </div>
                    <div className="h-22 " />
                  </Card>
                  <Card>

                    <div className='flex text-center justify-center m-auto center'>
                      <UploadsTotalUser />
                    </div>

                    <div className="h-22" />
                  </Card>

                </Grid>
                <Grid numItemsMd={2} numItemsLg={1} className="gap-6 mt-6">
                  <div className='justify-center m-auto center w-full'>
                    <TableArquivosUser />
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
