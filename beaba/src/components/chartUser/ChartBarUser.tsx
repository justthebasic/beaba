// import { Card, Title, BarChart, Subtitle } from "@tremor/react";
// import { useEffect, useState } from "react";
// import apiFastApi from "../../services/apiFastAPI";

// import { useUserStore } from "../../state/state";





// export const ChartBarEstadosUser = () => {
//   const [templates, setTemplates] = useState([]);
//   const [numAtivos, setNumAtivos] = useState(0);
//   const [numInativos, setNumInativos] = useState(0);
//   const [numPendentes, setNumPendentes] = useState(0);
//   const user = useUserStore((state) => state.user);
//   const userId = user?.payload.userId

//   useEffect(() => {
//     // Recuperar a lista de arquivos do servidor
//     apiFastApi.get('apis/templates', {})
//       .then((response) => {
//         setTemplates(response.data);

//         // Conte o número de aprovações e reprovações
//         const isUsuario = templates.filter(template => template.usuario.id === userId )
//         const ativos = isUsuario.filter(file => file.estado === 'ativo');
//         const inativos = isUsuario.filter(file => file.estado === 'inativo');
//         const pendentes = isUsuario.filter(file => file.estado === 'pendente');

//         setNumAtivos(ativos.length);
//         setNumInativos(inativos.length);
//         setNumPendentes(pendentes.length);
//       })
//       .catch((error) => {
//         console.error('Erro ao obter lista de arquivos', error);
//       });
//   }, []);

//   return (
//     <>
//       <Card>
//         <Title>Quantidade de estados templates</Title>
//         <Subtitle>Número de templates ativos, inativos e pendentes</Subtitle>

//         <BarChart
//           className="mt-6"
//           data={[
//             {
//               name: "Ativo",
//               "Número de templates ativos": numAtivos,
//             },
//             {
//               name: "Inativo",
//               "Número de templates inativos": numInativos,
//             },
//             {
//               name: "Pendente",
//               "Número de templates pendentes": numPendentes,
//             },
//           ]}
//           index="name"
//           categories={["Número de templates ativos", "Número de templates inativos","Número de templates pendentes" ]}
//           colors={["blue", "red"]}
//           yAxisWidth={48}
//         />
//       </Card>
//     </>
//   );
// }

