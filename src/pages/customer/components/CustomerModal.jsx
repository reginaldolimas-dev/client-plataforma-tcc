import { ModalCore } from "@/components/ModalCore.jsx";
import { Formulario } from "@/components/Formulario/Formulario.jsx";

export function CustomerModal({visivel, aoFechar}) {

  const CAMPOS = [
    {
      key: 'name',
      label: 'Nome',
      tipo: 'input',
      obrigatorio: true,
      propriedades: { placeholder: 'Digite seu nome' },
    },
    {
      key: 'surname',
      label: 'Sobre nome',
      tipo: 'input',
      obrigatorio: true,
      propriedades: { placeholder: 'Digite seu sobre nome' },
    },
    {
      key: 'email',
      label: 'E-mail',
      tipo: 'input',
      obrigatorio: true,
      propriedades: { placeholder: 'Digite seu sobre nome' },
    },
    {
      key: 'birthdate',
      label: 'Data de Nascimento',
      tipo: 'datepicker',
      propriedades: { format: 'DD/MM/YYYY'}
    }
  ]

  return (
    <ModalCore titulo="Novo Cliente" visible={visivel} onClose={aoFechar} exibirFooter={null}>
      <Formulario campos={CAMPOS} />
    </ModalCore>
  )
}