import { useState, useEffect, useCallback } from 'react';
import customerService from '@/services/customerService';

function useCustomer(filtrosIniciais = {}) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [filtros, setFiltros] = useState(filtrosIniciais);

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const resultado = await customerService.listar(filtros);
      setDados(resultado.content);
    } catch (e) {
      const mensagemErro = e.response?.data?.message || e.message || 'Erro ao carregar dados';
      setErro(mensagemErro);
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { dados, loading, erro, recarregar: carregar, setFiltros };
}

export default useCustomer;
