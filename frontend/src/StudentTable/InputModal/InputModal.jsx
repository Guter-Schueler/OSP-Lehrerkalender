import React from 'react';
import ModalFrame from "./ModalFrame";

const InputModal = ({modalToggle, handleModalToggle, student, klasse, fach}) => {

    const examCount = 3;

    return (
        <ModalFrame modalToggle={modalToggle} handleModalToggle={handleModalToggle}>
            <div>
                <div>Klasse: {klasse}</div>
                <div>Fach: {fach}</div>
                <div>Schüler: {student.vorname} {student.nachname}</div>
            </div>
            <div className="modal-inputbox">
                inputs hier
            </div>
        </ModalFrame>
    )
}

export default InputModal;
