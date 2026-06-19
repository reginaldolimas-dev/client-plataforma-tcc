import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Card, Form, Input, message, Typography} from 'antd';
import {BookOutlined, LockOutlined, UserOutlined} from '@ant-design/icons';
import useAuth from '@/hooks/useAuth';

const { Title, Text } = Typography;

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(valores) {
    setLoading(true);
    try {
      await login(valores);
      message.success('Bem-vindo ao Portal de Gestão Escolar!');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      message.error('Erro ao autenticar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
      padding: '20px'
    }}>
      <Card
        style={{
          width: 400,
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: '#e6f7ff',
            color: '#1890ff',
            fontSize: '28px',
            marginBottom: '16px'
          }}>
            <BookOutlined />
          </div>
          <Title level={3} style={{ margin: 0, color: '#262626' }}>
            Plataforma - TCC
          </Title>
          <Text type="secondary">Entre com suas credenciais de acesso</Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit} requiredMark={false}>
          <Form.Item
            label="Usuário"
            name="usuarioLogin"
            rules={[
              { required: true, message: 'Por favor, insira seu usuário!' }
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              size="large"
              placeholder="seu usuário"
            />
          </Form.Item>
          
          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              size="large"
              placeholder="Sua senha"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 8, marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              style={{
                height: '45px',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Entrar no Sistema
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Dica: Entre com usuário: aluno e senha: aluno para testar o sistema.
          </Text>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
