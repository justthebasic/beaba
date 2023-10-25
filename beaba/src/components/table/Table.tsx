import { Grid, _ } from 'gridjs-react'
import "gridjs/dist/theme/mermaid.css";


export const Table = () => {

  return (
    <>
      <div className='flex-col h-auto mt-10'>

        <Grid
          columns={['Criador', 'Arquivo', 'Nº colunas', 'Nº linhas', 'Setor', 'Visualizar']}
          search={true}
          sort={true}
          autoWidth={true}
          pagination={{
            limit: 2,
          }}
          data={[
            ['John', 'Arquivo1.xls', 15, 800, "Industrial",],
            ['Alucard', 'Arquivo1.xls', 17, 700, "Industrial",],
            ['Mike', 'Arquivo2.xls'],
            ['Jorge', 'Arquivo3.xlsx'],
            ['Brian', 'Arquivo4.csv'],
            ['Jhonathan', 'mike@gmail.com'],
          ]}
        />
      </div>
    </>
  )
}
// export const TableArquivos = () => {



//   return (
//     <>
//       <div className='flex-col h-auto mt-10'>

//         <Grid
//           columns={['Nome arquivo', 'Nº colunas', 'Nº linhas', 'Template', 'Status', 'Baixar']}
//           search={true}
//           sort={true}
//           autoWidth={true}
//           pagination={{
//             limit: 10,
//           }}
//           data={[
//             ['John', '5', 350, "Template1", "ATIVO","Icon"],
//             ['Miguel', '10', 440, "Template2", "ATIVO","Icon"],
//             ['Gael', '5', 460, "Template3", "ATIVO","Icon"],
//             ['Maria', '5', 4450, "Template4", "ATIVO","Icon"],
//             ['Helena', '5', 7770, "Template5", "ATIVO","Icon"],
//             ['Alice', '5', 53420, "Template10", "ATIVO","Icon"],
//             ['Elon', '5', 350, "Template20", "ATIVO","Icon"],
//             ['Pedro', '5', 350, "Template500", "ATIVO","Icon"],
//             ['Pedro', '5', 350, "Template500", "ATIVO","Icon"],
//             ['Pedro', '5', 350, "Template500", "ATIVO","Icon"],
            
//           ]}
//         />
//       </div>
//     </>
//   )
// }



// export const TableTemplate = () => {
//   return (
//     <>
//       <div className='flex-col h-auto mt-10'>

//         <Grid
//           columns={['Nome Template', 'Nº colunas', 'Setor', 'Aprovação' ,'Visualizar']}
//           search={true}
//           sort={true}
//           autoWidth={true}
//           pagination={{
//             limit: 6,
//           }}
//           data={[
//             ['Template1.xls', 15, "Industrial",_(<button className={"py-2 px-4 border rounded-md text-white bg-blue-600"} onClick={() => alert('Aprovado')}>Aprovar</button>) ],
//           ]}
//         />
//       </div>
//     </>
//   )
// }

