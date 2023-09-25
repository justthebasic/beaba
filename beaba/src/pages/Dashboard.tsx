import { Navbar } from '../components/Navbar'
import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";
// import { ChartDonut } from '../components/ChartDonut';
import { ChartBar } from '../components/ChartBar';




const chartdata = [
  {
    name: "Amphibians",
    "Number of threatened species": 2488,
  },
  {
    name: "Birds",
    "Number of threatened species": 1445,
  },
  {
    name: "Crustaceans",
    "Number of threatened species": 743,
  },
];

const charAprovement = [
  {
    name: "Aprovado",
    "Número de aprovações": 2500,
  },
  {
    name: "Reprovado",
    "Número de reprovações": 400,
  }
]
const charFormats = [
  {
    name: "XLS",
    "Quantidade de arquivos xls": 2500,
  },
  {
    name: "XLSX",
    "Quantidade de arquivos xlsx": 400,
  },
  {
    name: "CSV",
    "Quantidade de arquivos csv": 400,
  }
]






export const Dashboard = () => {
  return (
    <>
      <div className='grid grid-cols-6'>

        <Navbar />

        <main className="p-12 col-span-5">
          <Title className='text-center text-5xl '>Dashboard</Title>


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
                    

                    {/* Placeholder to set height */}
                    <div className="h-28 " />
                  </Card>
                  <Card>
                    <Title>Maior Quantia de uploads</Title>
                    {/* Placeholder to set height */}
                    <div className="h-28" />
                  </Card>
                  <Card>
                    <Title>Ranking Formatos</Title>
                    {/* Placeholder to set height */}
                    <div className="h-28" />
                  </Card>
                </Grid>
                <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                  <Card>

                    {/* Placeholder to set height */}
                    <ChartBar title={'Quantidade de uploads'} categories={"Aprovações"} dataChar={charAprovement} />
                    <div className="h-30" />
                  </Card>
                  <Card>
                    <ChartBar title={'Maior Quantia Upload'} categories={"Pessoas"} dataChar={chartdata} />
                    {/* Placeholder to set height */}
                    <div className="h-30" />
                  </Card>
                  <Card>
                    <ChartBar title={'Ranking formatos'} categories={"Formatos"} dataChar={charFormats} />
                    {/* Placeholder to set height */}
                    <div className="h-30" />
                  </Card>
                </Grid>

              </TabPanel>

              {/* detail */}
              <TabPanel>
                <div className="mt-6">
                  <Card>
                    <Title>Detail</Title>
                    <div className="h-96" />
                  </Card>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </main>
      </div>
    </>
  )
}
