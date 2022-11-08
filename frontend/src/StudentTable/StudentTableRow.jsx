import React from 'react';
import './styles.scss';
import InputModal from "./InputModal/InputModal";

const StudentTableRow = ({ student }) => {
  const [modalToggle, setModalToggle] = React.useState(false);

  const handleModalToggle = () => {
      setModalToggle(!modalToggle);
  }

  return (
    <>
        <div onClick={handleModalToggle} className="student-row-wrap">
          <div className="student-bracket" key={student.vorname}>
            {student.vorname}
          </div>
          <div className="student-bracket" key={student.nachname}>
            {student.nachname}
          </div>
          <div className="student-bracket" key={student.mndNote}>
            {student.mndNote}
          </div>
          <div className="student-bracket" key={student.schrfNote}>
            {student.schrfNote}
          </div>
          <div className="student-bracket" key={student.bemerkung}>
            {student.bemerkung}
          </div>
        </div>
        <InputModal modalToggle={modalToggle} handleModalToggle={handleModalToggle} />
    </>
  );
};

export default StudentTableRow;
