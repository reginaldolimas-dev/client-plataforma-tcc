import { Modal } from "antd";

export function ModalCore({ titulo, children, visible, onClose, destroyOnHidden = true, exibirFooter = true  }) {
  return (
    <Modal title={titulo} open={visible} onCancel={onClose} destroyOnHidden={destroyOnHidden} footer={exibirFooter}>
      {children}
    </Modal>
  )

}