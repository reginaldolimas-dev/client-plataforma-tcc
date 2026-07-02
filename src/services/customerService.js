import api from '@/services/api';

async function listar(params) {
  const response = await api.get('/customers', { params });
  return response.data;
}

async function criar(dados) {
  const response = await api.post('/customers', dados);
  return response.data;
}

const customerService = { listar, criar };

export default customerService;
