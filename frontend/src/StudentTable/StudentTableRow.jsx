import React from 'react';
import './styles.scss';
import InputModal from "./InputModal/InputModal";

const StudentTableRow = ({ student, klasse, fach }) => {
  const [modalToggle, setModalToggle] = React.useState(false);

  const convertGradeToNumber = (grade) => {
      if(grade) {
          if (grade.length === 1) return parseInt(grade);
          else {
              const helper = grade[0];
              const tendency = grade[1] === '+' ? -0.4 : 0.5;
              return parseInt(helper) + tendency;
          }
      }
      return null;
  }

  let writtenGrade = 0;
  const studentWrittenGrades = Object.values(student.writtenGrades);

  studentWrittenGrades.forEach((value) => {
      writtenGrade += (convertGradeToNumber(value));
  })

  writtenGrade = (writtenGrade / studentWrittenGrades.length).toFixed(1);

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
          <div className="student-bracket" key={writtenGrade}>
            {writtenGrade}
          </div>
          <div className="student-bracket" key={student.bemerkung}>
            {student.bemerkung}
          </div>
        </div>
        <InputModal
            modalToggle={modalToggle}
            handleModalToggle={handleModalToggle}
            student={student}
            klasse={klasse}
            fach={fach}
        />
    </>
  );
};

export default StudentTableRow;
