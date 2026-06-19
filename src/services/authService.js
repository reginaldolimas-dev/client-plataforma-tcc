import api from '@/services/api';

async function login(credenciais) {
  try {
    const response = await api.post('/auth/login', credenciais);
    return response.data;
  } catch (error) {
    console.warn('API offline. Usando login de demonstração (mock) para fins de homologação.');
    throw error;
  }
}

async function logout() {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.warn('Não foi possível registrar o logout na API, limpando estado local.');
  }
}

const authService = { login, logout };

export default authService;
