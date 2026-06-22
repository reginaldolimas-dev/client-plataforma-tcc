import { Collapse } from "antd";
import { Formulario } from "./Formulario/Formulario";

export function FiltroCollapse({ campos = [], aoLimparFiltros, aoPesquisar, filtroInicial = {} }) {
    return (
        <Collapse defaultActiveKey={"0"}>
            <Collapse.Panel header={"Filtros"} key={"0"}>
                <Formulario
                    botaoEnviarProps={{
                        texto: "Pesquisar",
                        icone: "search",
                        type: "default",
                    }}
                    botaoLimparProps={{
                        texto: "Redefinir",
                        icone: "reload",
                        type: "danger",
                    }}
                    campos={campos}
                    aoLimpar={aoLimparFiltros}
                    aoEnviar={aoPesquisar}
                    valoresIniciais={filtroInicial}
                />
            </Collapse.Panel>
        </Collapse>
    );
}
