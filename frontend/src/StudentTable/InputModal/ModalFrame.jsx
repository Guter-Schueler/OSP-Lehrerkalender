import React from 'react';
import Modal from 'react-modal';

const ModalFrame = ({children, modalToggle, handleModalToggle}) => {

    const closeModal = () => {
        handleModalToggle();
    }

    return (
        <div>
          <Modal
            isOpen={modalToggle}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
          >
              <button onClick={closeModal}>close</button>
              {children}
          </Modal>
        </div>
    )
}

export default ModalFrame;
