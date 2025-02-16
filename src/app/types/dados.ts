export interface DadosTabela {
    cpf: string;
    valor: string;
    nome: string;
    descricao: string;
    cod_convenio: number;
}

// Enum para os códigos de convênio baseado no backend
export enum ConvenioCodes {
    UNIODONTO = 9,
    ANSEF_DESCONTO = 13,
    UNIMED_DESCONTO = 14,
    TARIFA_BB = 19,
    REAJUSTE_ANSEF = 25,
    DESCONHECIDO = -1
}