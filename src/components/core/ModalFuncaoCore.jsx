import { Modal } from "antd";

function modalFuncaoInformacao(props) {
  return Modal.info(props);
}

function modalFuncaoSucesso(props) {
  return Modal.success(props);
}

function modalFuncaoErro(props) {
  return Modal.error(props);
}

function modalFuncaoAviso(props) {
  return Modal.warning(props);
}

function modalFuncaoConfirmacao(props) {
  return Modal.confirm(props);
}

function destruirModal() {
  Modal.destroyAll();
}

export {
  destruirModal,
  modalFuncaoInformacao,
  modalFuncaoSucesso,
  modalFuncaoErro,
  modalFuncaoAviso,
  modalFuncaoConfirmacao,
};
