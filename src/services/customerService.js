import { customerApi } from "@/services/apiFactory.js";

async function listar(params) {
  const response = await customerApi.get("/customers", { params });
  return response.data;
}

async function criar(dados) {
  const response = await customerApi.post("/customers", dados);
  return response.data;
}

async function inativar(id) {
  const response = await customerApi.delete(`/customers/${id}`);
  return response.data;
}

async function update(id, params) {
  const response = await customerApi.put(`/customers/${id}`, params);
}

async function contagem() {
  const response = await customerApi.get("/customers/count");
  return response.data;
}

const customerService = { listar, criar, inativar, update, contagem };

export default customerService;
