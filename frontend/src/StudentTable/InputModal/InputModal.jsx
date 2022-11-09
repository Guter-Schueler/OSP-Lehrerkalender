import React from 'react';
import ModalFrame from "./ModalFrame";
import '../../Frontpage/styles.scss';
import userStore from "../../store";

const InputModal = ({modalToggle, handleModalToggle, student, klasse, fach}) => {

    const { submitStudentInfo } = userStore();

    const onSubmit = () => {
        submitStudentInfo()
    }

    return (
        <ModalFrame
            modalToggle={modalToggle}
            handleModalToggle={handleModalToggle}
            onSubmit={onSubmit}
        >
            <div>
                <div>Klasse: {klasse}</div>
                <div>Fach: {fach}</div>
                <div>Schüler: {student.vorname} {student.nachname}</div>
            </div>
            <div className="form-wrap">
                <form type="submit" className="modal-form">
                    <div className="grade-input-wrap">
                        <label htmlFor="oral-grading">
                           Mündliche Note:{' '}
                        </label>
                        <input id="oral-grading" type="number" min="1" max="6" />
                        <br/><br/>
                        <label htmlFor="grading">
                           Klausurnoten:
                        </label>
                        <label htmlFor="exam-1-grading">
                           1. Klausur:{' '}
                        </label>
                        <input id="exam-1-grading" type="number" min="1" max="6" />
                        <label htmlFor="exam-2-grading">
                           2. Klausur:{' '}
                        </label>
                        <input id="exam-2-grading" type="number" min="1" max="6" />
                        <label htmlFor="exam-3-grading">
                           3. Klausur:{' '}
                        </label>
                        <input id="exam-3-grading" type="number" min="1" max="6" />
                    </div>
                    <div className="comment-input-wrap">
                        <label htmlFor="comment">
                           Bermerkung:{' '}
                        </label>
                        <input id="comment" type="text" />
                    </div>
                </form>
            </div>
        </ModalFrame>
    )
}

export default InputModal;
