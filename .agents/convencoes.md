# Convenções do Projeto Frontend

## Stack

- **Framework:** React 18 (JSX, sem TypeScript)
- **Bundler:** Vite
- **UI:** Ant Design (antd)
- **Roteamento:** React Router DOM v6
- **Requisições:** Axios com hooks customizados
- **Estado global:** Context API
- **Autenticação:** JWT armazenado no localStorage

---

## Estrutura de Pastas

```
src/
├── components/        # Componentes reutilizáveis (sem lógica de negócio)
├── pages/             # Páginas associadas a rotas
├── hooks/             # Hooks customizados (useAuth, useFetch, etc.)
├── services/          # Funções de chamada à API (axios)
├── contexts/          # Providers de Context API
├── routes/            # Definição de rotas e proteção
└── utils/             # Funções utilitárias puras
```

---

## Nomenclatura

| Artefato         | Padrão                          | Exemplo                        |
|------------------|---------------------------------|--------------------------------|
| Componente       | PascalCase, arquivo `.jsx`      | `BotaoSalvar.jsx`              |
| Página           | PascalCase, sufixo `Page`       | `LoginPage.jsx`                |
| Hook             | camelCase, prefixo `use`        | `useAuth.js`                   |
| Service          | camelCase, sufixo `Service`     | `authService.js`               |
| Context          | PascalCase, sufixo `Context`    | `AuthContext.jsx`              |
| Provider         | PascalCase, sufixo `Provider`   | `AuthProvider.jsx`             |
| Rota protegida   | Componente `RotaProtegida`      | `<RotaProtegida />`            |

---

## Componentes

- Sempre **função nomeada** (não arrow function no export default)
- Props desestruturadas na assinatura
- Ant Design como base: `Button`, `Form`, `Input`, `Layout`, `Menu`, `Card`, etc.
- Sem CSS-in-JS; usar `style` apenas para ajustes pontuais
- Arquivo de estilo separado quando necessário: `NomeComponente.css`

```jsx
// ✅ Correto
function BotaoSalvar({ label, onClick, loading }) {
  return (
    <Button type="primary" onClick={onClick} loading={loading}>
      {label}
    </Button>
  );
}

export default BotaoSalvar;
```

---

## Hooks Customizados

- Encapsulam lógica de requisição + estado (loading, error, data)
- Retornam objeto nomeado, nunca array (exceto quando imitar useState faz sentido)

```js
function useLogin() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  async function executar(credenciais) {
    setLoading(true);
    try {
      const data = await authService.login(credenciais);
      return data;
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { executar, loading, erro };
}
```

---

## Services (Axios)

- Instância centralizada em `src/services/api.js`
- Interceptor de request injeta o token JWT
- Interceptor de response trata 401 (logout automático)
- Cada domínio tem seu próprio service

```js
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

---

## Autenticação

- Token JWT salvo em `localStorage` com chave `'token'`
- Dados do usuário em `localStorage` com chave `'usuario'`
- `AuthContext` expõe: `usuario`, `token`, `login()`, `logout()`, `autenticado`
- `RotaProtegida` redireciona para `/login` se não autenticado

---

## Rotas

- Definidas em `src/routes/AppRoutes.jsx`
- Rotas públicas: `/login`
- Rotas privadas: envolvidas por `<RotaProtegida />`
- Rota padrão (`/`) redireciona para `/dashboard`

---

## Variáveis de Ambiente

- Prefixo obrigatório: `VITE_`
- Arquivo `.env.example` sempre presente no repositório
- Acesso via `import.meta.env.VITE_NOME_DA_VARIAVEL`
