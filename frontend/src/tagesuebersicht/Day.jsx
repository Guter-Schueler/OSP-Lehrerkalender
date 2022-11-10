import React from 'react';
import userStore from '../store';

export default function Day(dayName) {
  const { sendWeeklyData } = userStore();

  return (
    <div className="day-wrapper">
      <p className="day">{dayName.dayName}</p>
      <textarea
        id={dayName.dayName}
        onBlur={() => sendWeeklyData(dayName.dayName)}
        className="day-input"
      />
    </div>
  );
}
