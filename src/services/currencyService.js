import { currencyApi } from "@/services/apiFactory.js";

async function listar(params) {
  const response = await currencyApi.get("/currencies", { params });
  return response.data;
}

async function criar(dados) {
  const response = await currencyApi.post("/currencies", dados);
  return response.data;
}

const customerService = { listar, criar };

export default customerService;
