import { Tag } from "antd";
import { PriceCell } from "@/pages/product/components/PriceCell.jsx";

export const CURRENCY_CAMPOS = [
  {
    key: "name",
    label: "Nome",
    tipo: "input",
    propriedades: { placeholder: "Digite o nome do produto" },
  },
];

export const CURRENCY_COLUNAS = [
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
