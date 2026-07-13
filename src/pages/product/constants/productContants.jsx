import { Tag } from "antd";
import { PriceCell } from "@/pages/product/components/PriceCell.jsx";

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
    render: (price, record) => <PriceCell price={price} conversions={record?.pricesInOtherCurrencies} />,
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

export const PRODUCT_CAMPOS_MODAL = [
  {
    key: "name",
    label: "Nome",
    tipo: "input",
    obrigatorio: true,
    propriedades: { placeholder: "Digite o nome do produto" },
  },
  {
    key: "description",
    label: "Descrição",
    tipo: "input",
    obrigatorio: true,
    propriedades: { placeholder: "Digite a descrição do produto" },
  },
  {
    key: "price",
    label: "Preço",
    tipo: "input",
    obrigatorio: true,
    propriedades: { placeholder: "Digite o preço do produto", type: "number", min: 0, step: 0.01 },
  },
  {
    key: "quantity",
    label: "Quantidade",
    tipo: "input",
    obrigatorio: true,
    propriedades: { placeholder: "Digite a quantidade do produto", type: "number", min: 0 },
  },
];
