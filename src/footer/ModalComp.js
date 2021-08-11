import React from "react";
import Modal from "react-modal";
import ModalContent from "./ModalContent";
import("./css/modalComp.css");

Modal.setAppElement("#root");

function areEqual(prevProps, nextProps) {
  return prevProps.isModalOpen === nextProps.isModalOpen;
}

function ModalComp(props) {
  const { isModalOpen, handleModalOpen } = props;
  // console.log("ModalComp Fn");

  return (
    <Modal
      className="dialog-box"
      isOpen={isModalOpen}
      onRequestClose={() => handleModalOpen(false)}
      shouldCloseOnOverlayClick={true}
      overlay={true}
    >
      <ModalContent />
    </Modal>
  );
}

export default React.memo(ModalComp, areEqual);
