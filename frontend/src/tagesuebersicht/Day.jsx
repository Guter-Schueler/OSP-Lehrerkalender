import React from 'react';
import userStore from '../store';

export default function Day({ dayNum, bemerkungsArray }) {
  const { sendWeeklyData, selectedDate } = userStore();

  const whatWeekday = React.useMemo(() => {
      switch(dayNum) {
          case 0:
              return 'Montag'
          case 1:
              return 'Dienstag'
          case 2:
              return 'Mittwoch'
          case 3:
              return 'Donnerstag'
          case 4:
              return 'Freitag'
          default: return 'weekend'
      }
  })


  return (
    <div className="day-wrapper">
      <p className="day">{ whatWeekday }</p>
      <textarea
        id={whatWeekday}
        onBlur={() => sendWeeklyData(whatWeekday)}
        className="day-input"
      />
    </div>
  );
}
