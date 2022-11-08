import React from 'react';
import './tagesuebersicht.scss';
import Day from './Day';

export default function Tagesuebersicht() {
  return (
    <div id="wochen-wrapper">
      <Day dayName="Montag" />
      <Day dayName="Dienstag" />
      <Day dayName="Mittwoch" />
      <Day dayName="Donnerstag" />
      <Day dayName="Freitag" />
    </div>
  );
}
