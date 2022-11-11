import React from 'react';
import userStore from '../store';

export default function Day({ dayNum, bemerkungsArray }) {
  const { sendWeeklyData, selectedDate } = userStore();

  const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

  console.log(selectedDate.getDay()-1);

  return (
    <div className="day-wrapper">
      <p
          className={`day ${selectedDate.getDay()-1 === dayNum && 'highlight-day'}`}
      >
          { weekdays[dayNum] }
      </p>
      <textarea
        id={weekdays[dayNum]}
        onBlur={() => sendWeeklyData(weekdays[dayNum])}
        className="day-input"
      />
    </div>
  );
}
