import { Card, Title } from "@tremor/react";

import { useEffect, useState } from "react";
import apiFastApi from "../../services/apiFastAPI";
import { useUserStore } from "../../state/state";

export const UploadsTotalUser = () => {
  const [arquivos, setArquivos] = useState([]);
  const user = useUserStore((state) => state.user);
  const userId = user?.payload.userId
  
  useEffect(() => {
    // Recuperar a lista de templates do servidor
    apiFastApi.get('apis/arquivos', {})
      .then((response) => {
        setArquivos(response.data);

     

      })
      .catch((error) => {
        console.error('Erro ao obter lista de templates', error);
      });
  }, []);

  const isUsuario = arquivos.filter(arquivo => arquivo.usuario.id ===  userId)
  const total = isUsuario.length;

  return (
    <>
      <div>

        <Title >Total de Uploads: <span className="text-green-600">{total}</span></Title>
      </div>


    </>
  );
}




export const TemplatesTotalUser = () => {
  const [templates, setTemplates] = useState([]);
  const user = useUserStore((state) => state.user);
  const userId = user?.payload.userId

  useEffect(() => {
    apiFastApi.get('apis/templates')
      .then((response) => {
        setTemplates(response.data);


      })
      .catch((error) => {
        console.error('Erro ao obter lista de templates', error);
      });
  }, []);



  const isUsuario = templates.filter(template => template.usuario.id === userId && template.estado === 'ativo')
  const total = isUsuario.length;
  


  return (
    <>
      <div>

        <Title >Templates ativos: <span className="text-green-600">{total}</span></Title>
      </div>


    </>
  );
}

export const TemplatesPendenteUser = () => {
  const [templates, setTemplates] = useState([]);
  const user = useUserStore((state) => state.user);
  const userId = user?.payload.userId

  useEffect(() => {
    apiFastApi.get('apis/templates')
      .then((response) => {
        setTemplates(response.data);


      })
      .catch((error) => {
        console.error('Erro ao obter lista de templates', error);
      });
  }, []);



  const isUsuario = templates.filter(template => template.usuario.id === userId && template.estado === 'pendente')
  const total = isUsuario.length;
  


  return (
    <>
      <div>

        <Title >Templates pendentes: <span className="text-gray-400">{total}</span></Title>
      </div>


    </>
  );
}




