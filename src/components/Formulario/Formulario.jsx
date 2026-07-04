import React, { forwardRef, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select, Spin, Switch, Upload } from "antd";
import { DeleteOutlined, EnterOutlined } from "@ant-design/icons";

const isFalsy = (val) => val == null || val === false || val === "" || val === 0;

const isTruthy = (val) => !isFalsy(val);

const pegarValorInicial = (campo, valoresIniciais) => {
  const valor = valoresIniciais && campo?.key in valoresIniciais ? valoresIniciais[campo.key] : campo?.valorInicial;

  if (!campo.formatarEntrada || valor == null || valor === "") return valor;

  return campo.formatarEntrada(valor);
};

const formatarValoresFinais = (campos, valores) => {
  const resultado = { ...valores };
  campos.forEach((campo) => {
    const key = campo.key;
    if (campo?.transformar) {
      resultado[key] = campo.transformar(resultado[key]);
    }
  });
  return resultado;
};

const determinarColunas = (campo, responsivo, colunasFixas) => {
  if (responsivo && campo?.colunas) {
    return campo.colunas;
  }
  if (colunasFixas) {
    return { span: colunasFixas };
  }
  return { span: 12 };
};

const gerarCampoObrigatorio = (label) => [
  {
    required: true,
    message: `${label || "Campo"} é obrigatório`,
  },
];

const checarRenderizacao = (campo) => {
  if (typeof campo?.renderizar === "function") {
    return campo.renderizar();
  }
  return true;
};

const pegarKeyPeloCampo = (campo) => campo?.key || Math.random().toString();

const FormularioDecorator = forwardRef(
  (
    {
      campos = [],
      valoresIniciais = {},
      aoEnviar,
      aoLimpar,
      carregando = false,
      apenasLeitura = false,
      colunas = 12,
      responsivo = true,
      limparAoEnviar = false,
      enviarTexto = "Enviar",
      limparTexto = "Limpar",
      desabilitarBotaoEnviar = false,
      desabilitarBotaoLimpar = false,
      exibirBotaoEnviar = true,
      exibirBotaoLimpar = true,
      form: formExterno,
      aoAtualizarValores,
      botaoLimparProps,
      botaoEnviarProps,
      ...rest
    },
    ref
  ) => {
    const [formInterno] = Form.useForm();
    const form = formExterno || formInterno;

    const [carregandoInterno, setCarregandoInterno] = useState(false);
    const carregandoFinal = carregando || carregandoInterno;

    const onSubmit = async (e) => {
      e?.preventDefault();
      e?.stopPropagation();

      try {
        const valores = await form.validateFields();
        const valoresFormatados = formatarValoresFinais(campos, valores);
        if (aoEnviar) {
          const resultado = aoEnviar(valoresFormatados);
          if (resultado && typeof resultado.then === "function") {
            setCarregandoInterno(true);
            await resultado;
            setCarregandoInterno(false);
          }
        }
        if (limparAoEnviar) {
          form.resetFields();
        }
      } catch (error) {
        console.warn("Erro na validação:", error);
      }
    };

    const onLimpar = () => {
      form.resetFields();
      if (aoLimpar) aoLimpar();
    };

    const handleKeyDown = (e) => {
      if (e.key !== "Enter") return;
      const tag = e.target?.tagName;
      if (tag === "TEXTAREA") return;
      e.preventDefault();
      onSubmit(e);
    };

    const handleValuesChange = (changedValues, allValues) => {
      campos.forEach((campo) => {
        if (!campo?.dependencias?.length) return;

        campo.dependencias.forEach((dependencia) => {
          const valorDependente = changedValues[dependencia.key];
          if (valorDependente === undefined) return;

          switch (dependencia.acao) {
            case "limpar":
              form.setFieldsValue({ [campo.key]: undefined });
              break;
            case "definir": {
              const regra = dependencia.valores?.find((v) => v.quando === valorDependente);
              if (regra) {
                form.setFieldsValue({ [campo.key]: regra.definirPara });
              }
              break;
            }
            default:
              break;
          }
        });
      });

      if (typeof aoAtualizarValores === "function") {
        const changed = formatarValoresFinais(campos, changedValues);
        const all = formatarValoresFinais(campos, allValues);
        aoAtualizarValores(changed, all);
      }
    };

    const renderizarCampo = (campo) => {
      const { key, label, tipo, propriedades = {}, obrigatorio = false, dependencias = [] } = campo;

      const regras = obrigatorio
        ? [...gerarCampoObrigatorio(label), ...(propriedades?.rules || [])]
        : propriedades?.rules || [];

      const initialValue = pegarValorInicial(campo, valoresIniciais);

      let valuePropName = "value";
      let getValueFromEvent = undefined;

      if (tipo === "switch") {
        valuePropName = "checked";
      } else if (tipo === "upload") {
        valuePropName = "fileList";
        getValueFromEvent = (e) => {
          if (Array.isArray(e)) return e;
          return e?.fileList;
        };
      }

      let componente;
      const commonProps = {
        disabled: apenasLeitura || propriedades?.disabled,
        placeholder: propriedades?.placeholder || `Selecione ${label}`,
        ...propriedades,
      };

      switch (tipo) {
        case "input":
          componente = <Input {...commonProps} />;
          break;
        case "textarea":
          componente = <Input.TextArea {...commonProps} />;
          break;
        case "select":
          componente = (
            <Select {...commonProps}>
              {propriedades?.options?.map((opt) => (
                <Select.Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select>
          );
          break;
        case "switch":
          componente = <Switch {...commonProps} />;
          break;
        case "datepicker":
          componente = <DatePicker {...commonProps} style={{ width: "100%" }} />;
          break;
        case "upload":
          componente = (
            <Upload
              {...commonProps}
              beforeUpload={() => false} // impede upload automático
              maxCount={1}
            >
              <Button>Selecionar arquivo</Button>
            </Upload>
          );
          break;
        default:
          componente = <Input {...commonProps} />;
      }

      return (
        <Form.Item
          key={key}
          name={key}
          label={label}
          initialValue={initialValue}
          rules={regras}
          valuePropName={valuePropName}
          getValueFromEvent={getValueFromEvent}
        >
          {componente}
        </Form.Item>
      );
    };

    return (
      <Form form={form} onKeyDown={handleKeyDown} onValuesChange={handleValuesChange} layout="vertical" {...rest}>
        <Spin spinning={carregandoFinal}>
          <Row gutter={[16, 16]}>
            {campos.map((campo) => {
              if (!checarRenderizacao(campo)) return null;
              const colProps = determinarColunas(campo, responsivo, colunas);
              return (
                <Col key={pegarKeyPeloCampo(campo)} {...colProps}>
                  {renderizarCampo(campo)}
                </Col>
              );
            })}
          </Row>

          {!rest?.disabled && (
            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
              {exibirBotaoLimpar && (
                <Col span={exibirBotaoEnviar ? 12 : 24}>
                  <Button
                    disabled={desabilitarBotaoLimpar}
                    danger
                    icon={rest?.botaoLimparProps?.icone || <DeleteOutlined />}
                    ghost
                    onClick={onLimpar}
                    block
                  >
                    {rest?.botaoLimparProps?.texto ?? limparTexto}
                  </Button>
                </Col>
              )}
              {exibirBotaoEnviar && (
                <Col span={exibirBotaoLimpar ? 12 : 24}>
                  <Button
                    loading={carregandoFinal}
                    disabled={desabilitarBotaoEnviar}
                    type="primary"
                    icon={<EnterOutlined />}
                    onClick={onSubmit}
                    block
                  >
                    {rest?.botaoEnviarProps?.texto ?? enviarTexto}
                  </Button>
                </Col>
              )}
            </Row>
          )}
        </Spin>
      </Form>
    );
  }
);

export const Formulario = FormularioDecorator;
