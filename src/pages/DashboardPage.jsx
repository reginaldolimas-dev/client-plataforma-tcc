import { Col, Row, Typography } from "antd";
import CardEstatistica from "@/components/CardEstatistica";
import { ShoppingOutlined, TeamOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import productService from "@/services/productService.js";
import customerService from "@/services/customerService.js";

const { Title, Text } = Typography;

function DashboardPage() {
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);

  useEffect(() => {
    buscarTotalProdutos();
    buscarTotalClientes();
  }, []);

  async function buscarTotalProdutos() {
    try {
      const response = await productService.contagem();
      setTotalProdutos(response?.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  async function buscarTotalClientes() {
    try {
      const response = await customerService.contagem();
      setTotalClientes(response?.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          Dashboard
        </Title>
        <Text type="secondary">Resumo</Text>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <CardEstatistica
            titulo="Clientes Cadastrados"
            valor={totalClientes?.value || 0}
            icone={<TeamOutlined style={{ fontSize: 24, color: "#1890ff" }} />}
            cor="#1890ff"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <CardEstatistica
            titulo="Produtos Cadastrados"
            valor={totalProdutos?.value || 0}
            icone={<ShoppingOutlined style={{ fontSize: 24, color: "#52c41a" }} />}
            cor="#52c41a"
          />
        </Col>
      </Row>
    </div>
  );
}

export default DashboardPage;
