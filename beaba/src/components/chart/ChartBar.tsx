import { Card, Title, BarChart, Subtitle } from "@tremor/react";


// interface ChartBarProps{
//     title: string;
//     categories: string;
//     dataChar: object;
// }


const charUploads = [
    {
      name: "Pedro",
      "Número de uploads": 2488,
    },
    {
      name: "Lucas",
      "Número de uploads": 1445,
    },
    {
      name: "Jorge",
      "Número de uploads": 743,
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
      "Quantidade de arquivos": 2500,
    },
    {
      name: "XLSX",
      "Quantidade de arquivos": 400,
    },
    {
      name: "CSV",
      "Quantidade de arquivos": 400,
    }
  ]




export const ChartBarUploads = () => {
    return (
        <>
            <Card>
                <Title >Quantidade de aprovações</Title>
                <Subtitle>Quantidade de aprovações e reprovações</Subtitle>

                <BarChart
                    className="mt-6"
                    data={charAprovement}
                    index="name"
                    categories={["Número de aprovações"]}
                    colors={["blue","red"]}
                    yAxisWidth={48}
                />
            </Card>
        </>
    )
}
export const ChartBarMaiorUploads = () => {
    return (
        <>
            <Card>
                <Title >Ranking Uploaders</Title>
                <Subtitle>Quem mais fez upload dos usuários</Subtitle>

                <BarChart
                    className="mt-6"
                    data={charUploads}
                    index="name"
                    categories={["Número de uploads"]}
                    colors={["blue"]}
                    yAxisWidth={48}
                />
            </Card>
        </>
    )
}
export const ChartBarRanking = () => {
    return (
        <>
            <Card>
                <Title >Ranking formatos</Title>
                <Subtitle>Formatos mais usados pelos usuários</Subtitle>
                <BarChart
                    className="mt-6"
                    data={charFormats}
                    index="name"
                    categories={["Quantidade de arquivos"]}
                    colors={["blue"]}
                    yAxisWidth={48}
                />
            </Card>
        </>
    )
}
