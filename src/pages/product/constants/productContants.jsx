import { Tag } from "antd";

export const PRODUCT_CAMPOS = [
  {
    key: "name",
    label: "Nome",
    tipo: "input",
    propriedades: { placeholder: "Digite o nome do produto" },
  },
  {
    key: "active",
    label: "Ativo",
    tipo: "switch",
  },
];

const COR_STATUS = {
  true: { cor: "green", valor: "Sim" },
  false: { cor: "red", valor: "Não" },
};

export const PRODUCT_COLUNAS = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Descrição",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Preço",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Quantidade",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Ativo",
    dataIndex: "active",
    key: "active",
    render: (valor) => <Tag color={COR_STATUS[valor]?.cor}>{COR_STATUS[valor]?.valor}</Tag>,
  },
];
