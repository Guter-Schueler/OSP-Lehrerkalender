import React from 'react';

function sendData() {
  const weekDays = document.getElementsByClassName('day-input');
}

export default function Day(dayName) {
  return (
    <div className="day-wrapper">
      <p className="day">{dayName.dayName}</p>
      <textarea onBlur={sendData} className="day-input" />
    </div>
  );
}
