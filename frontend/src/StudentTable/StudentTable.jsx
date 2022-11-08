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

  const data = React.useMemo(() =>
      klasse && fach && schuelerData[klasse][fach] ? schuelerData[klasse][fach] : null,
      [klasse, fach]);

  return (
    <div>
      <div className="student-row-wrap-head">
        {headers.map((el) => (
          <div className="student-bracket">{el}</div>
        ))}
      </div>
      {data && data?.map((student) => (
        <StudentTableRow key={`${fach}${student.id}`} student={student} />
      ))}
    </div>
  );
};

export default StudentTable;
