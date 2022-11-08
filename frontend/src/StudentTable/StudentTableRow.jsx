import React from 'react';
import './styles.scss';

const StudentTableRow = ({ student }) => {
  return (
    <div className="student-row-wrap">
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
  );
};

export default StudentTableRow;
