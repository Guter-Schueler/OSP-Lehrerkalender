import React from 'react';
import './tagesuebersicht.scss';

export default function Tagesuebersicht() {
  return (
    <div id="wochenWrapper">
      <div className="dayWrapper">
        <p className="day">Montag</p>
        <textarea className="dayInput" />
      </div>
      <div className="dayWrapper">
        <p className="day">Dienstag</p>
        <textarea className="dayInput" />
      </div>
      <div className="dayWrapper">
        <p className="day">Mittwoch</p>
        <textarea className="dayInput" />
      </div>
      <div className="dayWrapper">
        <p className="day">Donnerstag</p>
        <textarea className="dayInput" />
      </div>
      <div className="dayWrapper">
        <p className="day">Freitag</p>
        <textarea className="dayInput" />
      </div>
    </div>
  );
}
