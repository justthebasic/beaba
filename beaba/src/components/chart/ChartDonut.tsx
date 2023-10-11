import { Card, Title, DonutChart } from "@tremor/react";

const Pessoas = [
  {
    name: "XLSX",
    Uploads: 9800,
  },
  {
    name: "XLS",
    Uploads: 4567,
  },
  {
    name: "CSV",
    Uploads: 3908,
  },
  
];




export const ChartDonut = () => {
  return (
    <>
      <Card className="max-w-lg">
        <Title>Quantidade uploads</Title>
        <DonutChart
          className="mt-6"
          data={Pessoas}
          category="Uploads"
          index="name"
          colors={["slate", "violet", "indigo",]}
        />
      </Card>
    </>
  )
}
