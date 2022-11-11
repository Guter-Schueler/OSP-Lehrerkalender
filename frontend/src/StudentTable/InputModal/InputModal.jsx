import React from 'react';
import ModalFrame from "./ModalFrame";
import '../../Frontpage/styles.scss';
import userStore from "../../store";
import Dropdown from "../../Frontpage/Dropdown";

const InputModal = ({modalToggle, handleModalToggle, student}) => {

    const notenTypArray = ['mündlich', 'schriftlich'];
    const [notenTyp, setNotenTyp] = React.useState('');

    const {
        submitStudentInfo,
        selectedKlasse,
        selectedFach,
    } = userStore();

    const myKlasse = selectedKlasse.bezeichnung;
    const myFach = selectedFach.bezeichnung;

    return (
        <ModalFrame
            modalToggle={modalToggle}
            handleModalToggle={handleModalToggle}
            onSubmit={submitStudentInfo}
        >
            <div>
                <div>Klasse: {myKlasse}</div>
                <div>Fach: {myFach}</div>
                <div>Schüler: {student.vorname} {student.nachname}</div>
            </div>
            <div className="form-wrap">
                <form onSubmit={submitStudentInfo} className="modal-form">
                    <div className="grade-input-wrap">
                        <div className="modal-field">
                            <label htmlFor="grade">
                               Note:{' '}
                            </label>
                            <input id="grade" type="number" min="1" max="6" />
                        </div>
                        <div className="modal-field">
                            <label htmlFor="written-grading">
                               Notentyp:
                            </label>
                            <Dropdown
                                data={notenTypArray}
                                selectedOption={notenTyp}
                                title={notenTyp || 'Noten Typ'}
                                setState={setNotenTyp}
                                customStyleClass="modal-dropdown-wrap"
                                customButtonStyleClass="modal-dropdown-btn"
                                customListWrapClass="modal-list-wrap"
                            />
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
