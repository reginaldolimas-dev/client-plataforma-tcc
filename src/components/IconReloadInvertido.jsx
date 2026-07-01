import { ReloadOutlined } from "@ant-design/icons";

export function IconReloadInvertido({ aoLimparFiltros, spin = false}) {
  return (
    <span style={{ display: "inline-block", transform: "scaleX(-1)" }}>
      <ReloadOutlined spin={spin} onClick={aoLimparFiltros} />
    </span>
  )
}