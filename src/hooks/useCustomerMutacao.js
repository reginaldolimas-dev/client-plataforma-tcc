import { useState } from 'react';
import customerService from '@/services/customerService';

function useCustomerMutacao() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  async function criar(dados) {
    setLoading(true);
    setErro(null);
    try {
      return await customerService.criar(dados);
    } catch (e) {
      const mensagemErro = e.response?.data?.message || e.message || 'Erro ao salvar cliente';
      setErro(mensagemErro);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { criar, loading, erro };
}

export default useCustomerMutacao;
