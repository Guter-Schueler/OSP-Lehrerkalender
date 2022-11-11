import React from 'react';
import Modal from 'react-modal';
import '../../Frontpage/styles.scss';

const ModalFrame = ({ children, modalToggle, handleModalToggle, onSubmit }) => {
  const closeModal = () => {
    onSubmit();
    handleModalToggle();
  };

  const customStyles = {
    content: {
      top: '25%',
      left: '40%',
      right: '40%',
      bottom: '25%',
      display: 'flex',
      overflow: 'none',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'column',
    },
  };

  return (
    <div>
      <Modal
        isOpen={modalToggle}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        {children}
        <button
          className="osp-button modal-btn"
          type="submit"
          onClick={closeModal}
        >
          speichern und schließen
        </button>
      </Modal>
    </div>
  );
};

export default ModalFrame;
