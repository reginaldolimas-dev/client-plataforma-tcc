import { Pagina } from "@/components/Layout/Pagina.jsx";
import { Button, Col, message, Row } from "antd";
import { FiltroCollapse } from "@/components/FiltroCollapse.jsx";
import { Tabela } from "@/components/Tabela.jsx";
import { Paginacao } from "@/components/Paginacao.jsx";
import { PRODUCT_CAMPOS, PRODUCT_COLUNAS } from "@/pages/product/constants/productContants.jsx";
import { FILTRO_INICIAL } from "@/constants/constUtils.js";
import { ButtonIconCore } from "@/components/core/ButtonIconCore.jsx";
import { RenderizaCaso } from "@/components/RenderizaCaso.jsx";
import { modalFuncaoConfirmacao } from "@/components/core/ModalFuncaoCore.jsx";
import { useEffect, useState } from "react";
import productService from "@/services/productService.js";
import { ProductModal } from "@/pages/product/components/ProductModal.jsx";

export function ProductPage() {
  const [resultado, setResultado] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [paginacao, setPaginacao] = useState({});
  const [filtro, setFiltro] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [registro, setRegistro] = useState({});

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

  function aoFechar() {
    setModalVisible(false);
    setRegistro({});
    aoPesquisar(filtro);
  }

  function recarregar() {
    aoPesquisar(filtro);
  }

  function aoEditar(produto) {
    setRegistro(produto);
    setModalVisible(true);
  }

  async function aoInativar(produtoId) {
    try {
      setCarregando(true);
      await productService.inativar(produtoId);
      message.success("Produto inativado com sucesso!");
      recarregar();
    } catch (e) {
      console.error("Erro ao inativar cliente", e);
    } finally {
      setCarregando(false);
    }
  }

  async function aoAtivar(produtoId) {
    try {
      await productService.update(produtoId, { active: true });
      message.success("Produto ativado com sucesso!");
      recarregar();
    } catch (e) {
      console.error("Erro ao ativar cliente", e);
    } finally {
    }
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
    <Pagina
      titulo="Pesquisa de Produtos"
      acoes={
        <Button onClick={() => setModalVisible(true)} type={"primary"}>
          Novo Produto
        </Button>
      }
    >
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <FiltroCollapse campos={PRODUCT_CAMPOS} aoPesquisar={aoPesquisar} filtroInicial={FILTRO_INICIAL} />
        </Col>
        <Col span={24}>
          <Tabela dados={resultado} loading={carregando} colunas={[...PRODUCT_COLUNAS, ...COLUNA_ACOES]} />
        </Col>
        <Col span={24}>
          <Paginacao paginacao={paginacao} aoMudarPagina={aoMudarPagina} />
        </Col>
      </Row>
      <ProductModal visivel={isModalVisible} aoFechar={aoFechar} aoSucesso={recarregar} registro={registro} />
    </Pagina>
  );
}
