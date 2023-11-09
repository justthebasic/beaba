
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

import { Table } from "../../components/table/Table";
import { NavbarUser } from "../../components/navbar/NavbarUser";
import { TableArquivosUser } from "../../components/tableUser/TableArquivosUser";
import { TemplatesTotal, UploadsTotal, UsuariosTotal } from "../../components/chart/InfoGerais";
import { TemplatesTotalUser, UploadsTotalUser } from "../../components/chartUser/InfoGeraisUser";
import { ChartBarEstadosUser, ChartBarRankingFormatUser, ChartBarRankingUser } from "../../components/chartUser/ChartBarUser";




// const chartdata = [
//   {
//     name: "Amphibians",
//     "Number of threatened species": 2488,
//   },
//   {
//     name: "Birds",
//     "Number of threatened species": 1445,
//   },
//   {
//     name: "Crustaceans",
//     "Number of threatened species": 743,
//   },
// ];

// const charAprovement = [
//   {
//     name: "Aprovado",
//     "Número de aprovações": 2500,
//   },
//   {
//     name: "Reprovado",
//     "Número de reprovações": 400,
//   }
// ]
// const charFormats = [
//   {
//     name: "XLS",
//     "Quantidade de arquivos xls": 2500,
//   },
//   {
//     name: "XLSX",
//     "Quantidade de arquivos xlsx": 400,
//   },
//   {
//     name: "CSV",
//     "Quantidade de arquivos csv": 400,
//   }
// ]






export const DashboardUser = () => {
  return (
    <>
      <div className='flex h-screen font-sans'>
        <div className='fixed h-screen '>

          <NavbarUser />
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
                <Grid numItemsMd={2} numItemsLg={2} className="gap-6 mt-6">
                  <Card>
                    <div className='flex text-center justify-center m-auto center'>
                      <TemplatesTotalUser />
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

                  <Card >

                    <div className='justify-center m-auto center w-full'>
                      <TableArquivosUser />
                    </div>
                  </Card>
                </Grid>

              </TabPanel>

              {/* detail */}
              <TabPanel>
                
                <Grid numItemsMd={2} numItemsLg={2} className="gap-6 mt-6">

                  <Card>
                    <ChartBarEstadosUser />

                    <div className="h-30" />
                  </Card>
                  <Card>
                    <ChartBarRankingFormatUser />

                    <div className="h-30" />
                  </Card>
                </Grid>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </main>
      </div >
    </>
  )
}
