import React from 'react';
import userStore from '../store';
import './tagesuebersicht.scss';
import Day from './Day';

export default function Tagesuebersicht() {
  const { getKalenderBemerkungen } = userStore();

  const bemerkungsArray = [];

  getKalenderBemerkungen().then((response) => {
      bemerkungsArray.push(response)
  });

  return (
    <div id="wochen-wrapper">
      <Day dayNum={0} bemerkungen={bemerkungsArray} />
      <Day dayNum={1} bemerkungen={bemerkungsArray} />
      <Day dayNum={2} bemerkungen={bemerkungsArray} />
      <Day dayNum={3} bemerkungen={bemerkungsArray} />
      <Day dayNum={4} bemerkungen={bemerkungsArray} />
    </div>
  );
}
