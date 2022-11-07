import React from 'react';
import './tagesuebersicht.scss';

export default function Tagesuebersicht() {
  return (
    <div id="wochenWrapper">
      <div className="dayWrapper">
        <p className="day">
          Montag
          <textarea className="dayInput" />
        </p>
      </div>
      <div className="dayWrapper">
        <p className="day">
          Dienstag
          <textarea className="dayInput" />
        </p>
      </div>
      <div className="dayWrapper">
        <p className="day">
          Mittwoch
          <textarea className="dayInput" />
        </p>
      </div>
      <div className="dayWrapper">
        <p className="day">
          Donnerstag
          <textarea className="dayInput" />
        </p>
      </div>
      <div className="dayWrapper">
        <p className="day">
          Freitag
          <textarea className="dayInput" />
        </p>
      </div>
    </div>
  );
}
