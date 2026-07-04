import { Button } from "antd";
import { IconCore } from "@/components/IconCore.jsx";

export function ButtonIconCore({tipo, icon, ...props}) {
  return(
    <Button type={tipo} {...props}>
      <IconCore type={icon} />
    </Button>
  )
}