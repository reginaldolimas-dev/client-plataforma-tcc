import { FiltroCollapse } from "@/components/FiltroCollapse.jsx";
import { Tabela } from "@/components/Tabela.jsx";
import { Button, Col, message, Row } from "antd";
import { Pagina } from "@/components/Layout/Pagina.jsx";
import { CustomerModal } from "@/pages/customer/components/CustomerModal.jsx";
import { useEffect, useState } from "react";
import { CUSTOMER_CAMPOS, CUSTOMER_COLUNAS } from "@/pages/customer/constants/customerConstants.jsx";
import customerService from "@/services/customerService.js";
import { RenderizaCaso } from "@/components/RenderizaCaso.jsx";
import { modalFuncaoConfirmacao } from "@/components/core/ModalFuncaoCore.jsx";
import { Paginacao } from "@/components/Paginacao.jsx";
import { ButtonIconCore } from "@/components/core/ButtonIconCore.jsx";

function CustomerPage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState([]);
  const [registro, setRegistro] = useState({});
  const [paginacao, setPaginacao] = useState({});
  const [filtro, setFiltro] = useState({});

  useEffect(() => {
    aoPesquisar({});
  }, []);

  async function aoPesquisar(filtros) {
    try {
      setFiltro(filtros);
      setCarregando(true);

      const resposta = await customerService.listar({ ...filtroInicial, ...filtros });

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

  function recarregar() {
    aoPesquisar(filtroInicial);
    setRegistro({});
  }

  function aoFechar() {
    setModalVisible(false);
    setRegistro(null);
  }

  async function aoInativar(clienteId) {
    try {
      setCarregando(true);
      await customerService.inativar(clienteId);
      message.success("Cliente inativado com sucesso!");
      recarregar();
    } catch (e) {
      console.error("Erro ao inativar cliente", e);
    } finally {
      setCarregando(false);
    }
  }

  async function aoAtivar(clienteId) {
    try {
      await customerService.update(clienteId, { active: true });
      message.success("Cliente ativado com sucesso!");
      recarregar();
    } catch (e) {
      console.error("Erro ao ativar cliente", e);
    } finally {
      setCarregando(false);
    }
  }

  function aoEditar(cliente) {
    setRegistro(cliente);
    setModalVisible(true);
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

  const filtroInicial = {
    active: true,
    page: 0,
    size: 10,
  };

  async function aoMudarPagina(pagina) {
    const paginaAtual = pagina - 1;
    await aoPesquisar({ ...filtroInicial, ...filtro, page: paginaAtual });
  }

  return (
    <Pagina
      titulo="Pesquisa de Clientes"
      acoes={
        <Button onClick={() => setModalVisible(true)} type={"primary"}>
          Novo Cliente
        </Button>
      }
    >
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <FiltroCollapse campos={CUSTOMER_CAMPOS} aoPesquisar={aoPesquisar} filtroInicial={filtroInicial} />
        </Col>
        <Col span={24}>
          <Tabela dados={resultado} loading={carregando} colunas={[...CUSTOMER_COLUNAS, ...COLUNA_ACOES]} />
        </Col>
        <Col span={24}>
          <Paginacao paginacao={paginacao} aoMudarPagina={aoMudarPagina} />
        </Col>
      </Row>
      <CustomerModal visivel={isModalVisible} aoFechar={aoFechar} aoSucesso={recarregar} registro={registro} />
    </Pagina>
  );
}

export default CustomerPage;
