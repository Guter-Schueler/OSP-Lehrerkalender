import React from 'react';
import StudentTableRow from './StudentTableRow';
import * as schuelerData from './mockSchueler';

const StudentTable = ({ klasse, fach }) => {
  const headers = [
    'Vorname',
    'Nachname',
    'Mündlich',
    'Schriftlich',
    'Bemerkung',
  ];

  const myKlasse = klasse.bezeichnung;
  const myFach = fach.bezeichnung;

  const data = React.useMemo(() => {
    if (myKlasse && myFach && schuelerData[myKlasse][myFach]) {
      return schuelerData[myKlasse][myFach]
    }
    return false;
  },[myKlasse, myFach]);

  let hintMessage = 'Bitte wählen Sie eine Klasse und ein Fach aus.'


  return (
    <div>
      <div className="student-row-wrap-head">
        {headers.map((el) => (
          <div key={el} className="student-bracket">{el}</div>
        ))}
      </div>
      {data && data?.map((student) => (
        <StudentTableRow
            key={`${fach}${student.id}`}
            student={student}
            klasse={klasse}
            fach={fach}
        />
      ))}
      <div className="student-table-hint-box">
        {!data && hintMessage}
      </div>
    </div>
  );
};

export default StudentTable;
