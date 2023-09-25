import { Card, Title, DonutChart } from "@tremor/react";

const Pessoas = [
  {
    name: "Matheus",
    Uploads: 9800,
  },
  {
    name: "Lucas",
    Uploads: 4567,
  },
  {
    name: "José",
    Uploads: 3908,
  },
  {
    name: "Pedro",
    Uploads: 2400,
  },
  {
    name: "Ricardo",
    Uploads: 1908,
  },
  {
    name: "Fred",
    Uploads: 1398,
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
          valueFormatter={String}
          colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
        />
      </Card>
    </>
  )
}
