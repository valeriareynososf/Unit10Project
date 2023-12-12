import Modal from "../../modal/modal";

const DeleteCourseModal = ({isOpen, onSubmit, onClose}) => {
  return (
  <Modal
  isOpen={isOpen}
  onSubmit={onSubmit}
  onClose={onClose}
  action="Delete"
  >
    <div>
        Are you sure you want to delete this course?
    </div>
  </Modal>
  );
};

export default DeleteCourseModal;