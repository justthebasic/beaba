export type ArquivoType = {

    id: number;
    nome_arquivo: string;
    caminho_arquivo: string;
    data_envio: string;
    estado: boolean;
    template: {
        id: number;
        nome_template: string;
    };
    usuario: {
        id: number;
        nome_usuario: string;
    };
    arquivo: {
        id: number;
        nome_template: string;
    };
};

export type TemplateType = {

    id: number;
    nome_template: string;
    data_criacao: string;
    formato: string;
    estado: string;
    usuario_id: number;
    usuario: {
        id: number;
        nome_usuario: string;
    };
    campos: {
        id: number;
        nome_campo: string;
        tipo_campo: string;
    }
};

export type UsuarioType = {

    id: number;
    nome_usuario: string;
    email: string;
    cargo: string;
    estado: string

};


