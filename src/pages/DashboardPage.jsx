import { Row, Col, Typography, Card, Table, Tag, Progress, Timeline } from 'antd';
import CardEstatistica from '@/components/CardEstatistica';
import {
  UserOutlined,
  BookOutlined,
  SolutionOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const colunasMatriculas = [
  {
    title: 'Estudante',
    dataIndex: 'nome',
    key: 'nome',
    render: (texto) => <a>{texto}</a>,
  },
  {
    title: 'Série/Ano',
    dataIndex: 'serie',
    key: 'serie',
  },
  {
    title: 'Turma',
    dataIndex: 'turma',
    key: 'turma',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let cor = status === 'Ativo' ? 'success' : 'warning';
      return <Tag color={cor}>{status}</Tag>;
    },
  },
];

const dadosMatriculas = [
  {
    key: '1',
    nome: 'Ana Clara Silva',
    serie: '9º Ano EF',
    turma: 'Turma A - Matutino',
    status: 'Ativo',
  },
  {
    key: '2',
    nome: 'João Pedro Santos',
    serie: '1º Ano EM',
    turma: 'Turma B - Vespertino',
    status: 'Ativo',
  },
  {
    key: '3',
    nome: 'Mariana Costa',
    serie: '8º Ano EF',
    turma: 'Turma C - Matutino',
    status: 'Ativo',
  },
  {
    key: '4',
    nome: 'Pedro Henrique Souza',
    serie: '3º Ano EM',
    turma: 'Turma A - Integral',
    status: 'Ativo',
  },
];

function DashboardPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>Dashboard Escolar</Title>
        <Text type="secondary">Resumo administrativo do ano letivo de 2026</Text>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <CardEstatistica
            titulo="Alunos Matriculados"
            valor={1248}
            icone={<UserOutlined style={{ fontSize: 24, color: '#1890ff' }} />}
            cor="#1890ff"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <CardEstatistica
            titulo="Professores Ativos"
            valor={78}
            icone={<SolutionOutlined style={{ fontSize: 24, color: '#52c41a' }} />}
            cor="#52c41a"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <CardEstatistica
            titulo="Turmas Ativas"
            valor={32}
            icone={<BookOutlined style={{ fontSize: 24, color: '#722ed1' }} />}
            cor="#722ed1"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <CardEstatistica
            titulo="Média de Frequência"
            valor="94.2%"
            icone={<CheckCircleOutlined style={{ fontSize: 24, color: '#fa8c16' }} />}
            cor="#fa8c16"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Novas Matrículas Realizadas" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Table
              columns={colunasMatriculas}
              dataSource={dadosMatriculas}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Card title="Capacidade das Salas" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text>Ensino Fundamental</Text>
                    <Text strong>82%</Text>
                  </div>
                  <Progress percent={82} status="active" strokeColor="#1890ff" showInfo={false} />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text>Ensino Médio</Text>
                    <Text strong>91%</Text>
                  </div>
                  <Progress percent={91} status="active" strokeColor="#52c41a" showInfo={false} />
                </div>
              </Card>
            </Col>
            
            <Col span={24}>
              <Card title="Próximos Eventos" bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <Timeline
                  items={[
                    {
                      color: 'green',
                      children: 'Reunião de Pais e Mestres - 20/Jun',
                    },
                    {
                      color: 'blue',
                      children: 'Início das Provas do 2º Trimestre - 25/Jun',
                    },
                    {
                      color: 'gray',
                      children: 'Conselho de Classe - 05/Jul',
                    },
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardPage;
