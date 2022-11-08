import React from 'react';
import Modal from 'react-modal';
import '../../Frontpage/styles.scss';

const ModalFrame = ({children, modalToggle, handleModalToggle}) => {

    const closeModal = () => {
        handleModalToggle();
    }

    const customStyles = {
      content: {
        top: '10%',
        left: '10%',
        right: '10%',
        bottom: '10%',
        display: 'flex',
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
                  className="modal-btn"
                  onClick={closeModal}
              >
                  speichern und schließen
              </button>
          </Modal>
        </div>
    )
}

export default ModalFrame;
