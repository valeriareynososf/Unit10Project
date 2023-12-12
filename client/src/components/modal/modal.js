import { useEffect, useState, useRef } from "react";
import "./modal.css";

const Modal = ({ isOpen, onSubmit, onClose, action, children }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);

  //use a ref attribute to access directly in DOM
  const modalRef = useRef(null);
  const modalEl = modalRef.current;

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  //if user exits using key, set state to false
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };

  const handleOutsideClick = (e) => {
    const dimensions = modalEl?.getBoundingClientRect();
    //modal closes if user clicks outside of modal
    if (
      e.clientX < dimensions.left ||
      e.clientX > dimensions.right ||
      e.clientY < dimensions.top ||
      e.clientY > dimensions.bottom
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
  }, [isModalOpen, modalEl]);

  return (
    <dialog
      className="modal"
      ref={modalRef}
      onClick={handleOutsideClick}
      onKeyDown={handleKeyDown}
    >
      {children}
      <div className="modal-buttons">
        <button className="button" onClick={handleCloseModal}>
          Cancel
        </button>
        <button className="button button-secondary" onClick={onSubmit}>
          {action}
        </button>
      </div>
    </dialog>
  );
};

export default Modal;
