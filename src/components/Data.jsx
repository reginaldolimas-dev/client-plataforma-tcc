import { Popover, Tag } from "antd";
import { isEmpty } from "lodash";
import moment from "moment";
import { IconCore } from "@/components/core/IconCore.jsx";

/**
 * Converte vários formatos vindos do backend para um moment() válido.
 * Suporta:
 * - moment
 * - Date
 * - timestamp número
 * - string ISO
 * - array vindo do Java: [ano, mes, dia] | [ano, mes, dia, hora, minuto] | [ano, mes, dia, hora, minuto, segundo, nanos]
 */
function convertMoment(valor) {
  if (valor == null) return null;

  if (moment.isMoment(valor)) return valor;

  if (valor instanceof Date) return moment(valor);

  return moment(valor);
}

const DATA_FORMATO = "DD/MM/YYYY";
/**
 * Calcula o tempo passado entre a data fornecida e a data atual
 * @param {string|moment|Array|Date} valor - A data a ser calculada
 * @returns {string} - O tempo passado em anos, meses e dias
 */
function calcularTempoDecorrido(valor) {
  const agora = moment();
  const m = convertMoment(valor);
  if (!m) return "";

  const data = m.clone();

  const anosDecorridos = agora.diff(data, "years");
  data.add(anosDecorridos, "years");

  const mesesDecorridos = agora.diff(data, "months");
  data.add(mesesDecorridos, "months");

  const diasDecorridos = agora.diff(data, "days");

  return `${anosDecorridos} anos, ${mesesDecorridos} meses, ${diasDecorridos} dias`;
}

/**
 * Formata uma data de acordo com o formato e converte para maiúsculas se necessário
 * @param {moment} data - A data a ser formatada
 * @param {string} formato - O formato desejado para a data
 * @param {boolean} toUpperCase - Define se a data deve ser exibida em maiúsculas
 * @returns {string} - A data formatada
 */
function formatarData(data, formato, toUpperCase) {
  let dataFormatada = data.format(formato);
  return toUpperCase ? dataFormatada.toUpperCase() : dataFormatada;
}

/**
 * Componente Data
 * Exibe a data formatada, opcionalmente exibindo o tempo passado ou a idade
 */
export function Data({
  valor,
  formato = DATA_FORMATO,
  tempoAdicional = [],
  exibeTempoPassado = false,
  tipo,
  upperCase = false,
}) {
  if (!valor) return "";

  const data = convertMoment(valor);
  if (!data || !data.isValid()) return "";

  if (!isEmpty(tempoAdicional) && tempoAdicional.length === 2) {
    data.add(tempoAdicional[0], tempoAdicional[1]);
  }

  const dataFormatada = formatarData(data, formato, upperCase);

  if (tipo === "texto") {
    return dataFormatada || "";
  }

  if (tipo === "idade") {
    const idade = moment().diff(data, "years");
    return (
      <>
        {dataFormatada} <Tag style={{ marginLeft: 5 }}>{idade} anos</Tag>
      </>
    );
  }

  if (exibeTempoPassado) {
    const tempoDecorrido = calcularTempoDecorrido(valor);
    return (
      <>
        {dataFormatada}{" "}
        <Popover content={tempoDecorrido} title="Tempo decorrido">
          <Tag style={{ cursor: "pointer" }}>
            <IconCore type="calendar" />
          </Tag>
        </Popover>
      </>
    );
  }

  return dataFormatada;
}
