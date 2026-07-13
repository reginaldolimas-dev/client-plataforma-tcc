import { Pagina } from "@/components/Layout/Pagina.jsx";
import { Col, Row } from "antd";
import { FiltroCollapse } from "@/components/FiltroCollapse.jsx";
import { Tabela } from "@/components/Tabela.jsx";
import { useEffect, useState } from "react";
import { CURRENCY_CAMPOS, CURRENCY_COLUNAS } from "@/pages/currency/constants/currencyContants.jsx";
import currencyService from "@/services/currencyService.js";

export function CurrencyPage() {
  const [resultado, setResultado] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    aoPesquisar();
  }, []);

  async function aoPesquisar(filtro) {
    try {
      setCarregando(true);
      const resposta = await currencyService.listar(filtro);
      setResultado(resposta);
    } catch (e) {
      console.error("Erro ao listar clientes", e);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Pagina titulo="Pesquisa de Cotações">
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <FiltroCollapse campos={CURRENCY_CAMPOS} aoPesquisar={aoPesquisar} />
        </Col>
        <Col span={24}>
          <Tabela dados={resultado} loading={carregando} colunas={CURRENCY_COLUNAS} />
        </Col>
      </Row>
    </Pagina>
  );
}
