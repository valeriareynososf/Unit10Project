import { useEffect, useState, useRef } from "react";
import "./modal.css";

const Modal = ({ isOpen, onSubmit, onClose, text, children }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef(null);
  const modalEl = modalRef.current;

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    const dimensions = modalEl?.getBoundingClientRect();

    if (
      e.clientX < dimensions.left ||
      e.clientX < dimensions.right ||
      e.clientY < dimensions.top ||
      e.clientY < dimensions.bottom
    ) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (modalEl) {
      if (isModalOpen) {
        modalEl.showModal();
      } else {
        modalEl.close();
      }
    }
  }, [isModalOpen]);

  return (
    <dialog className="modal" ref={modalRef} onClick={handleOutsideClick}>
      {children}
      <div className="modal-buttons">
        <button className="button" onClick={handleCloseModal}>
          Cancel
        </button>
        <button className="button button-secondary" onClick={onSubmit}>
          {text}
        </button>
      </div>
    </dialog>
  );
};

export default Modal;
