import { Pagina } from "@/components/Layout/Pagina.jsx";
import { Col, Row } from "antd";
import { FiltroCollapse } from "@/components/FiltroCollapse.jsx";
import { Tabela } from "@/components/Tabela.jsx";
import { Paginacao } from "@/components/Paginacao.jsx";
import { FILTRO_INICIAL } from "@/constants/constUtils.js";
import { ButtonIconCore } from "@/components/core/ButtonIconCore.jsx";
import { RenderizaCaso } from "@/components/RenderizaCaso.jsx";
import { modalFuncaoConfirmacao } from "@/components/core/ModalFuncaoCore.jsx";
import { useEffect, useState } from "react";
import productService from "@/services/productService.js";
import { CURRENCY_CAMPOS, CURRENCY_COLUNAS } from "@/pages/currency/constants/currencyContants.js";

export function CurrencyPage() {
  const [resultado, setResultado] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [paginacao, setPaginacao] = useState({});
  const [filtro, setFiltro] = useState({});

  useEffect(() => {
    aoPesquisar(FILTRO_INICIAL);
  }, []);

  async function aoPesquisar(filtros) {
    try {
      setFiltro(filtros);
      setCarregando(true);

      const resposta = await productService.listar({ ...FILTRO_INICIAL, ...filtros });

      setResultado(resposta?.data?.content);
      setPaginacao({
        currentPage: resposta?.data?.number + 1,
        total: resposta?.data?.totalElements,
        size: resposta?.data?.size,
      });
    } catch (e) {
      console.error("Erro ao listar clientes", e);
    } finally {
      setCarregando(false);
    }
  }

  async function aoMudarPagina(pagina) {
    const paginaAtual = pagina - 1;
    await aoPesquisar({ ...filtro, page: paginaAtual });
  }

  const COLUNA_ACOES = [
    {
      title: "Ações",
      key: "acoes",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <ButtonIconCore title={"Editar"} type={"primary"} icon="fa FaEdit" onClick={() => aoEditar(record)} />
          <RenderizaCaso caso={!record.active}>
            <ButtonIconCore
              title={"Ativar"}
              color={"green"}
              variant="solid"
              icon="gr GrLike"
              onClick={() =>
                modalFuncaoConfirmacao({
                  title: "Ativar Cliente",
                  content: "Tem certeza que deseja ativar este cliente?",
                  onOk: () => aoAtivar(record.id),
                })
              }
            />
          </RenderizaCaso>
          <RenderizaCaso caso={record.active}>
            <ButtonIconCore
              title={"Inativar"}
              type={"primary"}
              danger
              icon="gr GrDislike"
              onClick={() =>
                modalFuncaoConfirmacao({
                  title: "Inativar Cliente",
                  content: "Tem certeza que deseja inativar este cliente?",
                  onOk: () => aoInativar(record.id),
                })
              }
            />
          </RenderizaCaso>
        </div>
      ),
    },
  ];

  return (
    <Pagina titulo="Pesquisa de Cotações">
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <FiltroCollapse campos={CURRENCY_CAMPOS} aoPesquisar={aoPesquisar} filtroInicial={FILTRO_INICIAL} />
        </Col>
        <Col span={24}>
          <Tabela dados={resultado} loading={carregando} colunas={CURRENCY_COLUNAS} />
        </Col>
        <Col span={24}>
          <Paginacao paginacao={paginacao} aoMudarPagina={aoMudarPagina} />
        </Col>
      </Row>
    </Pagina>
  );
}
