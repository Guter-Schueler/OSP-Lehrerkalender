import React from 'react';
import userStore from '../store';
import './tagesuebersicht.scss';
import Day from './Day';

export default function Tagesuebersicht() {
  const { getKalenderBemerkungen } = userStore();
  getKalenderBemerkungen().then((response) => {
    console.log(response);
  });
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
