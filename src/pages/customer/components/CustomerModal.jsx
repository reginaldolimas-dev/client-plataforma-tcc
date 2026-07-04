import { Formulario } from "@/components/Formulario/Formulario.jsx";
import { message } from "antd";
import { CUSTOMER_CAMPOS_MODAL } from "@/pages/customer/constants/customerConstants.jsx";
import customerService from "@/services/customerService.js";
import { useState } from "react";
import { ModalCore } from "@/components/core/ModalCore.jsx";

export function CustomerModal({ visivel, aoFechar, aoSucesso, registro, aoLimpar }) {
  const [carregando, setCarregando] = useState(false);

  const isEdit = !!registro?.id;

  async function aoEnviar(valores) {
    try {
      setCarregando(true);
      if (isEdit) {
        await customerService.update(registro?.id, valores);
      } else {
        await customerService.criar(valores);
      }

      message.success(isEdit ? "Cliente atualizado com sucesso!" : "Cliente criado com sucesso!");

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
      titulo={registro?.id ? "Editar Cliente" : "Novo Cliente"}
      onClose={aoFechar}
      exibirFooter={null}
    >
      <Formulario
        campos={CUSTOMER_CAMPOS_MODAL}
        aoEnviar={aoEnviar}
        carregando={carregando}
        valoresIniciais={registro || { active: true }}
        aoLimpar={aoLimpar}
        desabilitarBotaoLimpar={isEdit}
      />
    </ModalCore>
  );
}
