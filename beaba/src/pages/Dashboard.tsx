import { Navbar } from '../components/Navbar'
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
import { ChartBarMaiorUploads, ChartBarRanking, ChartBarUploads } from '../components/chart/ChartBar';
import { ChartDonut } from '../components/chart/ChartDonut';
import { Table } from "../components/table/Table";




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






export const Dashboard = () => {
  return (
    <>
      <div className='flex h-screen font-sans'>

        <Navbar />

        <main className="p-12 m-auto ">
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
                    <Title>Templates Cadastrados</Title>

                    <div className="h-28 " />
                  </Card>
                  <Card>
                    <Title>Maior Quantia de uploads</Title>

                    <div className="h-28" />
                  </Card>
                  <Card>
                    <Title>Ranking Formatos</Title>

                    <div className="h-28" />
                  </Card>
                </Grid>
                <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                  <Card>

                    <ChartBarUploads />
                    <div className="h-30" />
                  </Card>
                  <Card>
                    <ChartBarMaiorUploads />

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
                <div className="mt-6 ">
                  <Card>
                    <div>
                      <div className='flex items-center'>
                        <ChartBarUploads />
                        <ChartDonut />
                      </div>
                      <div className=''>
                        <Table />
                      </div>

                    </div>


                    <div className="" />
                  </Card>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </main>
      </div >
    </>
  )
}
