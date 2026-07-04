import { Data } from "@/components/Data.jsx";
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

export const PRODUCT_COLUNAS = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Sobrenome",
    dataIndex: "surname",
    key: "surname",
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Data de Nascimento",
    dataIndex: "birthDate",
    key: "birthDate",
    render: (valor) => <Data valor={valor} />,
  },
  {
    title: "Ativo",
    dataIndex: "active",
    key: "active",
    render: (valor) => <Tag color={COR_STATUS[valor].cor}>{COR_STATUS[valor].valor}</Tag>,
  },
];
