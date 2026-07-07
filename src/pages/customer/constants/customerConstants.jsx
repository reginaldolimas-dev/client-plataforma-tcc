import { Data } from "@/components/Data.jsx";
import { Tag } from "antd";
import dayjs from "dayjs";

const COR_STATUS = {
  true: { cor: "green", valor: "Sim" },
  false: { cor: "red", valor: "Não" },
};

export const CUSTOMER_COLUNAS = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Sobre Nome",
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

export const CUSTOMER_CAMPOS = [
  {
    key: "name",
    label: "Nome",
    tipo: "input",
    propriedades: { placeholder: "Digite seu nome" },
  },
  {
    key: "surname",
    label: "Sobre nome",
    tipo: "input",
  },
  {
    key: "active",
    label: "Ativo",
    tipo: "switch",
  },
];

export const CUSTOMER_CAMPOS_MODAL = [
  {
    key: "name",
    label: "Nome",
    tipo: "input",
    obrigatorio: true,
    propriedades: { placeholder: "Digite seu nome" },
  },
  {
    key: "surname",
    label: "Sobre nome",
    tipo: "input",
    obrigatorio: true,
    propriedades: { placeholder: "Digite seu sobre nome" },
  },
  {
    key: "email",
    label: "E-mail",
    tipo: "input",
    obrigatorio: true,
    propriedades: { placeholder: "Digite seu e-mail" },
  },
  {
    key: "birthDate",
    label: "Data de Nascimento",
    tipo: "datepicker",
    formatarEntrada: (valor) => dayjs(valor),
    propriedades: { format: "DD/MM/YYYY" },
  },
  {
    key: "active",
    label: "Ativo",
    tipo: "switch",
  },
];
