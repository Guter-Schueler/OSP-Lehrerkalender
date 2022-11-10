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

  const data = React.useMemo(() =>
      myKlasse && myFach && schuelerData[myKlasse][myFach] ? schuelerData[myKlasse][myFach] : null,
      [klasse, fach]);

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
    </div>
  );
};

export default StudentTable;
