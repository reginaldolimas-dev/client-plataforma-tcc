const MOEDAS = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "BRL", label: "BRL" },
  { value: "CNY", label: "CNY" },
  { value: "GBP", label: "GBP" },
];

export const CURRENCY_CAMPOS = [
  {
    key: "code",
    label: "Código",
    tipo: "select",
    propriedades: { placeholder: "Selecione a moeda", options: MOEDAS },
  },
];

export const CURRENCY_COLUNAS = [
  {
    title: "Código",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Valor",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "Atualizado em",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
];
