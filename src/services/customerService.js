import api from "@/services/api";

async function listar(params) {
  const response = await api.get("/customers", { params });
  return response.data;
}

async function criar(dados) {
  const response = await api.post("/customers", dados);
  return response.data;
}

async function inativar(id) {
  const response = await api.delete(`/customers/${id}`);
  return response.data;
}

async function update(id, params) {
  const response = await api.put(`/customers/${id}`, params);
}

const customerService = { listar, criar, inativar, update };

export default customerService;
