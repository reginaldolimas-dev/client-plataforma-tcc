import { Pagina } from "@/components/Layout/Pagina.jsx";
import { Button, Col, Row } from "antd";
import { FiltroCollapse } from "@/components/FiltroCollapse.jsx";
import { FILTRO_INICIAL } from "@/constants/constUtils.js";
import { Tabela } from "@/components/Tabela.jsx";
import { Paginacao } from "@/components/Paginacao.jsx";
import { SALE_CAMPOS, SALE_COLUNAS } from "@/pages/sale/constants/saleConstants.js";

function SalePage() {
  function aoPesquisar(filtros) {
    return [];
  }
  return (
    <Pagina
      titulo="Pesquisa de Vendas"
      acoes={
        <Button onClick={() => console.log(true)} type={"primary"}>
          Nova Venda
        </Button>
      }
    >
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <FiltroCollapse campos={SALE_CAMPOS} aoPesquisar={aoPesquisar} filtroInicial={FILTRO_INICIAL} />
        </Col>
        <Col span={24}>
          <Tabela dados={[]} colunas={SALE_COLUNAS} />
        </Col>
        <Col span={24}>
          <Paginacao />
        </Col>
      </Row>
    </Pagina>
  );
}
export default SalePage;
