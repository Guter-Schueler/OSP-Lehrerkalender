import React from 'react';
import StudentTableRow from './StudentTableRow';

const StudentTable = ({ klasse }) => {
  const headers = [
    'Vorname',
    'Nachname',
    'Mündlich',
    'Schriftlich',
    'Bemerkung',
  ];

  const data = [
    {
      vorname: 'Oli',
      nachname: 'Wiese',
      mndNote: '3',
      schrfNote: '2-',
      bemerkung: 'helfende elfen',
    },
    {
      vorname: 'Cihan',
      nachname: 'Kurt',
      mndNote: '1+',
      schrfNote: '5',
      bemerkung: 'helfende elfen',
    },
    {
      vorname: 'Dogus',
      nachname: 'Özzi',
      mndNote: '5',
      schrfNote: '6',
      bemerkung: 'helfende elfen',
    },
    {
      vorname: 'Igor',
      nachname: 'Dobric',
      mndNote: '4',
      schrfNote: '1-',
      bemerkung: 'abwesend',
    },
  ];

  return (
    <div>
      <div className="student-row-wrap-head">
        {headers.map((el) => (
          <div className="student-bracket">{el}</div>
        ))}
      </div>
      {data.map((student) => (
        <StudentTableRow student={student} />
      ))}
    </div>
  );
};

export default StudentTable;
