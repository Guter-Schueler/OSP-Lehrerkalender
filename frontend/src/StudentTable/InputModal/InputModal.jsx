import React from 'react';
import ModalFrame from "./ModalFrame";
import '../../Frontpage/styles.scss';
import userStore from "../../store";

const InputModal = ({modalToggle, handleModalToggle, student, klasse, fach}) => {

    const { submitStudentInfo } = userStore();

    return (
        <ModalFrame
            modalToggle={modalToggle}
            handleModalToggle={handleModalToggle}
            onSubmit={submitStudentInfo}
        >
            <div>
                <div>Klasse: {klasse}</div>
                <div>Fach: {fach}</div>
                <div>Schüler: {student.vorname} {student.nachname}</div>
            </div>
            <div className="form-wrap">
                <form onSubmit={submitStudentInfo} className="modal-form">
                    <div className="grade-input-wrap">
                        <div className="modal-field">
                            <label htmlFor="grade">
                               Mündliche Note:{' '}
                            </label>
                            <input id="grade" type="number" min="1" max="6" />
                        </div>
                        <div className="modal-field">
                            <label htmlFor="written-grading">
                               Notentyp:
                            </label>
                            <div>dropdown</div>
                        </div>
                        <div className="modal-field">
                            <label htmlFor="comment">
                               Bermerkung:{' '}
                            </label>
                            <input id="comment" type="text" />
                        </div>
                    </div>
                </form>
            </div>
        </ModalFrame>
    )
}

export default InputModal;
