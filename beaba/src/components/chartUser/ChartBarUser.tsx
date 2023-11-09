import { Card, Title, BarChart, Subtitle } from "@tremor/react";
import { useEffect, useState } from "react";
import apiFastApi from "../../services/apiFastAPI";
import api from "../../services/api";






export const ChartBarRankingFormatUser = () => {
  const [templates, setTemplates] = useState([]);
  const [formatRanking, setFormatRanking] = useState([]);

  useEffect(() => {
    // Recuperar a lista de templates do servidor
    apiFastApi.get('apis/templates', {})
      .then((response) => {
        
        setTemplates(response.data);

        // Conte a quantidade de arquivos por formato
        const formatCounts = {};
        response.data.map((template) => {
          const formato = template.formato;
          if (formatCounts[formato]) {
            formatCounts[formato]++;
          } else {
            formatCounts[formato] = 1;
          }
        });

        // Converta o objeto em uma lista
        const formatList = Object.entries(formatCounts).map(([name, quantidade]) => ({
          name,
          "Quantidade de templates": quantidade,
        }));

        // Ordene a lista com base na quantidade de templates em ordem decrescente
        formatList.sort((a, b) => b["Quantidade de templates"] - a["Quantidade de templates"]);

        setFormatRanking(formatList);
      })
      .catch((error) => {
        console.error('Erro ao obter lista de templates', error);
      });
  }, []);

  return (
    <>
      <Card>
        <Title>Ranking formatos </Title>
        <Subtitle>Formatos templates mais usados pelos usuários</Subtitle>

        <BarChart
          className="mt-6"
          data={formatRanking}
          index="name"
          categories={["Quantidade de templates"]}
          colors={["blue"]}
          yAxisWidth={48}
        />
      </Card>
    </>
  );
}

export const ChartBarEstadosUser = () => {
  const [templates, setTemplates] = useState([]);
  const [numAtivos, setNumAtivos] = useState(0);
  const [numInativos, setNumInativos] = useState(0);
  const [numPendentes, setNumPendentes] = useState(0);

  useEffect(() => {
    // Recuperar a lista de arquivos do servidor
    apiFastApi.get('apis/templates', {})
      .then((response) => {
        setTemplates(response.data);

        // Conte o número de aprovações e reprovações
        const ativos = response.data.filter(file => file.estado === 'ativo');
        const inativos = response.data.filter(file => file.estado === 'inativo');
        const pendentes = response.data.filter(file => file.estado === 'pendente');

        setNumAtivos(ativos.length);
        setNumInativos(inativos.length);
        setNumPendentes(pendentes.length);
      })
      .catch((error) => {
        console.error('Erro ao obter lista de arquivos', error);
      });
  }, []);

  return (
    <>
      <Card>
        <Title>Quantidade de estados templates</Title>
        <Subtitle>Número de templates ativos, inativos e pendentes</Subtitle>

        <BarChart
          className="mt-6"
          data={[
            {
              name: "Ativo",
              "Número de templates ativos": numAtivos,
            },
            {
              name: "Inativo",
              "Número de templates inativos": numInativos,
            },
            {
              name: "Pendente",
              "Número de templates pendentes": numPendentes,
            },
          ]}
          index="name"
          categories={["Número de templates ativos", "Número de templates inativos","Número de templates pendentes" ]}
          colors={["blue", "red"]}
          yAxisWidth={48}
        />
      </Card>
    </>
  );
}

