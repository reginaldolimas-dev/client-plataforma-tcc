import { Collapse } from "antd";
import { Formulario } from "./Formulario/Formulario";
import { IconReloadInvertido } from "@/components/IconReloadInvertido.jsx";

export function FiltroCollapse({ campos = [], aoLimparFiltros, aoPesquisar, filtroInicial = {} }) {
  const items = [
    {
      key: "0",
      label: "Filtros",
      children: (
        <Formulario
          botaoEnviarProps={{
            texto: "Pesquisar",
            icone: "search",
            type: "default",
          }}
          botaoLimparProps={{
            texto: "Redefinir",
            icone: <IconReloadInvertido />,
            type: "danger",
          }}
          campos={campos}
          aoLimpar={aoLimparFiltros}
          aoEnviar={aoPesquisar}
          valoresIniciais={filtroInicial}
        />
      ),
    },
  ];
  return <Collapse defaultActiveKey={"0"} items={items} />;
}
