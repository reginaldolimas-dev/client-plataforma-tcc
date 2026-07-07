import { productApi } from "@/services/apiFactory.js";

async function listar(params) {
  const response = await productApi.get("/products", { params });
  return response.data;
}

async function criar(dados) {
  const response = await productApi.post("/products", dados);
  return response.data;
}

async function inativar(id) {
  const response = await productApi.delete(`/products/${id}`);
  return response.data;
}

async function update(id, params) {
  const response = await productApi.put(`/products/${id}`, params);
  return response.data;
}

const customerService = { listar, criar, inativar, update };

export default customerService;
