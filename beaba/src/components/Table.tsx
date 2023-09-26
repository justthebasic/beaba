import { Grid } from 'gridjs-react'
import "gridjs/dist/theme/mermaid.css";
import React from 'react'

export const Table = () => {
  return (
    <>
    <div className ='flex-col h-auto mt-10'>

        <Grid 
        data={[
          ['John', 'Arquivo1.xls',15, 800, "Industrial"],
          ['Mike', 'Arquivo2.xls'],
          ['Jorge', 'Arquivo3.xlsx'],
          ['Brian', 'Arquivo4.csv'],
          ['Jhonathan', 'mike@gmail.com'],
        ]}
        columns={['Criador', 'Arquivo','Nº colunas', 'Nº linhas', 'Setor', 'Visualizar']}
        search={true}
        sort = {true}
        autoWidth = {true}
        pagination={{
          limit: 4,
        }}
      />
    </div>
    </>
  )
}
