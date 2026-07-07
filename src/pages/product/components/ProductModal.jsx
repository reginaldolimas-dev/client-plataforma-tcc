import { Formulario } from "@/components/Formulario/Formulario.jsx";
import { message } from "antd";
import { useState } from "react";
import { ModalCore } from "@/components/core/ModalCore.jsx";
import { PRODUCT_CAMPOS_MODAL } from "@/pages/product/constants/productContants.jsx";
import productService from "@/services/productService.js";

export function ProductModal({ visivel, aoFechar, aoSucesso, registro, aoLimpar }) {
  const [carregando, setCarregando] = useState(false);

  const isEdit = !!registro?.id;

  async function aoEnviar(valores) {
    try {
      setCarregando(true);
      if (isEdit) {
        await productService.update(registro?.id, valores);
      } else {
        await productService.criar(valores);
      }

      message.success(isEdit ? "Produto atualizado com sucesso!" : "Produto criado com sucesso!");

      aoSucesso?.();
      aoFechar();
    } catch (e) {
      console.error("Erro ao salvar cliente", e);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ModalCore
      visible={visivel}
      titulo={registro?.id ? "Editar Produto" : "Novo Produto"}
      onClose={aoFechar}
      exibirFooter={null}
    >
      <Formulario
        campos={PRODUCT_CAMPOS_MODAL}
        aoEnviar={aoEnviar}
        carregando={carregando}
        valoresIniciais={registro || { active: true }}
        aoLimpar={aoLimpar}
        desabilitarBotaoLimpar={isEdit}
      />
    </ModalCore>
  );
}
