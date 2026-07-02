import { Data } from "@/components/Data.jsx";
import { IconCore } from "@/components/IconCore.jsx";
import { ButtonIconCore } from "@/components/ButtonIconCore.jsx";

export const CUSTOMER_COLUNAS = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Sobrenome',
    dataIndex: 'surname',
    key: 'surname',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Data de Nascimento',
    dataIndex: 'birthDate',
    key: 'birthDate',
    render: (valor) => <Data valor={valor} />
  },
  {
    title: "Ações",
    key: "acoes",
    render: (text, record) => (
      <div style={{ display: "flex", gap: "8px" }}>
        <ButtonIconCore title={"Editar"} type={"primary"} icon="fa FaEdit" />
        <ButtonIconCore title={"Ativar"} color={"green"} variant="solid" icon="gr GrLike" />
        <ButtonIconCore title={"Inativar"} type={"primary"} danger icon="gr GrDislike" />
      </div>
    ),
  }
];

export const CUSTOMER_CAMPOS = [
  {
    key: 'nome',
    label: 'Nome',
    tipo: 'input',
    propriedades: { placeholder: 'Digite seu nome' },
  },
  {
    key: 'sobreNome',
    label: 'Sobre nome',
    tipo: 'input',
  }
];

export const CUSTOMER_CAMPOS_MODAL = [
  {
    key: 'name',
    label: 'Nome',
    tipo: 'input',
    obrigatorio: true,
    propriedades: { placeholder: 'Digite seu nome' },
  },
  {
    key: 'surname',
    label: 'Sobre nome',
    tipo: 'input',
    obrigatorio: true,
    propriedades: { placeholder: 'Digite seu sobre nome' },
  },
  {
    key: 'email',
    label: 'E-mail',
    tipo: 'input',
    obrigatorio: true,
    propriedades: { placeholder: 'Digite seu e-mail' },
  },
  {
    key: 'birthDate',
    label: 'Data de Nascimento',
    tipo: 'datepicker',
    propriedades: { format: 'DD/MM/YYYY'}
  }
];