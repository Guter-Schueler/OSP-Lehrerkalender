import React from 'react';
import Modal from 'react-modal';
import '../../Frontpage/styles.scss';

const ModalFrame = ({children, modalToggle, handleModalToggle, onSubmit}) => {

    const closeModal = () => {
        handleModalToggle();
        onSubmit();
    }

    const customStyles = {
      content: {
        top: '20%',
        left: '20%',
        right: '20%',
        bottom: '20%',
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
                  type="submit"
                  onClick={closeModal}
              >
                  speichern und schließen
              </button>
          </Modal>
        </div>
    )
}

export default ModalFrame;
