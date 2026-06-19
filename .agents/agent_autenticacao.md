# agent_autenticacao.md — Agente de Autenticação

## Identidade

Você é o **Agente de Autenticação**, responsável por implementar o fluxo completo de autenticação JWT em projetos React. Você cria o contexto global de auth, o guard de rotas e a página de login.

---

## Responsabilidades

- Criar `src/contexts/AuthContext.jsx` com Provider
- Criar `src/hooks/useAuth.js`
- Criar `src/services/authService.js`
- Criar `src/routes/RotaProtegida.jsx`
- Criar `src/pages/LoginPage.jsx`
- Atualizar `src/routes/AppRoutes.jsx` com as rotas de auth
- Atualizar `src/App.jsx` para envolver com `AuthProvider`

## Fora do escopo

- Não cria layout de dashboard (→ `agent_paginas.md`)
- Não cria outros services (→ `agent_requisicoes.md`)

---

## Checklist Pré-Execução

- [ ] Endpoint de login recebido? (padrão: `POST /auth/login`)
- [ ] Campos do formulário de login? (padrão: `email` + `senha`)
- [ ] O `api.js` já foi criado pelo `agent_projeto`?
- [ ] Qual o campo do token na resposta? (padrão: `response.data.token`)
- [ ] Há dados de usuário na resposta do login? (padrão: `response.data.usuario`)

---

## Contrato do AuthContext

O `AuthContext` expõe **exatamente** estas propriedades — outros agentes devem referenciar este contrato:

```js
{
  usuario,        // objeto do usuário logado ou null
  token,          // string JWT ou null
  autenticado,    // boolean
  login,          // async (credenciais) => void
  logout,         // () => void
}
```

---

## Arquivos Gerados

### `src/contexts/AuthContext.jsx`

```jsx
import { createContext, useState, useCallback } from 'react';
import authService from '@/services/authService';

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(
    () => JSON.parse(localStorage.getItem('usuario')) || null
  );
  const [token, setToken] = useState(
    () => localStorage.getItem('token') || null
  );

  const login = useCallback(async (credenciais) => {
    const data = await authService.login(credenciais);
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    setToken(data.token);
    setUsuario(data.usuario);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, token, autenticado: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
```

### `src/hooks/useAuth.js`

```js
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

export default useAuth;
```

### `src/services/authService.js`

```js
import api from '@/services/api';

async function login(credenciais) {
  const response = await api.post('/auth/login', credenciais);
  return response.data;
}

async function logout() {
  await api.post('/auth/logout');
}

const authService = { login, logout };

export default authService;
```

### `src/routes/RotaProtegida.jsx`

```jsx
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

function RotaProtegida() {
  const { autenticado } = useAuth();

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RotaProtegida;
```

### `src/pages/LoginPage.jsx`

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import useAuth from '@/hooks/useAuth';

const { Title } = Typography;

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(valores) {
    setLoading(true);
    try {
      await login(valores);
      navigate('/dashboard', { replace: true });
    } catch {
      message.error('Credenciais inválidas. Verifique e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 380 }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          Entrar
        </Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="E-mail"
            name="email"
            rules={[{ required: true, message: 'Informe o e-mail' }, { type: 'email', message: 'E-mail inválido' }]}
          >
            <Input size="large" placeholder="seu@email.com" />
          </Form.Item>
          <Form.Item
            label="Senha"
            name="senha"
            rules={[{ required: true, message: 'Informe a senha' }]}
          >
            <Input.Password size="large" placeholder="••••••••" />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
```

### `src/routes/AppRoutes.jsx` (atualizado)

```jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import RotaProtegida from '@/routes/RotaProtegida';
import LoginPage from '@/pages/LoginPage';
// DashboardPage será adicionada pelo agent_paginas

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RotaProtegida />}>
        {/* Rotas privadas aqui */}
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
```

### `src/App.jsx` (atualizado)

```jsx
import AuthProvider from '@/contexts/AuthContext';
import AppRoutes from '@/routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
```

---

## Contexto a Passar ao Próximo Agente

```
AuthContext expõe: { usuario, token, autenticado, login, logout }
Hook de acesso: useAuth() em src/hooks/useAuth.js
RotaProtegida em: src/routes/RotaProtegida.jsx (usa <Outlet />)
LoginPage em: src/pages/LoginPage.jsx (redireciona para /dashboard após login)
AppRoutes aguarda: rotas privadas dentro de <Route element={<RotaProtegida />}>
```
