import React from 'react';
import './styles.scss';

const StudentTableRow = ({ student }) => {
  return (
    <div className="student-row-wrap">
      <div className="student-bracket" key="firstname">
        {student.vorname}
      </div>
      <div className="student-bracket" key="lastname">
        {student.nachname}
      </div>
      <div className="student-bracket" key="oralgrade">
        {student.mndNote}
      </div>
      <div className="student-bracket" key="writtengrade">
        {student.schrfNote}
      </div>
      <div className="student-bracket" key="comment">
        {student.bemerkung}
      </div>
    </div>
  );
};

export default StudentTableRow;
