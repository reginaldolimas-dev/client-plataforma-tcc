import {Empty, Table} from "antd";
import {isArray, isDate, isObject} from "lodash";
import moment from "moment";
import {Data} from "@/components/Data.jsx";

export const Tabela = ({
                           total,
                           dados,
                           scroll,
                           colunas,
                           loading,
                           cabecalho,
                           paginacao,
                           expandedRowRender,
                           textoEntidadeVazia,
                           funcaoPesquisa = () => {},
                           ...props
                       }) => {
    let showTotal = (total) => {
        return `Total de Registros: ${total}`;
    };

    function checarPaginacao() {
        if (paginacao) {
            return {
                showTotal,
                size: "small",
                responsive: false,
                showSizeChanger: true,
                ...paginacao,
            };
        }

        return false;
    }

    function limparColunas(colunas) {
        const colunasFiltradas = colunas?.filter(
            (coluna) => typeof coluna === "object" && coluna?.key && !coluna?.esconder
        );
        return colunasFiltradas;
    }

    const gerarValorPorTipo = (valor) => {
        if (isDate(valor) || moment.isMoment(valor)) {
            return <Data valor={valor} />;
        }

        if (isObject(valor)) {
            return JSON.stringify(valor);
        }

        return valor;
    };

    const gerarColunasDinamicamente = (dados) => {
        if (isArray(dados) && dados.length > 0) {
            const objetoExemplo = dados[0];

            return Object.keys(objetoExemplo).map((chave) => ({
                title: chave,
                dataIndex: chave,
                key: chave,
                render: (valor) => gerarValorPorTipo(valor),
            }));
        }
        return [];
    };

    const colunasTabela = colunas || gerarColunasDinamicamente(dados);

    return (
        <Table
            total={total}
            title={cabecalho}
            loading={loading}
            columns={limparColunas(colunasTabela)}
            dataSource={dados}
            scroll={scroll}
            showTotal={showTotal}
            rowKey={({ id }) => id}
            onChange={funcaoPesquisa}
            expandedRowRender={expandedRowRender}
            locale={{ emptyText: <Empty description={textoEntidadeVazia} /> }}
            pagination={checarPaginacao()}
            {...props}
        />
    );
};
