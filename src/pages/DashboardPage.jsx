import { Col, Row, Typography } from "antd";
import CardEstatistica from "@/components/CardEstatistica";
import { SolutionOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function DashboardPage() {
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
            valor={1248}
            icone={<UserOutlined style={{ fontSize: 24, color: "#1890ff" }} />}
            cor="#1890ff"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <CardEstatistica
            titulo="Produtos Cadastrados"
            valor={78}
            icone={<SolutionOutlined style={{ fontSize: 24, color: "#52c41a" }} />}
            cor="#52c41a"
          />
        </Col>
      </Row>
    </div>
  );
}

export default DashboardPage;
