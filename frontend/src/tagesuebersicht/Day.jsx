import React from 'react';
import userStore from '../store';

function sendData(event) {
  const dayData = {
    lehrerId: 1,
    datum: '2022-11-09',
    bemerkung: event.target.value,
  };
  // const { addKalenderBemerkungen } = userStore();
  // addKalenderBemerkungen();
}

export default function Day(dayName) {
  return (
    <div className="day-wrapper">
      <p className="day">{dayName.dayName}</p>
      <textarea onBlur={sendData} className="day-input" />
    </div>
  );
}
